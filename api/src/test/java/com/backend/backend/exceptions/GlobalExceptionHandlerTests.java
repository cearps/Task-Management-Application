package com.backend.backend.exceptions;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.BadCredentialsException;

import static org.junit.jupiter.api.Assertions.*;

class GlobalExceptionHandlerTest {

    private GlobalExceptionHandler globalExceptionHandler;

    @BeforeEach
    void setUp() {
        globalExceptionHandler = new GlobalExceptionHandler();
    }

    @Test
    void testHandleBadCredentialsException() {
        // Given
        BadCredentialsException exception = new BadCredentialsException("Invalid credentials");

        // When
        ProblemDetail result = globalExceptionHandler.handleSecurityException(exception);

        // Then
        assertNotNull(result);
        assertEquals(HttpStatusCode.valueOf(401), HttpStatusCode.valueOf(result.getStatus()));
        assertEquals("Invalid credentials", result.getDetail());
        assertEquals("The username or password is incorrect", result.getProperties().get("description"));
    }

    @Test
    void testHandleAccountStatusException() {
        // Given
        AccountStatusException exception = new AccountStatusException("Account locked") {};

        // When
        ProblemDetail result = globalExceptionHandler.handleSecurityException(exception);

        // Then
        assertNotNull(result);
        assertEquals(HttpStatusCode.valueOf(403), HttpStatusCode.valueOf(result.getStatus()));
        assertEquals("Account locked", result.getDetail());
        assertEquals("The account is locked", result.getProperties().get("description"));
    }

    @Test
    void testHandleAccessDeniedException() {
        // Given
        AccessDeniedException exception = new AccessDeniedException("Access denied");

        // When
        ProblemDetail result = globalExceptionHandler.handleSecurityException(exception);

        // Then
        assertNotNull(result);
        assertEquals(HttpStatusCode.valueOf(403), HttpStatusCode.valueOf(result.getStatus()));
        assertEquals("Access denied", result.getDetail());
        assertEquals("You are not authorized to access this resource", result.getProperties().get("description"));
    }

    @Test
    void testHandleSignatureException() {
        // Given
        SignatureException exception = new SignatureException("Invalid JWT signature");

        // When
        ProblemDetail result = globalExceptionHandler.handleSecurityException(exception);

        // Then
        assertNotNull(result);
        assertEquals(HttpStatusCode.valueOf(403), HttpStatusCode.valueOf(result.getStatus()));
        assertEquals("Invalid JWT signature", result.getDetail());
        assertEquals("The JWT signature is invalid", result.getProperties().get("description"));
    }

    @Test
    void testHandleExpiredJwtException() {
        // Given
        ExpiredJwtException exception = new ExpiredJwtException(null, null, "JWT expired");

        // When
        ProblemDetail result = globalExceptionHandler.handleSecurityException(exception);

        // Then
        assertNotNull(result);
        assertEquals(HttpStatusCode.valueOf(403), HttpStatusCode.valueOf(result.getStatus()));
        assertEquals("JWT expired", result.getDetail());
        assertEquals("The JWT token has expired", result.getProperties().get("description"));
    }

    @Test
    void testHandleUnknownException() {
        // Given
        Exception exception = new Exception("Unknown error");

        // When
        ProblemDetail result = globalExceptionHandler.handleSecurityException(exception);

        // Then
        assertNotNull(result);
        assertEquals(HttpStatusCode.valueOf(500), HttpStatusCode.valueOf(result.getStatus()));
        assertEquals("Unknown error", result.getDetail());
        assertEquals("Unknown internal server error.", result.getProperties().get("description"));
    }
}
