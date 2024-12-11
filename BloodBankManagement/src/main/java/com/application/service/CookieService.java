package com.application.service;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

@Service
public class CookieService {

    public ResponseCookie createRefreshTokenCookie(String refreshToken) {
        return ResponseCookie.from("refreshToken", refreshToken)
            .httpOnly(true)
            .secure(true) // Use secure flag for HTTPS
            .path("/auth/refresh") // Restrict path for refresh endpoint
            .maxAge(7 * 24 * 60 * 60) // 7 days
            .sameSite("Strict") // Strict SameSite policy
            .build();
    }

    public ResponseCookie deleteCookie(String cookieName, String path) {
        return ResponseCookie.from(cookieName, "")
            .httpOnly(true)
            .secure(true)
            .path(path)
            .maxAge(0) // Expire immediately
            .sameSite("Strict")
            .build();
    }
}

