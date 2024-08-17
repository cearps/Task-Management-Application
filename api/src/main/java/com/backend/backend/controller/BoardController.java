package com.backend.backend.controller;


import com.backend.backend.dto.BoardResponse;
import com.backend.backend.dto.UpdateBoardRequest;
import com.backend.backend.model.Board;
import com.backend.backend.model.User;
import com.backend.backend.service.BoardService;
import com.backend.backend.service.UserBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/kanbans")
@RestController
public class BoardController {

    @Autowired
    UserBoardService userBoardService;

    @Autowired
    BoardService boardService;

    @GetMapping("")
    public ResponseEntity<List<BoardResponse>> getBoards() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(userBoardService.getBoardsByUserId(currentUser.getId()));
    }

    @PostMapping("")
    public ResponseEntity<BoardResponse> createBoardForUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(boardService.createBoardForUser(currentUser));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoardResponse> getBoardById(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(boardService.getBoardByIdAndUser(id, currentUser.getId()));
    }

    @PostMapping("/{id}")
    public ResponseEntity<BoardResponse> getBoardById(@PathVariable Long id, @RequestBody UpdateBoardRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(userBoardService.updateBoardForUser(currentUser, id, request));
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long boardId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        boardService.deleteBoard(currentUser, boardId);
        return ResponseEntity.noContent().build();
    }

}
