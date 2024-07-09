package com.backend.backend.repository;

import com.backend.backend.entity.UserBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserBoardRepository extends JpaRepository<UserBoard, Long> {
}
