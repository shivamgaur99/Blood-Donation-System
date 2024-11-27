package com.application.constants;

public enum ErrorCode {

	USER_NOT_FOUND("USER_NOT_FOUND", "User not found in the system", 404),
	INVALID_CREDENTIALS("INVALID_CREDENTIALS", "The provided credentials are incorrect", 401),
	INVALID_INPUT("INVALID_INPUT", "The input provided is invalid", 400),
	INTERNAL_SERVER_ERROR("INTERNAL_SERVER_ERROR", "An unexpected error occurred", 500),
	ACCESS_DENIED("ACCESS_DENIED", "You do not have permission to access this resource", 403),
	VALIDATION_ERROR("VALIDATION_ERROR", "There was an error during validation", 422),
	USER_ALREADY_EXISTS("USER_ALREADY_EXISTS", "User with the provided email already exists", 400),
	USER_UPDATE_FAILED("USER_UPDATE_FAILED", "Failed to update the user profile", 500),
	ROLE_UPDATE_FAILED("ROLE_UPDATE_FAILED", "Failed to update the user role", 500);

	private final String code;
	private final String message;
	private final int httpStatusCode;

	ErrorCode(String code, String message, int httpStatusCode) {
		this.code = code;
		this.message = message;
		this.httpStatusCode = httpStatusCode;
	}

	public String getCode() {
		return this.code;
	}

	public String getMessage() {
		return this.message;
	}

	public int getHttpStatusCode() {
		return this.httpStatusCode;
	}

	@Override
	public String toString() {
		return String.format("ErrorCode{code='%s', message='%s', httpStatusCode=%d}", code, message, httpStatusCode);
	}
}
