package com.backend.backend.repository;

import com.backend.backend.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KanbanRepository extends JpaRepository<Board, Long> {
}
