package com.backend.backend.repository;

import com.backend.backend.model.UserBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserBoardRepository extends JpaRepository<UserBoard, Long> {
    List<UserBoard> findByUserId(Long userId);
}
