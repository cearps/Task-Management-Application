package com.backend.backend.service;

import com.backend.backend.dto.CreateTaskRequest;
import com.backend.backend.model.Board;
import com.backend.backend.model.Task;
import com.backend.backend.model.User;
import com.backend.backend.repository.BoardRepository;
import com.backend.backend.repository.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    TaskRepository taskRepository;

    public Task createTaskForBoard(User user, CreateTaskRequest request) {
        Board board = boardRepository.findByIdAndUserId(request.getBoardId(), user.getId())
                .orElseThrow(() -> new EntityNotFoundException("Board not found with id " + request.getBoardId().toString()));

        Task task = new Task();
        task.setBoard(board);
        taskRepository.save(task);
        return task;

    }
}
