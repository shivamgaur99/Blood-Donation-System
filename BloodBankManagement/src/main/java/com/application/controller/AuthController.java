package com.application.controller;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.application.model.ContactUs;
import com.application.model.JwtResponse;
import com.application.model.User;
import com.application.service.CaptchaService;
import com.application.service.ContactUsService;
import com.application.service.CookieService;
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
	private CookieService cookieService;

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
			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));

			UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());

			// Generate access and refresh tokens
			String accessToken = jwtUtil.generateToken(userDetails.getUsername());
			String refreshToken = jwtUtil.generateRefreshToken(userDetails.getUsername());

			// Use CookieService to create the refresh token cookie
			ResponseCookie cookie = cookieService.createRefreshTokenCookie(refreshToken);

			// Return access token in response and refresh token in cookie
			return ResponseEntity.ok().header("Set-Cookie", cookie.toString())
					.body(new JwtResponse(accessToken, user.getEmail()));
		} catch (BadCredentialsException e) {
			logger.warn("Invalid credentials for email: {}", user.getEmail());
			return new ResponseEntity<>("Invalid login credentials", HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			logger.error("Unexpected error during login", e);
			return new ResponseEntity<>("An error occurred during login", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/auth/refreshAccessToken")
	public ResponseEntity<?> refreshAccessToken(
			@CookieValue(name = "refreshToken", required = false) String refreshToken) {
		if (refreshToken == null || refreshToken.isEmpty()) {
			return new ResponseEntity<>("Refresh token is required", HttpStatus.BAD_REQUEST);
		}

		try {
			if (!jwtUtil.validateRefreshToken(refreshToken)) {
				return new ResponseEntity<>("Invalid or expired refresh token", HttpStatus.UNAUTHORIZED);
			}

			String username = jwtUtil.extractUsername(refreshToken);
			UserDetails userDetails = userDetailsService.loadUserByUsername(username);

			String newAccessToken = jwtUtil.generateToken(userDetails.getUsername());

			return ResponseEntity.ok(new JwtResponse(newAccessToken, username));
		} catch (Exception e) {
			logger.error("Error while refreshing access token", e);
			return new ResponseEntity<>("Error while refreshing access token", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// Validate and Rotate Token
	@PostMapping("/auth/refresh")
	public ResponseEntity<?> refreshToken(@CookieValue(name = "refreshToken", required = false) String refreshToken) {
		if (refreshToken == null || refreshToken.isEmpty()) {
			return new ResponseEntity<>("Refresh token is missing", HttpStatus.BAD_REQUEST);
		}

		try {
			if (!jwtUtil.validateRefreshToken(refreshToken)) {
				return new ResponseEntity<>("Invalid or expired refresh token", HttpStatus.UNAUTHORIZED);
			}

			String username = jwtUtil.extractUsername(refreshToken);
			UserDetails userDetails = userDetailsService.loadUserByUsername(username);

			String newAccessToken = jwtUtil.generateToken(userDetails.getUsername());
			String newRefreshToken = jwtUtil.generateRefreshToken(userDetails.getUsername());

			// Use CookieService to create a new refresh token cookie
			ResponseCookie refreshCookie = cookieService.createRefreshTokenCookie(newRefreshToken);

			return ResponseEntity.ok().header("Set-Cookie", refreshCookie.toString())
					.body(new JwtResponse(newAccessToken, username));
		} catch (Exception e) {
			return new ResponseEntity<>("Error refreshing token", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/auth/logout")
	public ResponseEntity<?> logout() {
		// Use CookieService to delete the refresh token cookie
		ResponseCookie cookie = cookieService.deleteCookie("refreshToken", "/auth/refresh");
		return ResponseEntity.ok().header("Set-Cookie", cookie.toString()).body("Logged out successfully");
	}

	@PostMapping("/contact-us")
	public ResponseEntity<?> submitContactForm(@Valid @RequestBody ContactUs contactUs) {

		// working but: uncaught timeout error in react
//      String captchaToken = contactUs.getCaptchaToken();

//      if (!captchaService.verifyCaptcha(captchaToken)) {
//          return ResponseEntity.badRequest().body("CAPTCHA validation failed");
//      }

		contactUsService.saveContactUs(contactUs);
		return ResponseEntity.ok("Contact form submitted successfully!");
	}
}
