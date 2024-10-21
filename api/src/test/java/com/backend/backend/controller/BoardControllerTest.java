package com.backend.backend.controller;

import com.backend.backend.dto.BoardResponse;
import com.backend.backend.dto.UpdateBoardRequest;
import com.backend.backend.model.Board;
import com.backend.backend.model.User;
import com.backend.backend.service.BoardService;
import com.backend.backend.service.UserBoardService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;
/**
 * Acknowledgements:
 * ChatGPT (https://chatgpt.com/) was used to assist in writing test
 * cases. The test cases were further edited manually for correctness, brevity and
 * coverage of cases in the code
 */
class BoardControllerTest {

    @InjectMocks
    private BoardController boardController;

    @Mock
    private UserBoardService userBoardService;

    @Mock
    private BoardService boardService;

    @Mock
    private Authentication authentication;

    private User currentUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        currentUser = new User();
        currentUser.setId(1L);
        currentUser.setUserTag("testUser");

        // Set up security context with mocked user
        SecurityContextHolder.getContext().setAuthentication(authentication);
        when(authentication.getPrincipal()).thenReturn(currentUser);
    }

    @Test
    void testGetBoards() {
        // Arrange
        List<BoardResponse> mockBoards = Collections.singletonList(new BoardResponse(null, "Test Board", "Description", null, null, null, null));
        when(userBoardService.getBoardsByUserId(currentUser.getId())).thenReturn(mockBoards);

        // Act
        ResponseEntity<List<BoardResponse>> response = boardController.getBoards();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockBoards, response.getBody());
        verify(userBoardService).getBoardsByUserId(currentUser.getId());
    }

    @Test
    void testCreateBoardForUser() {
        // Arrange
        BoardResponse mockBoardResponse = new BoardResponse(null, "New Board", "Description", null, null, null, null);
        when(boardService.createBoardForUser(currentUser)).thenReturn(mockBoardResponse);

        // Act
        ResponseEntity<BoardResponse> response = boardController.createBoardForUser();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockBoardResponse, response.getBody());
        verify(boardService).createBoardForUser(currentUser);
    }

    @Test
    void testGetBoardById() {
        // Arrange
        Long boardId = 1L;
        BoardResponse mockBoardResponse = new BoardResponse(boardId, "Board Name", "Description", null, null, null, null);
        when(boardService.getBoardByIdAndUser(boardId, currentUser.getId())).thenReturn(mockBoardResponse);

        // Act
        ResponseEntity<BoardResponse> response = boardController.getBoardById(boardId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockBoardResponse, response.getBody());
        verify(boardService).getBoardByIdAndUser(boardId, currentUser.getId());
    }

    @Test
    void testUpdateBoard() {
        // Arrange
        Long boardId = 1L;
        UpdateBoardRequest request = new UpdateBoardRequest();
        BoardResponse mockBoardResponse = new BoardResponse(boardId, "Updated Board", "Updated Description", null, null, null, null);
        when(userBoardService.updateBoardForUser(currentUser, boardId, request)).thenReturn(mockBoardResponse);

        // Act
        ResponseEntity<?> response = boardController.updateBoardById(boardId, request);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockBoardResponse, response.getBody());
        verify(userBoardService).updateBoardForUser(currentUser, boardId, request);
    }

    @Test
    void testDeleteBoard() {
        // Arrange
        Long boardId = 1L;

        // Act
        ResponseEntity<Void> response = boardController.deleteBoard(boardId);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(boardService).deleteBoard(currentUser, boardId);
    }
}
