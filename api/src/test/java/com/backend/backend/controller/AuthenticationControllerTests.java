package com.backend.backend.controller;

import com.backend.backend.dto.LoginResponse;
import com.backend.backend.dto.LoginUserDto;
import com.backend.backend.dto.RegisterUserDto;
import com.backend.backend.exceptions.UserAlreadyExistsException;
import com.backend.backend.model.User;
import com.backend.backend.service.AuthenticationService;
import com.backend.backend.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/**
 * Acknowledgements:
 * ChatGPT (https://chatgpt.com/) was used to assist in writing test
 * cases. The test cases were further edited manually for correctness, brevity and
 * coverage of cases in the code
 */
class AuthenticationControllerTests {

    @InjectMocks
    private AuthenticationController authenticationController;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationService authenticationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterUserSuccess() {
        // Arrange
        RegisterUserDto registerUserDto = new RegisterUserDto();
        registerUserDto.setEmail("test@example.com");
        registerUserDto.setUserTag("testUser");

        User user = new User(); // Initialize the user as per your User class definition.
        user.setEmail(registerUserDto.getEmail());
        user.setUserTag(registerUserDto.getUserTag());

        when(authenticationService.signup(any(RegisterUserDto.class))).thenReturn(user);

        // Act
        ResponseEntity<?> response = authenticationController.register(registerUserDto);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
    }

    @Test
    void testRegisterUserAlreadyExists() {
        // Arrange
        RegisterUserDto registerUserDto = new RegisterUserDto();
        registerUserDto.setEmail("test@example.com");
        registerUserDto.setUserTag("testUser");

        when(authenticationService.signup(any(RegisterUserDto.class)))
                .thenThrow(new UserAlreadyExistsException("User already exists"));

        // Act
        ResponseEntity<?> response = authenticationController.register(registerUserDto);

        // Assert
        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("User already exists", response.getBody());
    }

    @Test
    void testRegisterUserInternalError() {
        // Arrange
        RegisterUserDto registerUserDto = new RegisterUserDto();
        registerUserDto.setEmail("test@example.com");
        registerUserDto.setUserTag("testUser");

        when(authenticationService.signup(any(RegisterUserDto.class)))
                .thenThrow(new RuntimeException("Internal error"));

        // Act
        ResponseEntity<?> response = authenticationController.register(registerUserDto);

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }

    @Test
    void testAuthenticateUserSuccess() {
        // Arrange
        LoginUserDto loginUserDto = new LoginUserDto();
        loginUserDto.setEmail("test@example.com");
        loginUserDto.setPassword("password");

        User user = new User(); // Initialize the user as per your User class definition.
        user.setEmail(loginUserDto.getEmail());

        String jwtToken = "sample.jwt.token";
        when(authenticationService.authenticate(any(LoginUserDto.class))).thenReturn(user);
        when(jwtService.generateToken(user)).thenReturn(jwtToken);
        when(jwtService.getExpirationTime()).thenReturn(3600L);

        // Act
        ResponseEntity<LoginResponse> response = authenticationController.authenticate(loginUserDto);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(jwtToken, response.getBody().getToken());
        assertEquals(3600L, response.getBody().getExpiresIn());
    }

    // Additional tests for authentication errors can be added here.
}
