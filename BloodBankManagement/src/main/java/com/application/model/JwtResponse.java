package com.application.model;

public class JwtResponse {

    private final String accessToken;    
    private final String email;

    public JwtResponse(String accessToken, String email) {
        this.accessToken = accessToken;        
        this.email = email;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getEmail() {
        return email;
    }

}
