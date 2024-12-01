package com.application.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.application.BloodBankManagementApplication;
import com.application.custom_excs.InvalidCredentialsException;
import com.application.custom_excs.UserAlreadyExistsException;
import com.application.custom_excs.UserNotFoundException;
import com.application.model.AuthRequest;
import com.application.model.JwtResponse;
import com.application.model.User;
import com.application.service.RegistrationService;
import com.application.service.UserDetailsServiceImpl;
import com.application.util.JwtUtils;

@RestController
public class RegistrationController {

	@Autowired
	private RegistrationService userService;

	@Autowired
	private JwtUtils jwtUtil;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	private static final Logger logger = LoggerFactory.getLogger(BloodBankManagementApplication.class);

	@GetMapping("/")
	public String welcomeMessage() {
		return "Welcome to Blood Bank Management system !!!";
	}

	@PostMapping("/authenticate")
	public ResponseEntity<String> authenticate(@RequestBody AuthRequest authRequest) {
		// Simplified approach
		User user = userService.fetchUserByEmail(authRequest.getEmail());
		if (user == null) {
			throw new InvalidCredentialsException("Invalid credentials");
		}

		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), authRequest.getPassword()));

		String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
		return ResponseEntity.ok(token);
	}

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody User user) {

		if (user.getEmail() == null || user.getPassword() == null) {
			throw new IllegalArgumentException("Email and password are required.");
		}

		try {
			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
			UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
			String token = jwtUtil.generateToken(userDetails.getUsername());
			return new ResponseEntity<>(token, HttpStatus.OK);
		} catch (BadCredentialsException e) {
			logger.warn("Invalid credentials for email: {}", user.getEmail());
			return new ResponseEntity<>("Incorrect username or password", HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			logger.error("Unexpected error during login", e);
			return new ResponseEntity<>("An error occurred during login", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/user/login")
	public ResponseEntity<?> loginUser(@RequestBody User user) {
		if (user.getEmail() == null || user.getPassword() == null) {
			throw new IllegalArgumentException("Email and password are required.");
		}

		User authenticatedUser = userService.fetchUserByEmail(user.getEmail());
		if (authenticatedUser == null
				|| !passwordEncoder.matches(user.getPassword(), authenticatedUser.getPassword())) {
			throw new InvalidCredentialsException("Invalid credentials");
		}

		String token = jwtUtil.generateToken(authenticatedUser.getEmail(), authenticatedUser.getRole());
		return ResponseEntity.ok(new JwtResponse(token, authenticatedUser.getEmail()));
	}

	@PostMapping("/user/register")
	public ResponseEntity<?> registerUser(@RequestBody User user) {
		if (user.getEmail() == null || user.getEmail().isEmpty()) {
			throw new IllegalArgumentException("Email is required for registration!");
		}

		if (userService.fetchUserByEmail(user.getEmail()) != null) {
			throw new UserAlreadyExistsException("User with email already exists!");
		}

		if (user.getPassword() == null || user.getPassword().isEmpty()) {
			throw new IllegalArgumentException("Password is required!");
		}

		if (user.getPassword().length() < 6) {
			throw new IllegalArgumentException("Password must be at least 6 characters long!");
		}

		String hashedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(hashedPassword);
		user.setRole(user.getRole() == null || user.getRole().isEmpty() ? "user" : user.getRole());

		User savedUser = userService.saveUser(user);
		return ResponseEntity.ok(savedUser);
	}

	@PutMapping("/user/update/{email}")
	public ResponseEntity<?> updateUserProfile(@PathVariable String email, @RequestBody User user) {
		User updatedUser = userService.updateUserProfile(email, user);
		if (updatedUser == null) {
			throw new UserNotFoundException("User not found with email: " + email);
		}
		return ResponseEntity.ok(updatedUser);
	}

	@DeleteMapping("/user/delete/{email}")
	public ResponseEntity<String> deleteUser(@PathVariable String email) {
		User user = userService.fetchUserByEmail(email);
		if (user == null) {
			throw new UserNotFoundException("User not found");
		}

		userService.deleteUserByEmail(email);
		return ResponseEntity.ok("User deleted successfully");
	}

	@GetMapping("/userlist")
	public ResponseEntity<?> getUsers() {
		List<User> users = userService.getAllUsers();
		if (users.isEmpty()) {
			throw new UserNotFoundException("No users found");
		}
		return ResponseEntity.ok(users);
	}

	@GetMapping("/profileDetails/{email}")
	public ResponseEntity<User> getProfileDetails(@PathVariable String email) {
		User user = userService.fetchUserByEmail(email);
		if (user == null) {
			throw new UserNotFoundException("User not found with email: " + email);
		}
		return ResponseEntity.ok(user);
	}

	@GetMapping("/getTotalUsers")
	public ResponseEntity<Integer> getTotalUsers() {
		int totalUsers = userService.getAllUsers().size();
		return ResponseEntity.ok(totalUsers);
	}
}