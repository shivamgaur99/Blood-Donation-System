package com.application.custom_excs;

public class JwtExpiredException extends RuntimeException {
    public JwtExpiredException(String message) {
        super(message);
    }
}
