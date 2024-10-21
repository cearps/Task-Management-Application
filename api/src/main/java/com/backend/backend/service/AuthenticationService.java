package com.backend.backend.service;

import org.springframework.dao.DataIntegrityViolationException;

import com.backend.backend.dto.LoginUserDto;
import com.backend.backend.dto.RegisterUserDto;
import com.backend.backend.model.User;
import com.backend.backend.repository.UserRepository;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.backend.exceptions.UserAlreadyExistsException;

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
@Service
public class AuthenticationService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(RegisterUserDto input) {
        User user = new User()
                .setUserTag(input.getUserTag())
                .setUsername(input.getEmail())
                .setEmail(input.getEmail())
                .setLoginCount(0)
                .setPassword(passwordEncoder.encode(input.getPassword()));

        try {
            return userRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new UserAlreadyExistsException("Username or email already exists. Please choose a different one.");
        }
    }

    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        User user = userRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setLoginCount(user.getLoginCount() + 1);
        userRepository.save(user);

        return user;
    }
}
