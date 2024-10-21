package com.backend.backend.service;
import com.backend.backend.dto.LoginUserDto;
import com.backend.backend.dto.RegisterUserDto;
import com.backend.backend.model.User;
import com.backend.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
/**
 * Acknowledgements:
 * ChatGPT (https://chatgpt.com/) was used to assist in writing test
 * cases. The test cases were further edited manually for correctness, brevity and
 * coverage of cases in the code
 */
class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationService authenticationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSignup_Success() {
        // Mock input
        RegisterUserDto registerUserDto = new RegisterUserDto();
        registerUserDto.setUserTag("userTag123");
        registerUserDto.setEmail("test@example.com");
        registerUserDto.setPassword("password123");

        User user = new User()
                .setUserTag(registerUserDto.getUserTag())
                .setUsername(registerUserDto.getEmail())
                .setEmail(registerUserDto.getEmail())
                .setPassword("encodedPassword");

        // Mock behavior
        when(passwordEncoder.encode(registerUserDto.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);

        // Call the service method
        User savedUser = authenticationService.signup(registerUserDto);

        // Assertions
        assertNotNull(savedUser);
        assertEquals("userTag123", savedUser.getUserTag());
        assertEquals("test@example.com", savedUser.getEmail());
        assertEquals("encodedPassword", savedUser.getPassword());

        // Verify that the repository save method was called
        verify(userRepository, times(1)).save(any(User.class));
        verify(passwordEncoder, times(1)).encode(registerUserDto.getPassword());
    }

    @Test
    void testAuthenticate_Success() {
        // Mock input
        LoginUserDto loginUserDto = new LoginUserDto();
        loginUserDto.setEmail("test@example.com");
        loginUserDto.setPassword("password123");

        User user = new User()
                .setUserTag("userTag123")
                .setUsername("test@example.com")
                .setEmail("test@example.com")
                .setPassword("encodedPassword");

        // Mock behavior
        when(userRepository.findByEmail(loginUserDto.getEmail())).thenReturn(Optional.of(user));

        // Call the service method
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        // Assertions
        assertNotNull(authenticatedUser);
        assertEquals("test@example.com", authenticatedUser.getEmail());
        assertEquals("userTag123", authenticatedUser.getUserTag());

        // Verify the interaction with the AuthenticationManager and repository
        verify(authenticationManager, times(1)).authenticate(
                new UsernamePasswordAuthenticationToken(loginUserDto.getEmail(), loginUserDto.getPassword())
        );
        verify(userRepository, times(1)).findByEmail(loginUserDto.getEmail());
    }

    @Test
    void testAuthenticate_UserNotFound() {
        // Mock input
        LoginUserDto loginUserDto = new LoginUserDto();
        loginUserDto.setEmail("test@example.com");
        loginUserDto.setPassword("password123");

        // Mock behavior
        when(userRepository.findByEmail(loginUserDto.getEmail())).thenReturn(Optional.empty());

        // Call the service method and expect an exception
        assertThrows(RuntimeException.class, () -> authenticationService.authenticate(loginUserDto));

        // Verify that authentication was attempted
        verify(authenticationManager, times(1)).authenticate(
                new UsernamePasswordAuthenticationToken(loginUserDto.getEmail(), loginUserDto.getPassword())
        );
        verify(userRepository, times(1)).findByEmail(loginUserDto.getEmail());
    }
}
