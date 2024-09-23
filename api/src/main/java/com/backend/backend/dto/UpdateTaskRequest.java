package com.backend.backend.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateTaskRequest {

    private String name;
    private String description;
    private String state;
    private LocalDate dueDate;
    private Integer urgency;
    private Integer taskCategory;
}
