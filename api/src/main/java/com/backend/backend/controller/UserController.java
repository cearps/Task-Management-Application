package com.backend.backend.controller;

import com.backend.backend.dto.CurrentUserDto;
import com.backend.backend.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/user")
@RestController
public class UserController {

    @GetMapping("/me")
    public ResponseEntity<CurrentUserDto> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        CurrentUserDto response = new CurrentUserDto();
        response.setEmail(currentUser.getEmail());
        response.setUserTag(currentUser.getUserTag());
        response.setId(currentUser.getId());
        return ResponseEntity.ok(response);
    }

}
