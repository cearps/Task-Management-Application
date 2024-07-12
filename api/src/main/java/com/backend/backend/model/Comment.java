package com.backend.backend.model;

import jakarta.persistence.*;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Task task;

    @ManyToOne
    @JoinColumn(name = "users_id", nullable = false)
    private User user;
}
