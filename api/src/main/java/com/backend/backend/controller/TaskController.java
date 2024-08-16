package com.backend.backend.controller;

import com.backend.backend.dto.CreateTaskRequest;
import com.backend.backend.model.Board;
import com.backend.backend.model.Task;
import com.backend.backend.model.User;
import com.backend.backend.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/tasks")
@RestController
public class TaskController {

    @Autowired
    TaskService taskService;

    @PostMapping("")
    public ResponseEntity<Task> createTaskForBoard(@Valid @RequestBody CreateTaskRequest request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(taskService.createTaskForBoard(currentUser, request));

    }

}
