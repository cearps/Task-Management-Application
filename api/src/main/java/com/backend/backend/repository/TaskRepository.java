package com.backend.backend.repository;

import com.backend.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface TaskRepository extends JpaRepository<Task, Long> {


    @Query("SELECT t FROM Task t " +
            "JOIN Board b ON b.id = t.board.id " +
            "LEFT JOIN UserBoard ub ON ub.board.id = b.id " +
            "WHERE b.id = :boardId AND ub.user.id = :userId AND t.id = :taskId")
    Optional<Task> findByIdAndUserIdAndTaskId(@Param("boardId") Long boardId, @Param("userId") Long userId,
                                              @Param("taskId") Long taskId);
}