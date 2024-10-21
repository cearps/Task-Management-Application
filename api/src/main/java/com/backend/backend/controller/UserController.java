package com.backend.backend.controller;

import com.backend.backend.dto.CurrentUserDto;
import com.backend.backend.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Acknowledgements:
 * This class was written by following the instructions in the "Implement JWT authentication
 * in a Spring Boot 3 application" tutorial on Medium published by Eric C. Togo.
 * The tutorial was published on 20/03/2024.
 *
 * The full APA 7th reference is:
 * Tiogo, E.C. (2024) Implement JWT authentication in a Spring Boot 3
 *     application, Medium. Available at:
 *     https://medium.com/@tericcabrel/implement-jwt-authentication-in-a-spring-boot-3-application-5839e4fd8fac
 *     (Accessed: 22 June 2024).
 */
@RequestMapping("/user")
@RestController
@Slf4j
public class UserController {

    @GetMapping("/me")
    public ResponseEntity<CurrentUserDto> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        CurrentUserDto response = new CurrentUserDto();
        response.setEmail(currentUser.getEmail());
        response.setUserTag(currentUser.getUserTag());
        response.setId(currentUser.getId());
        log.info("Getting user information for {} SUCCESS", currentUser.getUserTag());
        return ResponseEntity.ok(response);
    }

}
