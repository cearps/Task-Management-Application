package com.backend.backend.service;

import com.backend.backend.dto.BoardResponse;
import com.backend.backend.model.Board;
import com.backend.backend.model.User;
import com.backend.backend.model.UserBoard;
import com.backend.backend.repository.BoardRepository;
import com.backend.backend.repository.UserBoardRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
/**
 * Acknowledgements:
 * ChatGPT (https://chatgpt.com/) was used to assist in writing test
 * cases. The test cases were further edited manually for correctness, brevity and
 * coverage of cases in the code
 */
class BoardServiceTests {

    @Mock
    private BoardRepository boardRepository;

    @Mock
    private UserBoardRepository userBoardRepository;

    @InjectMocks
    private BoardService boardService;

    private User mockUser;
    private Board mockBoard;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Set up a mock user
        mockUser = new User();
        mockUser.setId(1L);

        // Set up a mock board
        mockBoard = new Board();
        mockBoard.setId(1L);
    }

    @Test
    void createBoardForUser_ShouldCreateAndSaveBoardAndUserBoard() {
        // Arrange: Set up the necessary mocks
        when(boardRepository.save(any(Board.class))).thenReturn(mockBoard);
        UserBoard mockUserBoard = new UserBoard();
        when(userBoardRepository.save(any(UserBoard.class))).thenReturn(mockUserBoard);

        // Act: Call the method
        BoardResponse result = boardService.createBoardForUser(mockUser);

        // Assert: Verify that board and userBoard are saved
        assertNotNull(result);
        assertEquals(new BoardResponse(mockBoard).getName(), result.getName());

        verify(boardRepository, times(1)).save(any(Board.class));
        verify(userBoardRepository, times(1)).save(any(UserBoard.class));
    }

    @Test
    void getBoardByIdAndUserNew_ShouldReturnBoard_WhenUserBoardExists() {
        // Arrange: Set up UserBoard and mock board retrieval
        UserBoard mockUserBoard = new UserBoard();
        mockUserBoard.setUser(mockUser);
        mockUserBoard.setBoard(mockBoard);

        List<UserBoard> userBoards = new ArrayList<>();
        userBoards.add(mockUserBoard);
        mockBoard.setUserBoards(userBoards);

        when(boardRepository.findById(1L)).thenReturn(Optional.of(mockBoard));

        // Act: Call the method
        BoardResponse result = boardService.getBoardByIdAndUser(1L, mockUser.getId());

        // Assert: Verify that the correct board is returned
        assertNotNull(result);
        assertEquals(new BoardResponse(mockBoard), result);

        verify(boardRepository, times(1)).findById(1L);
    }

    @Test
    void getBoardByIdAndUserNew_ShouldThrowException_WhenUserBoardDoesNotExist() {
        // Arrange: Simulate board without a matching UserBoard
        when(boardRepository.findById(1L)).thenReturn(Optional.of(mockBoard));

        // Act & Assert: Ensure EntityNotFoundException is thrown
        EntityNotFoundException thrown = assertThrows(EntityNotFoundException.class, () ->
                boardService.getBoardByIdAndUser(1L, mockUser.getId()));

        assertEquals("Board not found with id 1", thrown.getMessage());

        verify(boardRepository, times(1)).findById(1L);
    }

    @Test
    void deleteBoard_ShouldDeleteAllUserBoardsAndBoard_WhenFound() {
        // Arrange: Mock board retrieval with userBoards
        UserBoard mockUserBoard = new UserBoard();
        mockUserBoard.setUser(mockUser);
        mockUserBoard.setBoard(mockBoard);

        List<UserBoard> userBoards = new ArrayList<>();
        userBoards.add(mockUserBoard);
        mockBoard.setUserBoards(userBoards);

        when(boardRepository.findByIdAndUserId(1L, mockUser.getId())).thenReturn(Optional.of(mockBoard));

        // Act: Call the method
        boardService.deleteBoard(mockUser, 1L);

        // Assert: Verify that userBoards and the board are deleted
        verify(userBoardRepository, times(1)).delete(mockUserBoard);
        verify(boardRepository, times(1)).delete(mockBoard);
    }

    @Test
    void deleteBoard_ShouldThrowException_WhenBoardNotFound() {
        // Arrange: Simulate board not being found
        when(boardRepository.findByIdAndUserId(1L, mockUser.getId())).thenReturn(Optional.empty());

        // Act & Assert: Ensure EntityNotFoundException is thrown
        EntityNotFoundException thrown = assertThrows(EntityNotFoundException.class, () ->
                boardService.deleteBoard(mockUser, 1L));

        assertEquals("Board not found with id 1", thrown.getMessage());

        verify(boardRepository, times(1)).findByIdAndUserId(1L, mockUser.getId());
        verify(userBoardRepository, never()).delete(any(UserBoard.class));
        verify(boardRepository, never()).delete(any(Board.class));
    }
}
