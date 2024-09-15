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

        if (request.getIndex() != null) {
            // ensure that the index is within the bounds of the task category
            int taskCategorySize = taskRepository.findAllByBoardIdAndCategoryId(boardId, task.getTaskCategory()).size();
            if (request.getIndex() < 0 || request.getIndex() > taskCategorySize) {
                throw new EntityNotFoundException("Index out of bounds for task category " + task.getTaskCategory().toString());
            }

            // check if reshuffling is required
            if (request.getIndex() < task.getIndex()) {
                // move tasks up
                List<Task> tasks = taskRepository.findAllByBoardIdAndCategoryId(boardId, task.getTaskCategory());
                for (Task t : tasks) {
                    if (t.getIndex() >= request.getIndex() && t.getIndex() < task.getIndex()) {
                        t.setIndex(t.getIndex() + 1);
                        taskRepository.save(t);
                    }
                }
            } else if (request.getIndex() > task.getIndex()) {
                // move tasks down
                List<Task> tasks = taskRepository.findAllByBoardIdAndCategoryId(boardId, task.getTaskCategory());
                for (Task t : tasks) {
                    if (t.getIndex() <= request.getIndex() && t.getIndex() > task.getIndex()) {
                        t.setIndex(t.getIndex() - 1);
                        taskRepository.save(t);
                    }
                }
            }


        } else {
            if (request.getTaskCategory() != null && task.getIndex() == null) {
                task.setIndex(taskRepository.findAllByBoardIdAndCategoryId(boardId, request.getTaskCategory()).size());
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
