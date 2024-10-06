package com.backend.backend.exceptions;

public class CharacterLimitException extends RuntimeException {
    public CharacterLimitException(String message) {
        super(message);
    }
}
