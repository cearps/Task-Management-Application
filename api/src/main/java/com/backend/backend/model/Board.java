package com.backend.backend.model;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @OneToMany(mappedBy = "board")
    private Set<UserBoard> userBoards;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<UserBoard> getUserBoards() {
        return userBoards;
    }

    public void setUserBoards(Set<UserBoard> userBoards) {
        this.userBoards = userBoards;
    }
}