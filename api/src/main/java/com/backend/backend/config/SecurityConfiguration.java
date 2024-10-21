package com.backend.backend.config;


import com.backend.backend.filter.CorrelationIdFilter;
import com.backend.backend.filter.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

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
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    private final AuthenticationProvider authenticationProvider;
    private final JwtFilter jwtAuthenticationFilter;
    private final CorrelationIdFilter cidFilter;

    public SecurityConfiguration(
            JwtFilter jwtAuthenticationFilter,
            AuthenticationProvider authenticationProvider,
            CorrelationIdFilter cidFilter
    ) {
        this.authenticationProvider = authenticationProvider;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.cidFilter = cidFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors()
                .and()
                .csrf()
                .disable()
                .authorizeHttpRequests()
                .requestMatchers("/auth/**", "/actuator/**")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(cidFilter, JwtFilter.class);

        return http.build();
    }

   @Bean
   CorsConfigurationSource corsConfigurationSource() {
       CorsConfiguration configuration = new CorsConfiguration();

       configuration.setAllowedOriginPatterns(List.of("*"));
       configuration.setAllowedMethods(List.of("*"));
       configuration.setAllowedHeaders(List.of("*"));
       configuration.setAllowCredentials(true);
       UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

       source.registerCorsConfiguration("/**",configuration);

       return source;
   }
}

