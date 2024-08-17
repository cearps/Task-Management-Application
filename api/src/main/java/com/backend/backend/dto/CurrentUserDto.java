package com.backend.backend.dto;

import lombok.Data;

@Data
public class CurrentUserDto {
    private Long id;
    private String email;
    private String fullName;
}
