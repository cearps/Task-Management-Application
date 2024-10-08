package com.backend.backend.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.backend.backend.model.Comment;
import com.backend.backend.model.Task;
import com.backend.backend.model.UserTask;

import lombok.Data;

@Data
public class TaskResponse {
    private Long id;
    private String name;
    private String description;
    private LocalDate dueDate;
    private Integer urgency;
    private Integer taskCategory;
    private List<CommentResponse> comments;
    private List<ShortUserResponse> users;
    private List<FileResponse> files;

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
        this.users = new ArrayList<>();
        for (UserTask userTask : task.getUserTasks()) {
            users.add(new ShortUserResponse(userTask.getUser().getId(), userTask.getUser().getUserTag()));
        }
        this.files = new ArrayList<>();
    }
}
