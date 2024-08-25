package com.backend.backend.dto;

import com.backend.backend.model.Board;
import com.backend.backend.model.Task;
import com.backend.backend.model.UserBoard;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class BoardResponse {

    private final Long id;
    private final String name;
    private final String description;
    private final LocalDate startDate;
    private final LocalDate dueDate;
    private final List<ShortUserResponse> users;
    private final List<TaskResponse> tasks;

    public BoardResponse(Board board) {
        id = board.getId();
        name = board.getName();
        description = board.getDescription();
        startDate = board.getStartDate();
        dueDate = board.getDueDate();
        users = new ArrayList<>();
        for (UserBoard ub : board.getUserBoards()) {
            users.add(new ShortUserResponse(ub.getUser().getId(), ub.getUser().getUserTag()));
        }
        tasks = new ArrayList<>();
        for (Task task : board.getTasks()) {
            tasks.add(new TaskResponse(task));
        }
    }
}
