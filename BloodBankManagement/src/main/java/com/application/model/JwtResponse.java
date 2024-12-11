package com.application.model;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public class JwtResponse {

    private final String accessToken;    
    private final String email;
    private final Collection<? extends GrantedAuthority> role;
    
    public JwtResponse(String accessToken, String email, Collection<? extends GrantedAuthority> collection) {
        this.accessToken = accessToken;        
        this.email = email;
        this.role = collection;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getEmail() {
        return email;
    }
    
    public Collection<? extends GrantedAuthority> getRole() {
        return role;
    }

}
