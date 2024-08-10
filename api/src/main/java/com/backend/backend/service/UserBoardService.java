package com.backend.backend.service;

import com.backend.backend.model.Board;
import com.backend.backend.model.UserBoard;
import com.backend.backend.repository.UserBoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserBoardService {

    @Autowired
    private UserBoardRepository userBoardRepository;

    public List<Board> getBoardsByUserId(Long userId) {
        List<UserBoard> userBoards = userBoardRepository.findByUserId(userId);
        return userBoards.stream()
                .map(UserBoard::getBoard)
                .collect(Collectors.toList());
    }
}
