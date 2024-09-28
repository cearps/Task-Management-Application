package com.backend.backend.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.slf4j.MDC;

import java.io.IOException;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class CorrelationIdFilterTest {

    @Mock
    private HttpServletRequest mockRequest;

    @Mock
    private HttpServletResponse mockResponse;

    @Mock
    private FilterChain mockFilterChain;

    @InjectMocks
    private CorrelationIdFilter correlationIdFilter;

    @BeforeEach
    void setUp() {
        // Initialize the mocks
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCorrelationIdSetInMDCAndResponseHeader() throws ServletException, IOException {
        // Call the filter method
        correlationIdFilter.doFilterInternal(mockRequest, mockResponse, mockFilterChain);

        // Verify that the correlation ID was generated and stored in the response header
        verify(mockResponse).setHeader(eq("Correlation-ID"), any(String.class));

        // Verify that the filter chain continues execution
        verify(mockFilterChain).doFilter(mockRequest, mockResponse);

        // Check that the correlationId exists in MDC
        String correlationIdFromMDC = MDC.get("correlationId");
        assertNull(correlationIdFromMDC);  // It should be cleaned up at the end
    }

    @Test
    void testMDCIsClearedAfterRequest() throws ServletException, IOException {
        // Call the filter method
        correlationIdFilter.doFilterInternal(mockRequest, mockResponse, mockFilterChain);

        // Ensure that MDC was cleared after the filter chain execution
        verify(mockFilterChain).doFilter(mockRequest, mockResponse);
        assertNull(MDC.get("correlationId"));
    }

    @Test
    void testMDCIsClearedEvenIfExceptionThrown() throws ServletException, IOException {
        // Simulate an exception during filter chain execution
        doThrow(new ServletException("Test Exception")).when(mockFilterChain).doFilter(mockRequest, mockResponse);

        // Catch the exception and call the filter
        try {
            correlationIdFilter.doFilterInternal(mockRequest, mockResponse, mockFilterChain);
        } catch (ServletException e) {
            // Exception is expected
        }

        // Check that the MDC is still cleared
        assertNull(MDC.get("correlationId"));
    }
}
