package com.application.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.application.constants.Role;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtUtils {

	@Value("${jwt.secret-key}")
	private String SECRET_KEY;

	@Value("${jwt.expiry-time}")
	private long EXPIRY_TIME; 

	@Value("${jwt.refresh-expiry-time}")
	private long REFRESH_EXPIRY_TIME; 

	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	public Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}

	private Claims extractAllClaims(String token) {
		return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
	}

	private Boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}
	
	// Method for generating a access token
	public String generateToken(String username) {
		Map<String, Object> claims = new HashMap<>();
		return createToken(claims, username, EXPIRY_TIME); 
	}

	public String generateToken(String username, String role) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("role", role); // Store the role in the token
		return createToken(claims, username, EXPIRY_TIME); // Use access token expiry time
	}

	// Method for generating a refresh token
	public String generateRefreshToken(String username) {
		Map<String, Object> claims = new HashMap<>();
		return createToken(claims, username, REFRESH_EXPIRY_TIME); // Use refresh token expiry time
	}

	// Common method to create a token (Access or Refresh)
	private String createToken(Map<String, Object> claims, String subject, long expiryTime) {
		return Jwts.builder().setClaims(claims).setSubject(subject) // The subject is the username (email)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + expiryTime))
				.signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
	}

	public Boolean validateToken(String token, UserDetails userDetails) {
		final String username = extractUsername(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}

	// Checks if the token contains an admin role
	public boolean isAdminToken(String token) {
		String roleString = extractClaim(token, claims -> claims.get("role", String.class));
		try {
			Role role = Role.fromString(roleString); 
			return role == Role.ADMIN || role == Role.SUPER_ADMIN;
		} catch (IllegalArgumentException e) {
			return false; 
		}
	}

	// Method to validate a refresh token (check if it's expired)
	public Boolean validateRefreshToken(String refreshToken) {
		return !isTokenExpired(refreshToken);
	}
}
