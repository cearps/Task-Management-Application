package com.backend.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CommentRequest {

    @NotNull(message = "Comment cannot be empty")
    private String comment;
}
