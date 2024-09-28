package com.backend.backend.dto;

import java.time.LocalDate;

import com.backend.backend.model.UserBoard;

import lombok.Data;

@Data
public class UpdateBoardRequest {

    private String name;

    private LocalDate startDate;
    private LocalDate dueDate;
    private String description;
    private ShortUserRequest[] users;
}
