package com.backend.backend.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.MDC;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
public class CorrelationIdFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        // Generate a unique correlation ID
        String correlationId = UUID.randomUUID().toString();

        // Store the correlation ID in MDC (Mapped Diagnostic Context)
        MDC.put("correlationId", correlationId);

        try {
            // Continue with the filter chain
            filterChain.doFilter(request, response);
        } finally {
            // Clean up the MDC
            MDC.remove("correlationId");
        }
    }
}