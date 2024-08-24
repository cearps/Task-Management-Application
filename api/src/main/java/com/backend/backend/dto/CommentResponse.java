package com.backend.backend.dto;

import com.backend.backend.model.Comment;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommentResponse {
    private final Long id;
    private final String comment;
    private final ShortUserResponse user;
    private final String timestamp;

    public CommentResponse(Comment comment) {
        this.id  = comment.getId();
        this.comment = comment.getComment();
        this.user = new ShortUserResponse(comment.getUser());
        this.timestamp = comment.getTimestamp();
    }
}
