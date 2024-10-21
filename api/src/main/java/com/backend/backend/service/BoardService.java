package com.backend.backend.service;

import com.backend.backend.dto.BoardResponse;
import com.backend.backend.model.Board;
import com.backend.backend.model.User;
import com.backend.backend.model.UserBoard;
import com.backend.backend.repository.BoardRepository;
import com.backend.backend.repository.UserBoardRepository;
import com.backend.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * A service class that handles interactions with boards in the database. This layer is called by the controller
 * classes and interacts directly with the repository interfaces to create, read, update and delete in the database.
 */
@Service
public class BoardService {
    /**
     * Repository with CRUD methods on the Board table in the database
     */
    private final BoardRepository boardRepository;
    /**
     * Repository with CRUD methods on the Userboard table in the database
     */
    private final UserBoardRepository userBoardRepository;

    /**
     * Constructs a new Board service and injects the repositories
     * @param boardRepository - Board repository
     * @param userBoardRepository - Userboard repository
     */
    public BoardService(BoardRepository boardRepository, UserBoardRepository userBoardRepository) {
        this.boardRepository = boardRepository;
        this.userBoardRepository = userBoardRepository;
    }

    /**
     * Creates a blank board for a user
     * @param user - User to create the new board for
     * @return - BoardResponse with the details of the new board for the user
     */
    public BoardResponse createBoardForUser(User user) {
        Board board = new Board();
        boardRepository.save(board); // saves board
        UserBoard userBoard = new UserBoard();
        userBoard.setUser(user);
        userBoard.setBoard(board);
        userBoardRepository.save(userBoard); // links user to the board
        return new BoardResponse(board);
    }

    /**
     * Retrieves a board by its id for a specific user
     * @param boardId - The ID of the board to find
     * @param userId - The ID of the user who is searching for the board
     * @return A BoardResponse with the details of the board found for the user
     * @throws EntityNotFoundException if board id is not found for that user
     */
    public BoardResponse getBoardByIdAndUser(Long boardId, Long userId) {
        // Find board with id
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new EntityNotFoundException("Board not found with id " + boardId.toString()));

        // Check if user is a member of the board
        if ( board.getUserBoards().stream().anyMatch(userBoard -> userBoard.getUser().getId() == userId)) {
            return new BoardResponse(board);
        }
        else {
            // User is not a member of the board so throw error
            throw new EntityNotFoundException("Board not found with id " + boardId.toString());
        }

    }

    /**
     * Deletes a board for a user
     * @param user - User who is trying to delete the board
     * @param boardId - ID of the board that will be deleted
     * @throws EntityNotFoundException if boared with correct id and user not found
     */
    @Transactional
    public void deleteBoard(User user, Long boardId) {
        // Find board with board id for that user
        Board board = boardRepository.findByIdAndUserId(boardId, user.getId())
                .orElseThrow(() -> new EntityNotFoundException("Board not found with id " + boardId.toString()));

        // Cleanup userboards linking users to the board
        for (UserBoard userBoard : board.getUserBoards()) {
            userBoardRepository.delete(userBoard);
        }
        // Delete the board
        boardRepository.delete(board);
    }

}
