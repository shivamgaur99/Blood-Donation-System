package com.application.custom_excs;

public class VolunteerNotFoundException extends RuntimeException {
    public VolunteerNotFoundException(String message) {
        super(message);
    }
}
