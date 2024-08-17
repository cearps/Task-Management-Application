package com.backend.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private LocalDate startDate;

    private LocalDate dueDate;

    @OneToMany(mappedBy = "board")
    @JsonIgnore
    private Set<UserBoard> userBoards;

    @OneToMany(mappedBy = "board")
    private List<Task> tasks;

}