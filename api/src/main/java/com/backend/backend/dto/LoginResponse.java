package com.backend.backend.dto;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class LoginResponse {
    private String token;

    private long expiresIn;

}
