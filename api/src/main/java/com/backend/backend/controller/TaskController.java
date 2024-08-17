package com.backend.backend.controller;

import com.backend.backend.dto.CreateTaskRequest;
import com.backend.backend.dto.UpdateTaskRequest;
import com.backend.backend.model.Board;
import com.backend.backend.model.Task;
import com.backend.backend.model.User;
import com.backend.backend.service.TaskService;
import jakarta.validation.Valid;
import org.hibernate.sql.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/kanbans")
@RestController
public class TaskController {

    @Autowired
    TaskService taskService;

    @PostMapping("/{boardId}/tasks")
    public ResponseEntity<Task> createTaskForBoard(@PathVariable Long boardId) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(taskService.createTaskForBoard(currentUser, boardId));

    }

    @PostMapping("/{boardId}/tasks/{taskId}")
    public ResponseEntity<Task> updateTaskForBoard(@PathVariable Long boardId, @PathVariable Long taskId,
                                                   @RequestBody UpdateTaskRequest request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(taskService.updateTaskForBoard(currentUser, boardId, taskId, request));

    }

}
