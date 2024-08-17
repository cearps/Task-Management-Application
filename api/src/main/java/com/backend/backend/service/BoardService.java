package com.backend.backend.service;

import com.backend.backend.model.Board;
import com.backend.backend.model.User;
import com.backend.backend.model.UserBoard;
import com.backend.backend.repository.BoardRepository;
import com.backend.backend.repository.UserBoardRepository;
import com.backend.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserBoardRepository userBoardRepository;

    public BoardService(UserRepository userRepository, BoardRepository boardRepository, UserBoardRepository userBoardRepository) {
        this.boardRepository = boardRepository;
        this.userBoardRepository = userBoardRepository;
    }

    public Board createBoardForUser(User user) {
        Board board = new Board();
        boardRepository.save(board);
        UserBoard userBoard = new UserBoard();
        userBoard.setUser(user);
        userBoard.setBoard(board);
        userBoardRepository.save(userBoard);
        return board;
    }

    public Board getBoardByIdAndUser(Long boardId, Long userId) {
        return boardRepository.findByIdAndUserId(boardId, userId)
                .orElseThrow(() -> new EntityNotFoundException("Board not found with id " + boardId.toString()));
    }

}