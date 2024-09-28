package com.backend.backend.dto;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import jakarta.validation.ConstraintViolation;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class CommentRequestTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void testCommentIsNull() {
        // Create CommentRequest with a null comment
        CommentRequest commentRequest = new CommentRequest();
        commentRequest.setComment(null);  // This should trigger a validation error

        // Validate the DTO
        Set<ConstraintViolation<CommentRequest>> violations = validator.validate(commentRequest);

        // There should be at least one validation error
        assertFalse(violations.isEmpty());

        // Extract the violation message and assert it's the expected one
        ConstraintViolation<CommentRequest> violation = violations.iterator().next();
        assertEquals("Comment cannot be empty", violation.getMessage());
    }

    @Test
    void testCommentIsValid() {
        // Create CommentRequest with a valid comment
        CommentRequest commentRequest = new CommentRequest();
        commentRequest.setComment("This is a valid comment");

        // Validate the DTO
        Set<ConstraintViolation<CommentRequest>> violations = validator.validate(commentRequest);

        // There should be no validation errors
        assertTrue(violations.isEmpty());
    }
}

