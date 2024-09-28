package com.backend.backend.controller;

import com.backend.backend.dto.CommentRequest;
import com.backend.backend.dto.TaskResponse;
import com.backend.backend.dto.UpdateTaskRequest;
import com.backend.backend.model.Task;
import com.backend.backend.model.User;
import com.backend.backend.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

class TaskControllerTest {

    @InjectMocks
    private TaskController taskController;

    @Mock
    private TaskService taskService;

    @Mock
    private Authentication authentication;

    private User currentUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        currentUser = new User();
        currentUser.setUserTag("testUser");

        // Set up security context with mocked user
        SecurityContextHolder.getContext().setAuthentication(authentication);
        when(authentication.getPrincipal()).thenReturn(currentUser);
    }

    @Test
    void testCreateTaskForBoard() {
        // Arrange
        Long boardId = 1L;
        Task mockTask = new Task();
        when(taskService.createTaskForBoard(currentUser, boardId)).thenReturn(mockTask);

        // Act
        ResponseEntity<Task> response = taskController.createTaskForBoard(boardId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockTask, response.getBody());
        verify(taskService).createTaskForBoard(currentUser, boardId);
    }

    @Test
    void testUpdateTaskForBoard() {
        // Arrange
        Long boardId = 1L;
        Long taskId = 1L;
        UpdateTaskRequest request = new UpdateTaskRequest();
        Task mockTask = new Task();
        when(taskService.updateTaskForBoard(currentUser, boardId, taskId, request)).thenReturn(mockTask);

        // Act
        ResponseEntity<Task> response = taskController.updateTaskForBoard(boardId, taskId, request);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockTask, response.getBody());
        verify(taskService).updateTaskForBoard(currentUser, boardId, taskId, request);
    }

    @Test
    void testDeleteTask() {
        // Arrange
        Long boardId = 1L;
        Long taskId = 1L;

        // Act
        ResponseEntity<Void> response = taskController.deleteTask(boardId, taskId);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(taskService).deleteTask(currentUser, boardId, taskId);
    }

    @Test
    void testCommentOnTask() {
        // Arrange
        Long boardId = 1L;
        Long taskId = 1L;
        CommentRequest commentRequest = new CommentRequest();
        Task mockTask = new Task();
        when(taskService.commentOnTask(currentUser, boardId, taskId, commentRequest)).thenReturn(mockTask);

        // Act
        ResponseEntity<TaskResponse> response = taskController.commentOnTask(boardId, taskId, commentRequest);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(new TaskResponse(mockTask), response.getBody());
        verify(taskService).commentOnTask(currentUser, boardId, taskId, commentRequest);
    }
}
