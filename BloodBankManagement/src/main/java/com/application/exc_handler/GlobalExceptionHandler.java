package com.application.exc_handler;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.application.constants.ErrorCode;
import com.application.custom_excs.InvalidCredentialsException;
import com.application.custom_excs.RoleUpdateFailedException;
import com.application.custom_excs.UserAlreadyExistsException;
import com.application.custom_excs.UserNotFoundException;
import com.application.custom_excs.UserUpdateFailedException;
import com.application.model.ErrorResponse;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // Helper method to create the ResponseEntity with ErrorResponse
    private ResponseEntity<ErrorResponse> createErrorResponse(ErrorCode errorCode, String message, HttpStatus status) {
        // Constructing the response with the appropriate error code, message, and status
        ErrorResponse errorResponse = new ErrorResponse(
            errorCode.getCode(),
            message,
            status.toString()
        );
        return new ResponseEntity<>(errorResponse, status);
    }

    // Handle specific exceptions (User not found)
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException ex, WebRequest request) {
        logger.error("User not found: {} | Request URI: {}", ex.getMessage(), request.getDescription(false));
        return createErrorResponse(ErrorCode.USER_NOT_FOUND, ex.getMessage(), HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExistsException(UserAlreadyExistsException ex, WebRequest request) {
        logger.error("User already exists: {} | Request URI: {}", ex.getMessage(), request.getDescription(false));
        return createErrorResponse(ErrorCode.USER_ALREADY_EXISTS, ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(UserUpdateFailedException.class)
    public ResponseEntity<ErrorResponse> handleUserUpdateFailedException(UserUpdateFailedException ex, WebRequest request) {
        logger.error("User update failed: {} | Request URI: {}", ex.getMessage(), request.getDescription(false));
        return createErrorResponse(ErrorCode.USER_UPDATE_FAILED, ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(RoleUpdateFailedException.class)
    public ResponseEntity<ErrorResponse> handleRoleUpdateFailedException(RoleUpdateFailedException ex, WebRequest request) {
        logger.error("Role update failed: {} | Request URI: {}", ex.getMessage(), request.getDescription(false));
        return createErrorResponse(ErrorCode.ROLE_UPDATE_FAILED, ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }


    // Handle specific exceptions (Invalid credentials)
    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleInvalidCredentialsException(InvalidCredentialsException ex, WebRequest request) {
        logger.warn("Invalid credentials attempt: {} | Request URI: {}", ex.getMessage(), request.getDescription(false));
        return createErrorResponse(ErrorCode.INVALID_CREDENTIALS, ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    // Handle illegal argument exceptions
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException ex, WebRequest request) {
        logger.warn("Invalid input: {} | Request URI: {}", ex.getMessage(), request.getDescription(false));
        return createErrorResponse(ErrorCode.INVALID_INPUT, ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    // Handle validation errors (e.g., @Valid annotation)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex, WebRequest request) {
        logger.warn("Validation error occurred: {} | Request URI: {}", ex.getMessage(), request.getDescription(false));

        // Collect all validation error messages
        List<String> errors = new ArrayList<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.add(error.getField() + ": " + error.getDefaultMessage());
        }

        String message = String.join(", ", errors);
        return createErrorResponse(ErrorCode.VALIDATION_ERROR, message, HttpStatus.BAD_REQUEST);
    }

    // Handle Access Denied errors (Spring Security)
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(AccessDeniedException ex, WebRequest request) {
        logger.info("Access Denied: {} | Request URI: {}", ex.getMessage(), request.getDescription(false));
        return createErrorResponse(ErrorCode.ACCESS_DENIED, "You do not have permission to access this resource", HttpStatus.FORBIDDEN);
    }

    // Handle generic exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex, WebRequest request) {
        logger.error("An unexpected error occurred: {} | Request URI: {}", ex.getMessage(), request.getDescription(false));
        return createErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR, "An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
