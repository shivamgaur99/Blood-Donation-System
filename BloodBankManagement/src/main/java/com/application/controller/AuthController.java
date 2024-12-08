package com.application.controller;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.application.model.ContactUs;
import com.application.model.JwtResponse;
import com.application.model.User;
import com.application.service.CaptchaService;
import com.application.service.ContactUsService;
import com.application.service.UserDetailsServiceImpl;
import com.application.util.JwtUtils;

@RestController
public class AuthController {

	@Autowired
	private JwtUtils jwtUtil;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	@Autowired
	private CaptchaService captchaService;

	@Autowired
	private ContactUsService contactUsService;

	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	@GetMapping("/")
	public String welcomeMessage() {
		return "Welcome to Blood Bank Management system !!!";
	}

	@PostMapping("/auth/login")
	public ResponseEntity<?> login(@RequestBody User user) {

		if (user.getEmail() == null || user.getPassword() == null) {
			throw new IllegalArgumentException("Email and password are required.");
		}

		try {
			// Authenticate user
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));

			// Load user details
			UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());

			// Generate access and refresh tokens
			String accessToken = jwtUtil.generateToken(userDetails.getUsername());
			String refreshToken = jwtUtil.generateRefreshToken(userDetails.getUsername());

			// Return tokens in the response
			return ResponseEntity.ok(new JwtResponse(accessToken, refreshToken, user.getEmail()));
		} catch (BadCredentialsException e) {
			logger.warn("Invalid credentials for email: {}", user.getEmail());
			return new ResponseEntity<>("Incorrect username or password", HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			logger.error("Unexpected error during login", e);
			return new ResponseEntity<>("An error occurred during login", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/auth/refresh")
	public ResponseEntity<?> refreshAccessToken(@RequestParam String refreshToken) {
		// Validate refresh token
		if (refreshToken == null || refreshToken.isEmpty()) {
			return new ResponseEntity<>("Refresh token is required", HttpStatus.BAD_REQUEST);
		}

		// Verify and extract username from refresh token
		String username;
		try {
			if (!jwtUtil.validateRefreshToken(refreshToken)) {
				return new ResponseEntity<>("Invalid or expired refresh token", HttpStatus.UNAUTHORIZED);
			}

			// Extract username from refresh token
			username = jwtUtil.extractUsername(refreshToken);
			UserDetails userDetails = userDetailsService.loadUserByUsername(username);

			// Generate a new access token using the username
			String newAccessToken = jwtUtil.generateToken(userDetails.getUsername());

			// Return the new access token
			return ResponseEntity.ok(new JwtResponse(newAccessToken, refreshToken, username));
		} catch (Exception e) {
			logger.error("Error while refreshing access token", e);
			return new ResponseEntity<>("Error while refreshing access token", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/contact-us")
	public ResponseEntity<?> submitContactForm(@Valid @RequestBody ContactUs contactUs) {
		
		// working : uncaught timeout error in react
//		String captchaToken = contactUs.getCaptchaToken();
		
//		if (!captchaService.verifyCaptcha(captchaToken)) {
//			return ResponseEntity.badRequest().body("CAPTCHA validation failed");
//		}
		
		contactUsService.saveContactUs(contactUs);
		return ResponseEntity.ok("Contact form submitted successfully!");
	}

}
