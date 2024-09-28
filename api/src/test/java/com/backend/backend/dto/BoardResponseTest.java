package com.backend.backend.dto;

import com.backend.backend.dto.BoardResponse;
import com.backend.backend.model.Board;
import com.backend.backend.model.Task;
import com.backend.backend.model.UserBoard;
import com.backend.backend.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BoardResponseTest {

    private Board boardMock;
    private UserBoard userBoardMock;
    private User userMock;
    private Task taskMock;

    @BeforeEach
    void setUp() {
        // Mock the Board, UserBoard, User, and Task models
        boardMock = mock(Board.class);
        userBoardMock = mock(UserBoard.class);
        userMock = mock(User.class);
        taskMock = mock(Task.class);
    }

    @Test
    void testBoardResponseFields() {
        // Set up values for board fields
        when(boardMock.getId()).thenReturn(1L);
        when(boardMock.getName()).thenReturn("Test Board");
        when(boardMock.getDescription()).thenReturn("This is a test board.");
        when(boardMock.getStartDate()).thenReturn(LocalDate.of(2023, 1, 1));
        when(boardMock.getDueDate()).thenReturn(LocalDate.of(2023, 12, 31));

        // Create the BoardResponse and assert basic fields are correct
        BoardResponse response = new BoardResponse(boardMock);
        assertEquals(1L, response.getId());
        assertEquals("Test Board", response.getName());
        assertEquals("This is a test board.", response.getDescription());
        assertEquals(LocalDate.of(2023, 1, 1), response.getStartDate());
        assertEquals(LocalDate.of(2023, 12, 31), response.getDueDate());
    }

    @Test
    void testUserBoardMapping() {
        // Set up mocks for user boards and user
        when(userMock.getId()).thenReturn(2L);
        when(userMock.getUserTag()).thenReturn("user123");
        when(userBoardMock.getUser()).thenReturn(userMock);

        List<UserBoard> userBoards = Arrays.asList(userBoardMock);
        when(boardMock.getUserBoards()).thenReturn(userBoards);

        // Create the BoardResponse and assert user mappings
        BoardResponse response = new BoardResponse(boardMock);

        assertNotNull(response.getUsers());
        assertEquals(1, response.getUsers().size());
        assertEquals(2L, response.getUsers().get(0).getId());
        assertEquals("user123", response.getUsers().get(0).getUserTag());
    }

    @Test
    void testTaskMapping() {
        // Set up mocks for tasks
        when(taskMock.getId()).thenReturn(101L);

        List<Task> tasks = Arrays.asList(taskMock);
        when(boardMock.getTasks()).thenReturn(tasks);

        // Create the BoardResponse and assert task mappings
        BoardResponse response = new BoardResponse(boardMock);

        assertNotNull(response.getTasks());
        assertEquals(1, response.getTasks().size());
        assertEquals(101L, response.getTasks().get(0).getId());
    }

    @Test
    void testEmptyUsersAndTasks() {
        // When no user boards or tasks are present
        when(boardMock.getUserBoards()).thenReturn(Arrays.asList());
        when(boardMock.getTasks()).thenReturn(Arrays.asList());

        // Create the BoardResponse and assert empty lists
        BoardResponse response = new BoardResponse(boardMock);

        assertNotNull(response.getUsers());
        assertTrue(response.getUsers().isEmpty());

        assertNotNull(response.getTasks());
        assertTrue(response.getTasks().isEmpty());
    }
}
