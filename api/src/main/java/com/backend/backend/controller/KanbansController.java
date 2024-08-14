package com.backend.backend.controller;


import com.backend.backend.model.Board;
import com.backend.backend.model.User;
import com.backend.backend.service.UserBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/kanbans")
@RestController
public class KanbansController {

    @Autowired
    UserBoardService userBoardService;

    @GetMapping("")
    public ResponseEntity<List<Board>> authenticatedUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(userBoardService.getBoardsByUserId(currentUser.getId()));
    }

}
