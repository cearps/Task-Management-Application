package com.backend.backend.repository;

import com.backend.backend.entity.Board;
import com.backend.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
