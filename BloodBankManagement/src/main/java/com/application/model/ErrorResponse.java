package com.application.model;

import java.time.LocalDateTime;

public class ErrorResponse {

    private String errorCode;
    private String message;
    private String status;
    private LocalDateTime timestamp;

    public ErrorResponse(String errorCode, String message, String status) {
        this.errorCode = errorCode;
        this.message = message;
        this.status = status;
        this.timestamp = LocalDateTime.now();  // Automatically include the timestamp
    }

    public String getErrorCode() {
        return errorCode;
    }

    public String getMessage() {
        return message;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}