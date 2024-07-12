package com.backend.backend.model;

import jakarta.persistence.*;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;
    private String description;
    private String state;
    private Date dueDate;
    private String urgency;

    @OneToMany(mappedBy = "task")
    private Set<Comment> comments;

    @ManyToMany
    @JoinTable(
            name = "users_task",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "users_id")
    )
    private Set<User> users = new HashSet<>();
}
