package com.backend.backend.controller;

import com.backend.backend.dto.CurrentUserDto;
import com.backend.backend.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
/**
 * Acknowledgements:
 * ChatGPT (https://chatgpt.com/) was used to assist in writing test
 * cases. The test cases were further edited manually for correctness, brevity and
 * coverage of cases in the code
 */
class UserControllerTest {

    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userController = new UserController();
    }

    private void setAuthentication(User user) {
        // Create a mock Authentication object
        Authentication authentication = mock(Authentication.class);
        when(authentication.getPrincipal()).thenReturn(user);

        // Create a mock SecurityContext and set the Authentication
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);

        // Set the SecurityContextHolder to use the mock SecurityContext
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    void testGetCurrentUserSuccess() {
        // Arrange
        User user = new User();
        user.setId(1L);
        user.setEmail("test@example.com");
        user.setUserTag("testUser");

        // Set the authentication context for the test
        setAuthentication(user);

        // Act
        ResponseEntity<CurrentUserDto> response = userController.getCurrentUser();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user.getEmail(), response.getBody().getEmail());
        assertEquals(user.getUserTag(), response.getBody().getUserTag());
        assertEquals(user.getId(), response.getBody().getId());
    }

}
