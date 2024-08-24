package com.backend.backend.dto;

import com.backend.backend.model.Comment;
import com.backend.backend.model.Task;
import com.backend.backend.model.UserBoard;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class TaskResponse {
    private Long id;
    private String name;
    private String description;
    private LocalDate dueDate;
    private Integer urgency;
    private Integer taskCategory;
    private List<CommentResponse> comments;

    public TaskResponse(Task task) {
        this.id = task.getId();
        this.name = task.getName();
        this.description = task.getDescription();
        this.dueDate = task.getDueDate();
        this.urgency = task.getUrgency();
        this.taskCategory = task.getTaskCategory();
        this.comments = new ArrayList<>();
        for (Comment comment : task.getComments()) {
            comments.add(new CommentResponse(comment));
        }
    }
}
