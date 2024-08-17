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
    private final List<Long> userIds;
    private final List<Task> tasks;

    public BoardResponse(Board board) {
        id = board.getId();
        name = board.getName();
        description = board.getDescription();
        startDate = board.getStartDate();
        dueDate = board.getDueDate();
        userIds = new ArrayList<>();
        for (UserBoard ub : board.getUserBoards()) {
            userIds.add(ub.getUser().getId());
        }
        tasks = board.getTasks();
    }
}
