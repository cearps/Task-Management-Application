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

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserBoardRepository userBoardRepository;

    public BoardService(UserRepository userRepository, BoardRepository boardRepository, UserBoardRepository userBoardRepository) {
        this.boardRepository = boardRepository;
        this.userBoardRepository = userBoardRepository;
    }

    public BoardResponse createBoardForUser(User user) {
        Board board = new Board();
        boardRepository.save(board);
        UserBoard userBoard = new UserBoard();
        userBoard.setUser(user);
        userBoard.setBoard(board);
        userBoardRepository.save(userBoard);
        return new BoardResponse(board);
    }

    public BoardResponse getBoardByIdAndUser(Long boardId, Long userId) {
        Board board = boardRepository.findByIdAndUserId(boardId, userId)
                .orElseThrow(() -> new EntityNotFoundException("Board not found with id " + boardId.toString()));

        BoardResponse response = new BoardResponse(board);
        return response;

    }

    @Transactional
    public void deleteBoard(User user, Long boardId) {
        Board board = boardRepository.findByIdAndUserId(boardId, user.getId())
                .orElseThrow(() -> new EntityNotFoundException("Board not found with id " + boardId.toString()));

        for (UserBoard userBoard : board.getUserBoards()) {
            userBoardRepository.delete(userBoard);
        }
        boardRepository.delete(board);
    }

}
