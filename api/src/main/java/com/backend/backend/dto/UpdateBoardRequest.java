package com.backend.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateBoardRequest {

    private String name;

    private LocalDate startDate;
    private LocalDate dueDate;
    private String description;

}
