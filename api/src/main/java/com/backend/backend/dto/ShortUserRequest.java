package com.backend.backend.dto;

import lombok.Data;
import java.util.Optional;

@Data
public class ShortUserRequest {
    private Optional<Long> id;
    private String userTag;
}
