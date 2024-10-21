package com.backend.backend.dto;

import lombok.Data;

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
@Data
public class LoginUserDto {
    private String email;

    private String password;
}
