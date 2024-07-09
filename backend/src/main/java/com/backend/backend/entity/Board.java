package com.backend.backend.entity;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Set;


@Entity
public class Board {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    private Date startDate;

    @Column
    private Date dueDate;

    @OneToMany(mappedBy = "board")
    private Set<UserBoard> userBoards;
}
