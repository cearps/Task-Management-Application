package com.backend.backend.service;

import com.backend.backend.dto.BoardResponse;
import com.backend.backend.dto.UpdateBoardRequest;
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

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserBoardServiceTest {

    @Mock
    private UserBoardRepository userBoardRepository;

    @Mock
    private BoardRepository boardRepository;

    @InjectMocks
    private UserBoardService userBoardService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetBoardsByUserId() {
        // Setup mock data
        Long userId = 1L;
        Board board1 = new Board();
        board1.setId(1L);
        board1.setName("Board 1");
        Board board2 = new Board();
        board2.setId(2L);
        board2.setName("Board 2");

        UserBoard userBoard1 = new UserBoard();
        userBoard1.setBoard(board1);
        UserBoard userBoard2 = new UserBoard();
        userBoard2.setBoard(board2);

        List<UserBoard> userBoards = new ArrayList<>();
        userBoards.add(userBoard1);
        userBoards.add(userBoard2);

        // Mock behavior
        when(userBoardRepository.findByUserId(userId)).thenReturn(userBoards);

        // Call the service method
        List<BoardResponse> boardResponses = userBoardService.getBoardsByUserId(userId);

        // Assertions
        assertEquals(2, boardResponses.size());
        assertEquals("Board 1", boardResponses.get(0).getName());
        assertEquals("Board 2", boardResponses.get(1).getName());

        // Verify that the repository method was called
        verify(userBoardRepository, times(1)).findByUserId(userId);
    }

    @Test
    void testUpdateBoardForUserSuccess() {
        // Setup mock data
        User user = new User();
        user.setId(1L);

        Long boardId = 1L;

        Board board = new Board();
        board.setId(boardId);
        board.setName("Old Name");
        board.setDescription("Old Description");
        board.setStartDate(LocalDate.of(2023, 1, 2));
        board.setDueDate(LocalDate.of(2023, 12, 10));
        UpdateBoardRequest updateRequest = new UpdateBoardRequest();
        updateRequest.setName("New Name");
        updateRequest.setDescription("New Description");
        updateRequest.setStartDate(LocalDate.of(2023, 1, 1));
        updateRequest.setDueDate(LocalDate.of(2023, 12, 31));

        // Mock behavior
        when(boardRepository.findByIdAndUserId(boardId, user.getId())).thenReturn(Optional.of(board));

        // Call the service method
        BoardResponse updatedBoard = userBoardService.updateBoardForUser(user, boardId, updateRequest);

        // Assertions
        assertEquals("New Name", updatedBoard.getName());
        assertEquals("New Description", updatedBoard.getDescription());
        assertEquals(LocalDate.of(2023, 1, 1), updatedBoard.getStartDate());
        assertEquals(LocalDate.of(2023, 12, 31), updatedBoard.getDueDate());

        // Verify that the board repository methods were called
        verify(boardRepository, times(1)).findByIdAndUserId(boardId, user.getId());
        verify(boardRepository, times(1)).save(board);
    }

    @Test
    void testUpdateBoardForUserBoardNotFound() {
        // Setup mock data
        User user = new User();
        user.setId(1L);

        Long boardId = 1L;
        UpdateBoardRequest updateRequest = new UpdateBoardRequest();

        // Mock behavior
        when(boardRepository.findByIdAndUserId(boardId, user.getId())).thenReturn(Optional.empty());

        // Call the service method and expect an exception
        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> {
            userBoardService.updateBoardForUser(user, boardId, updateRequest);
        });

        // Assertions
        assertEquals("Board not found with id 1", exception.getMessage());

        // Verify that the repository method was called
        verify(boardRepository, times(1)).findByIdAndUserId(boardId, user.getId());
        verify(boardRepository, never()).save(any(Board.class));  // save should never be called
    }
}

