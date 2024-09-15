package com.backend.backend.service;

import com.backend.backend.dto.CommentRequest;
import com.backend.backend.dto.UpdateTaskRequest;
import com.backend.backend.model.Board;
import com.backend.backend.model.Comment;
import com.backend.backend.model.Task;
import com.backend.backend.model.User;
import com.backend.backend.repository.BoardRepository;
import com.backend.backend.repository.CommentsRepository;
import com.backend.backend.repository.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TaskServiceTests {
    @Mock
    BoardRepository boardRepository;

    @Mock
    TaskRepository taskRepository;

    @Mock
    CommentsRepository commentRepository;

    @InjectMocks
    private TaskService taskService;
    private User mockUser;
    private Board mockBoard;
    private Task mockTask;
    private UpdateTaskRequest mockRequest;
    private CommentRequest mockCommentRequest;


    @BeforeEach
    void setUp() {
        // Initialize mocks
        MockitoAnnotations.openMocks(this);

    }

    @Test
    void createTaskForBoard_ShouldCreateTask_WhenBoardExists() {
        // Setup
        mockUser = new User();
        mockUser.setId(1L);

        mockBoard = new Board();
        mockBoard.setId(1L);

        // Arrange
        when(boardRepository.findByIdAndUserId(mockBoard.getId(), mockUser.getId()))
                .thenReturn(Optional.of(mockBoard));

        // Act
        Task result = taskService.createTaskForBoard(mockUser, mockBoard.getId());

        // Assert
        assertNotNull(result);
        assertEquals(mockBoard, result.getBoard());

        // Verify that the task was saved
        verify(taskRepository, times(1)).save(any(Task.class));
        verify(boardRepository, times(1)).findByIdAndUserId(mockBoard.getId(), mockUser.getId());
    }

    @Test
    void createTaskForBoard_ShouldThrowEntityNotFoundException_WhenBoardDoesNotExist() {
        // Setup
        mockUser = new User();
        mockUser.setId(1L);

        mockBoard = new Board();
        mockBoard.setId(1L);

        // Arrange
        when(boardRepository.findByIdAndUserId(mockBoard.getId(), mockUser.getId()))
                .thenReturn(Optional.empty());

        // Act & Assert
        EntityNotFoundException thrown = assertThrows(
                EntityNotFoundException.class,
                () -> taskService.createTaskForBoard(mockUser, mockBoard.getId())
        );

        assertEquals("Board not found with id 1", thrown.getMessage());

        // Verify that the task was not saved and board was searched once
        verify(taskRepository, never()).save(any(Task.class));
        verify(boardRepository, times(1)).findByIdAndUserId(mockBoard.getId(), mockUser.getId());
    }

    @Test
    void updateTaskForBoard_ShouldUpdateTask_WhenTaskExists() {
        // Set up a mock user
        mockUser = new User();
        mockUser.setId(1L);

        // Set up a mock task
        mockTask = new Task();
        mockTask.setId(1L);
        mockTask.setName("Old Task Name");
        mockTask.setDescription("Old Task Description");

        // Set up a mock request with updates
        mockRequest = new UpdateTaskRequest();
        mockRequest.setName("New Task Name");
        mockRequest.setDescription("New Task Description");
        // Arrange: Mock the repository to return the existing task
        when(taskRepository.findByIdAndUserIdAndTaskId(1L, mockUser.getId(), 1L))
                .thenReturn(Optional.of(mockTask));

        // Act: Call the method under test
        Task updatedTask = taskService.updateTaskForBoard(mockUser, 1L, 1L, mockRequest);

        // Assert: Ensure the task was updated correctly
        assertNotNull(updatedTask);
        assertEquals("New Task Name", updatedTask.getName());
        assertEquals("New Task Description", updatedTask.getDescription());

        // Verify that the save method was called once
        verify(taskRepository, times(1)).save(updatedTask);
        verify(taskRepository, times(1))
                .findByIdAndUserIdAndTaskId(1L, mockUser.getId(), 1L);
    }

    @Test
    void updateTaskForBoard_ShouldThrowEntityNotFoundException_WhenTaskDoesNotExist() {
        // Set up a mock user
        mockUser = new User();
        mockUser.setId(1L);

        // Set up a mock task
        mockTask = new Task();
        mockTask.setId(1L);
        mockTask.setName("Old Task Name");
        mockTask.setDescription("Old Task Description");

        // Set up a mock request with updates
        mockRequest = new UpdateTaskRequest();
        mockRequest.setName("New Task Name");
        mockRequest.setDescription("New Task Description");
        // Arrange: Simulate task not being found
        when(taskRepository.findByIdAndUserIdAndTaskId(1L, mockUser.getId(), 1L))
                .thenReturn(Optional.empty());

        // Act & Assert: Ensure exception is thrown
        EntityNotFoundException thrown = assertThrows(EntityNotFoundException.class, () ->
                taskService.updateTaskForBoard(mockUser, 1L, 1L, mockRequest));

        assertEquals("Task not found with id 1 with board id 1 and user id 1", thrown.getMessage());

        // Verify that the save method was never called
        verify(taskRepository, never()).save(any(Task.class));
        verify(taskRepository, times(1))
                .findByIdAndUserIdAndTaskId(1L, mockUser.getId(), 1L);
    }

    @Test
    void updateTaskForBoard_ShouldOnlyUpdateProvidedFields() {
        // Set up a mock user
        mockUser = new User();
        mockUser.setId(1L);

        // Set up a mock task
        mockTask = new Task();
        mockTask.setId(1L);
        mockTask.setName("Old Task Name");
        mockTask.setDescription("Old Task Description");

        // Set up a mock request with updates
        mockRequest = new UpdateTaskRequest();
        mockRequest.setName("New Task Name");
        mockRequest.setDescription("New Task Description");
        // Arrange: Mock task that already has a name and description, but no urgency
        when(taskRepository.findByIdAndUserIdAndTaskId(1L, mockUser.getId(), 1L))
                .thenReturn(Optional.of(mockTask));

        // Set up an update request that only updates the urgency
        UpdateTaskRequest partialUpdateRequest = new UpdateTaskRequest();
        partialUpdateRequest.setUrgency(5);  // Only update urgency

        // Act: Call the method under test
        Task updatedTask = taskService.updateTaskForBoard(mockUser, 1L, 1L, partialUpdateRequest);

        // Assert: Ensure only the urgency is updated, while other fields remain unchanged
        assertNotNull(updatedTask);
        assertEquals("Old Task Name", updatedTask.getName());  // Name remains unchanged
        assertEquals("Old Task Description", updatedTask.getDescription());  // Description unchanged
        assertEquals(5, updatedTask.getUrgency());  // Urgency is updated

        // Verify the save and find methods are called correctly
        verify(taskRepository, times(1)).save(updatedTask);
        verify(taskRepository, times(1))
                .findByIdAndUserIdAndTaskId(1L, mockUser.getId(), 1L);
    }


    @Test
    void commentOnTask_ShouldSaveComment_WhenTaskExists() {

        // Set up a mock user
        mockUser = new User();
        mockUser.setId(1L);

        // Set up a mock task
        mockTask = new Task();
        mockTask.setId(1L);

        // Set up a mock comment request
        mockCommentRequest = new CommentRequest();
        mockCommentRequest.setComment("This is a comment");
        // Arrange: Mock the repository to return the existing task
        when(taskRepository.findByIdAndUserIdAndTaskId(1L, mockUser.getId(), 1L))
                .thenReturn(Optional.of(mockTask));

        // Act: Call the method under test
        Task resultTask = taskService.commentOnTask(mockUser, 1L, 1L, mockCommentRequest);

        // Assert: Ensure the task is returned and comment is saved correctly
        assertNotNull(resultTask);
        assertEquals(mockTask, resultTask);

        // Capture the comment passed to the repository save method
        verify(commentRepository, times(1)).save(any(Comment.class));

        // Verify the find method was called once
        verify(taskRepository, times(1))
                .findByIdAndUserIdAndTaskId(1L, mockUser.getId(), 1L);
    }

    @Test
    void commentOnTask_ShouldThrowEntityNotFoundException_WhenTaskDoesNotExist() {

        // Set up a mock user
        mockUser = new User();
        mockUser.setId(1L);

        // Set up a mock task
        mockTask = new Task();
        mockTask.setId(1L);

        // Set up a mock comment request
        mockCommentRequest = new CommentRequest();
        mockCommentRequest.setComment("This is a comment");
        // Arrange: Simulate task not being found
        when(taskRepository.findByIdAndUserIdAndTaskId(1L, mockUser.getId(), 1L))
                .thenReturn(Optional.empty());

        // Act & Assert: Ensure exception is thrown
        EntityNotFoundException thrown = assertThrows(EntityNotFoundException.class, () ->
                taskService.commentOnTask(mockUser, 1L, 1L, mockCommentRequest));

        assertEquals("Task not found with id 1 with board id 1 and user id 1", thrown.getMessage());

        // Verify that no comment was saved
        verify(commentRepository, never()).save(any(Comment.class));
        verify(taskRepository, times(1))
                .findByIdAndUserIdAndTaskId(1L, mockUser.getId(), 1L);
    }

    @Test
    void commentOnTask_ShouldSaveCommentWithCorrectTimestamp() {

        // Set up a mock user
        mockUser = new User();
        mockUser.setId(1L);

        // Set up a mock task
        mockTask = new Task();
        mockTask.setId(1L);

        // Set up a mock comment request
        mockCommentRequest = new CommentRequest();
        mockCommentRequest.setComment("This is a comment");
        // Arrange: Mock the repository to return the existing task
        when(taskRepository.findByIdAndUserIdAndTaskId(1L, mockUser.getId(), 1L))
                .thenReturn(Optional.of(mockTask));

        // Act: Call the method under test
        taskService.commentOnTask(mockUser, 1L, 1L, mockCommentRequest);

        // Capture the comment passed to the repository save method
        verify(commentRepository).save(argThat(comment -> {
            // Verify that the timestamp is set correctly
            ZoneId zoneId = ZoneId.of("Australia/Melbourne");
            LocalDateTime now = LocalDateTime.now(zoneId);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss dd-MM-yyyy");
            String expectedTimestamp = now.format(formatter);

            return expectedTimestamp.equals(comment.getTimestamp())
                    && mockUser.equals(comment.getUser())
                    && mockCommentRequest.getComment().equals(comment.getComment())
                    && mockTask.equals(comment.getTask());
        }));
    }

    @Test
    void deleteTask_ShouldDeleteTask_WhenTaskExists() {
        // Set up a mock user
        mockUser = new User();
        mockUser.setId(1L);

        // Set up a mock task
        mockTask = new Task();
        mockTask.setId(1L);
        // Arrange: Mock the repository to return the existing task
        when(taskRepository.findByIdAndUserIdAndTaskId(1L, mockUser.getId(), 1L))
                .thenReturn(Optional.of(mockTask));

        // Act: Call the deleteTask method
        taskService.deleteTask(mockUser, 1L, 1L);

        // Assert: Verify that the delete method was called
        verify(taskRepository, times(1)).delete(mockTask);

        // Verify that the find method was called
        verify(taskRepository, times(1))
                .findByIdAndUserIdAndTaskId(1L, mockUser.getId(), 1L);
    }

    @Test
    void deleteTask_ShouldThrowEntityNotFoundException_WhenTaskDoesNotExist() {
        // Set up a mock user
        mockUser = new User();
        mockUser.setId(1L);

        // Set up a mock task
        mockTask = new Task();
        mockTask.setId(1L);
        // Arrange: Simulate task not being found
        when(taskRepository.findByIdAndUserIdAndTaskId(1L, mockUser.getId(), 1L))
                .thenReturn(Optional.empty());

        // Act & Assert: Ensure exception is thrown
        EntityNotFoundException thrown = assertThrows(EntityNotFoundException.class, () ->
                taskService.deleteTask(mockUser, 1L, 1L));

        assertEquals("Task not found with id 1 with board id 1 and user id 1", thrown.getMessage());

        // Verify that the delete method was never called
        verify(taskRepository, never()).delete(any(Task.class));
        verify(taskRepository, times(1))
                .findByIdAndUserIdAndTaskId(1L, mockUser.getId(), 1L);
    }
}
