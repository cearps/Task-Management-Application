package com.backend.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @RequestMapping(value="/boards", method = RequestMethod.GET)
    public ResponseEntity<String> getBoards() {
        return ResponseEntity.status(HttpStatus.OK).body("hello");
    }
}
