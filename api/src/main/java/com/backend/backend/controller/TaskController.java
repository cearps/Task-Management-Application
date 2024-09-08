package com.backend.backend.controller;

import com.backend.backend.dto.CommentRequest;
import com.backend.backend.dto.TaskResponse;
import com.backend.backend.dto.UpdateTaskRequest;
import com.backend.backend.model.Task;
import com.backend.backend.model.User;
import com.backend.backend.service.TaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/kanbans")
@RestController
@Slf4j
public class TaskController {

    @Autowired
    TaskService taskService;

    @PostMapping("/{boardId}/tasks")
    public ResponseEntity<Task> createTaskForBoard(@PathVariable Long boardId) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        log.info("User {} is creating task for board {} START", currentUser.getUserTag(), boardId);
        Task task = taskService.createTaskForBoard(currentUser, boardId);
        log.info("User {} is creating task for board {} SUCCESS", currentUser.getUserTag(), boardId);
        return ResponseEntity.ok(task);

    }

    @PostMapping("/{boardId}/tasks/{taskId}")
    public ResponseEntity<Task> updateTaskForBoard(@PathVariable Long boardId, @PathVariable Long taskId,
                                                   @RequestBody UpdateTaskRequest request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        log.info("User {} is updating task {} on board {} START", currentUser.getUserTag(), taskId, boardId);
        Task task = taskService.updateTaskForBoard(currentUser, boardId, taskId, request);
        log.info("User {} is updating task {} on board {} SUCCESS", currentUser.getUserTag(), taskId, boardId);
        return ResponseEntity.ok(task);

    }

    @DeleteMapping("/{boardId}/tasks/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long boardId, @PathVariable Long taskId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        log.info("User {} is deleting task {} on board {} START", currentUser.getUserTag(), taskId, boardId);
        taskService.deleteTask(currentUser, boardId, taskId);
        log.info("User {} is deleting task {} on board {} SUCCESS", currentUser.getUserTag(), taskId, boardId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{boardId}/tasks/{taskId}/comment")
    public ResponseEntity<TaskResponse> commentOnTask(@PathVariable Long boardId, @PathVariable Long taskId,
                                                      @RequestBody CommentRequest request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        log.info("User {} is commenting on task {} on board {} START", currentUser.getUserTag(), taskId, boardId);
        Task task = taskService.commentOnTask(currentUser, boardId, taskId, request);
        log.info("User {} is commenting on task {} on board {} SUCCESS", currentUser.getUserTag(), taskId, boardId);
        return ResponseEntity.ok(new TaskResponse(task));

    }

}
