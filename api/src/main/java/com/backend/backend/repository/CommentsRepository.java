package com.backend.backend.repository;

import com.backend.backend.model.Comments;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CommentsRepository extends JpaRepository<Comments, Long> {
}
