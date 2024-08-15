package com.backend.backend.repository;

import com.backend.backend.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query("SELECT b FROM Board b " +
            "JOIN UserBoard ub ON b.id = ub.board.id " +
            "WHERE b.id = :boardId AND ub.user.id = :userId")
    Optional<Board> findByIdAndUserId(@Param("boardId") Long boardId, @Param("userId") Long userId);
}
