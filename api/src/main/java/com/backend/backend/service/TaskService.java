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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class TaskService {

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    CommentsRepository commentRepository;

    public Task createTaskForBoard(User user, Long boardId) {
        Board board = boardRepository.findByIdAndUserId(boardId, user.getId())
                .orElseThrow(() -> new EntityNotFoundException("Board not found with id " + boardId.toString()));

        Task task = new Task();
        task.setBoard(board);
        taskRepository.save(task);
        return task;

    }

    public Task updateTaskForBoard(User user, Long boardId, Long taskId, UpdateTaskRequest request) {
        // confirm board and user are connected
        Task task = taskRepository.findByIdAndUserIdAndTaskId(boardId, user.getId(), taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id " + taskId.toString() +
                        " with board id " + boardId.toString() + " and user id " + user.getId().toString()));

        if (request.getName() != null) {
            task.setName(request.getName());
        }
        if (request.getDescription() != null) {
            task.setDescription(request.getDescription());
        }
        if (request.getDueDate() != null) {
            task.setDueDate(request.getDueDate());
        }
        if (request.getUrgency() != null) {
            task.setUrgency(request.getUrgency());
        }
        if (request.getTaskCategory() != null) {
            task.setTaskCategory(request.getTaskCategory());
        }

        taskRepository.save(task);
        return task;
    }

    public Task commentOnTask(User user, Long boardId, Long taskId, CommentRequest request) {
        Task task = taskRepository.findByIdAndUserIdAndTaskId(boardId, user.getId(), taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id " + taskId.toString() +
                        " with board id " + boardId.toString() + " and user id " + user.getId().toString()));

        Comment comment = new Comment();
        comment.setComment(request.getComment());
//        comment.setUser(user);
        comment.setTask(task);
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss dd-MM-yyyy");
        comment.setTimestamp(now.format(formatter));
        commentRepository.save(comment);
        return task;
    }

    public void deleteTask(User user, Long boardId, Long taskId) {
        Task task = taskRepository.findByIdAndUserIdAndTaskId(boardId, user.getId(), taskId)
                .orElseThrow(() -> new EntityNotFoundException("Task not found with id " + taskId.toString() +
                        " with board id " + boardId.toString() + " and user id " + user.getId().toString()));

        taskRepository.delete(task);
    }
}
