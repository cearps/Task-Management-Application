package com.backend.backend.controller;


import com.backend.backend.dto.BoardResponse;
import com.backend.backend.dto.UpdateBoardRequest;
import com.backend.backend.model.User;
import com.backend.backend.service.BoardService;
import com.backend.backend.service.UserBoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/kanbans")
@RestController
@Slf4j
public class BoardController {

    @Autowired
    UserBoardService userBoardService;

    @Autowired
    BoardService boardService;

    @GetMapping("")
    public ResponseEntity<List<BoardResponse>> getBoards() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        log.info("User {} retrieving all kanbans", currentUser.getUserTag());

        return ResponseEntity.ok(userBoardService.getBoardsByUserId(currentUser.getId()));
    }

    @PostMapping("")
    public ResponseEntity<BoardResponse> createBoardForUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        log.info("User {} is creating a kanban START", currentUser.getUserTag());
        BoardResponse boardResponse = boardService.createBoardForUser(currentUser);
        log.info("User {} is creating a kanban SUCCESS", currentUser.getUserTag());
        return ResponseEntity.ok(boardResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoardResponse> getBoardById(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        log.info("User {} is searching for kanban with id {} START", currentUser.getUserTag(), id);
        BoardResponse boardResponse = boardService.getBoardByIdAndUserNew(id, currentUser.getId());
        log.info("User {} is searching for kanban with id {} SUCCESS", currentUser.getUserTag(), id);
        return ResponseEntity.ok(boardResponse);
    }

    @PostMapping("/{id}")
    public ResponseEntity<BoardResponse> getBoardById(@PathVariable Long id, @RequestBody UpdateBoardRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        log.info("User {} is updating board {} START", currentUser.getUserTag(), id);
        BoardResponse boardResponse = userBoardService.updateBoardForUser(currentUser, id, request);
        log.info("User {} is updating board {} SUCCESS", currentUser.getUserTag(), id);
        return ResponseEntity.ok(boardResponse);
    }

    @DeleteMapping("/{boardId}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long boardId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        log.info("User {} is deleting board {} START", currentUser.getUserTag(), boardId);
        boardService.deleteBoard(currentUser, boardId);
        log.info("User {} has deleted board {} SUCCESS", currentUser.getUserTag(), boardId);
        return ResponseEntity.noContent().build();
    }

}
