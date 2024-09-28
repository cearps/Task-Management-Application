package com.backend.backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class JwtServiceTests {

    private JwtService jwtService;
    @Mock
    private UserDetails userDetails;

    private String secretKey = "supersecretkey123supersecretkey123adsfasfasdfas"; // Must be base64-encoded in reality
    private long jwtExpiration = 3600000; // 1 hour in milliseconds
    private Key signingKey;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        jwtService = new JwtService(secretKey, jwtExpiration);

        // Generate signing key from secret
        signingKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));

    }

    @Test
    void extractUsername_shouldReturnCorrectUsername() {
        String username = "testuser";
        String token = generateTestToken(username);

        when(userDetails.getUsername()).thenReturn(username);

        String extractedUsername = jwtService.extractUsername(token);

        assertEquals(username, extractedUsername);
    }

    @Test
    void generateToken_shouldGenerateValidToken() {
        String username = "testuser";
        when(userDetails.getUsername()).thenReturn(username);

        String token = jwtService.generateToken(userDetails);

        assertNotNull(token);
        assertTrue(token.length() > 0);

        // Verify that the token contains the correct username
        String extractedUsername = jwtService.extractUsername(token);
        assertEquals(username, extractedUsername);
    }

    @Test
    void isTokenValid_shouldReturnTrueForValidToken() {
        String username = "testuser";
        String token = generateTestToken(username);

        when(userDetails.getUsername()).thenReturn(username);

        boolean isValid = jwtService.isTokenValid(token, userDetails);

        assertTrue(isValid);
    }

    @Test
    void isTokenValid_shouldReturnFalseForInvalidToken() {
        String username = "testuser";
        String token = generateTestToken("differentUser");

        when(userDetails.getUsername()).thenReturn(username);

        boolean isValid = jwtService.isTokenValid(token, userDetails);

        assertFalse(isValid);
    }

    @Test
    void isTokenValid_shouldReturnFalseForExpiredToken() {
        String username = "testuser";
        String expiredToken = generateExpiredToken(username);

        when(userDetails.getUsername()).thenReturn(username);

        ExpiredJwtException exception = assertThrows(ExpiredJwtException.class, () -> {
            jwtService.isTokenValid(expiredToken, userDetails);
        });

        // Check that the exception message contains specific text
        assertTrue(exception.getMessage().contains("JWT expired"));
    }

    @Test
    void extractClaim_shouldReturnCorrectClaim() {
        String username = "testuser";
        String token = generateTestToken(username);

        assertEquals(username, jwtService.extractClaim(token, Claims::getSubject));

    }

    // Helper method to generate a valid test token with a specific username
    private String generateTestToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

    // Helper method to generate an expired test token
    private String generateExpiredToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis() - jwtExpiration * 2))
                .setExpiration(new Date(System.currentTimeMillis() - jwtExpiration))
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }
}
