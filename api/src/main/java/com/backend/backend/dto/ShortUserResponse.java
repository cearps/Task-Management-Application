package com.backend.backend.dto;

import com.backend.backend.model.User;
import com.backend.backend.model.UserBoard;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ShortUserResponse {
    private Long id;
    private String userTag;

    public ShortUserResponse(UserBoard userBoard) {
        this.id = userBoard.getUser().getId();
        this.userTag = userBoard.getUser().getUserTag();
    }

    public ShortUserResponse(User user) {
        this.id = user.getId();
        this.userTag = user.getUserTag();
    }
}
