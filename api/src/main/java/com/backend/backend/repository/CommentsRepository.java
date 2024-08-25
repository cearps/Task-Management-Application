package com.backend.backend.repository;

import com.backend.backend.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CommentsRepository extends JpaRepository<Comment, Long> {
}
