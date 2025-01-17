package com.backend.backend.controller;

import com.backend.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.dto.LoginResponse;
import com.backend.backend.dto.LoginUserDto;
import com.backend.backend.dto.RegisterUserDto;
import com.backend.backend.exceptions.UserAlreadyExistsException;
import com.backend.backend.model.User;
import com.backend.backend.service.AuthenticationService;
import com.backend.backend.service.JwtService;

import lombok.extern.slf4j.Slf4j;

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
@RequestMapping("/auth")
@RestController
@Slf4j
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody RegisterUserDto registerUserDto) {
        log.info("Call to /signup for email {} and user {}", registerUserDto.getEmail(), registerUserDto.getUserTag());
        try {
            User registeredUser = authenticationService.signup(registerUserDto);
            return ResponseEntity.ok(registeredUser);
        } catch (UserAlreadyExistsException e) {
            HttpStatus status = HttpStatus.CONFLICT;
            return ResponseEntity.status(status).body(e.getMessage());
        } catch (Exception e) {
            log.error("Error while registering user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        log.info("Call to /login for email {}", loginUserDto.getEmail());
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);


        LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime()).setLoginCount(authenticatedUser.getLoginCount());

        return ResponseEntity.ok(loginResponse);
    }
}
