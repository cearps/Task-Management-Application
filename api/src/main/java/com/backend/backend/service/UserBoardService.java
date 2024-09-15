package com.backend.backend.service;

import java.util.ArrayList;
import java.util.List;

import com.backend.backend.dto.ShortUserRequest;
import com.backend.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.dto.BoardResponse;
import com.backend.backend.dto.UpdateBoardRequest;
import com.backend.backend.exceptions.BoardEditException;
import com.backend.backend.model.Board;
import com.backend.backend.model.User;
import com.backend.backend.model.UserBoard;
import com.backend.backend.repository.BoardRepository;
import com.backend.backend.repository.UserBoardRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserBoardService {

    @Autowired
    private UserBoardRepository userBoardRepository;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private UserRepository userRepository;

    public List<BoardResponse> getBoardsByUserId(Long userId) {
        List<UserBoard> userBoards = userBoardRepository.findByUserId(userId);
        List<BoardResponse> boardResponses = new ArrayList<>();
        for (UserBoard ub : userBoards) {
            boardResponses.add(new BoardResponse(ub.getBoard()));
        }
        return boardResponses;
    }

    public BoardResponse updateBoardForUser(User user, Long boardId, UpdateBoardRequest request) {
        Board board = boardRepository.findByIdAndUserId(boardId, user.getId())
                .orElseThrow(() -> new EntityNotFoundException("Board not found with id " + boardId.toString()));

        if (request.getDueDate() != null) {
            if (board.getStartDate().isAfter(request.getDueDate())) {
                throw new BoardEditException("Start date must be before due date");
            }
        }

        if (request.getName() != null) {
            board.setName(request.getName());
        }
        if (request.getDescription() != null) {
            board.setDescription(request.getDescription());
        }
        if (request.getStartDate() != null) {
            board.setStartDate(request.getStartDate());
        }
        if (request.getDueDate() != null) {
            board.setDueDate(request.getDueDate());
        }
        if (request.getUsers() != null) {
            board.getUserBoards().clear();
            for (ShortUserRequest shortUser : request.getUsers()) {
                UserBoard userBoard = new UserBoard();
                userBoard.setBoard(board);
                userBoard.setUser(userRepository.findById(shortUser.getId()).orElseThrow(() -> new EntityNotFoundException("User not found with id " + shortUser.getId().toString())));
                board.getUserBoards().add(userBoard);
            }
        }
        boardRepository.save(board);
        return new BoardResponse(board);
    }
}
