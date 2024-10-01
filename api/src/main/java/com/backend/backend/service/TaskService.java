package com.backend.backend.service;

import com.backend.backend.dto.CommentRequest;
import com.backend.backend.dto.ShortUserRequest;
import com.backend.backend.dto.TaskResponse;
import com.backend.backend.dto.UpdateTaskRequest;
import com.backend.backend.exceptions.TaskEditException;
import com.backend.backend.model.*;
import com.backend.backend.repository.BoardRepository;
import com.backend.backend.repository.CommentsRepository;
import com.backend.backend.repository.TaskRepository;
import com.backend.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    TaskRepository taskRepository;

    @Autowired
    CommentsRepository commentRepository;

    @Autowired
    UserRepository userRepository;

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
            if (task.getBoard().getStartDate().isAfter(request.getDueDate())) {
                throw new TaskEditException("Start date must be before due date");
            }
            task.setDueDate(request.getDueDate());
        }
        if (request.getUrgency() != null) {
            task.setUrgency(request.getUrgency());
        }
        if (request.getTaskCategory() != null) {
            task.setTaskCategory(request.getTaskCategory());
        }
        if (request.getUsers() != null) {
            task.getUserTasks().clear();
            for (ShortUserRequest userRequest : request.getUsers()) {
                User userToAdd = userRepository.findByUserTag(userRequest.getUserTag()).orElseThrow(() -> new EntityNotFoundException("User not found with userTag " + userRequest.getUserTag()));

                UserTask userTask = new UserTask();
                userTask.setUser(userToAdd);
                userTask.setTask(task);
                task.getUserTasks().add(userTask);
            }
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
        comment.setUser(user);
        comment.setTask(task);
        ZoneId zoneId = ZoneId.of("Australia/Melbourne");
        LocalDateTime now = LocalDateTime.now(zoneId);
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
