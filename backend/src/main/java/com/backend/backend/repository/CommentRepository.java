package com.backend.backend.repository;

import com.backend.backend.entity.Board;
import com.backend.backend.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
