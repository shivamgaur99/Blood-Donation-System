package com.application.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.application.model.AuthRequest;
import com.application.model.JwtResponse;
import com.application.model.User;
import com.application.service.RegistrationService;
import com.application.util.JwtUtils;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RegistrationController {
	@Autowired
	private RegistrationService registerService;

	@Autowired
	private JwtUtils jwtUtil;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@GetMapping("/")
	public String welcomeMessage() {
		return "Welcome to Blood Bank Management system !!!";
	}

	@PostMapping("/authenticate")
	public ResponseEntity<String> generateToken(@RequestBody AuthRequest authRequest) throws Exception {
		try {
			List<User> users = registerService.getAllUsers();
			String currentEmail = "";
			for (User obj : users) {
				if (obj.getEmail().equalsIgnoreCase(authRequest.getEmail())) {
					currentEmail = obj.getUsername();
				}
			}
			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(currentEmail, authRequest.getPassword()));
		} catch (Exception ex) {
			throw new Exception("Invalid credentials");
		}
		return new ResponseEntity<String>(jwtUtil.generateToken(authRequest.getEmail(), authRequest.getRole()),
				HttpStatus.OK);
	}

	@PostMapping("/user/login")
	public ResponseEntity<?> loginUser(@RequestBody User user) {
		try {
			String email = user.getEmail();
			String password = user.getPassword();

			if (email != null && password != null) {
				User authenticatedUser = registerService.fetchUserByEmail(email);

				if (authenticatedUser != null && passwordEncoder.matches(password, authenticatedUser.getPassword())) {
					String token = jwtUtil.generateToken(authenticatedUser.getEmail(), authenticatedUser.getRole());
					return ResponseEntity.ok(new JwtResponse(token, authenticatedUser.getEmail()));
				}
			}

			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while processing login");
		}
	}

	@PostMapping("/user/register")
	public ResponseEntity<?> registerUser(@RequestBody User user) {
		try {
			String currEmail = user.getEmail();
			if (currEmail == null || currEmail.isEmpty()) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is required for registration!");
			}

			User existingUser = registerService.fetchUserByEmail(currEmail);
			if (existingUser != null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body("User with " + currEmail + " already exists!");
			}

			String password = user.getPassword();
			if (password == null || password.isEmpty()) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password is required!");
			}

			String hashedPassword = passwordEncoder.encode(password);
			user.setPassword(hashedPassword);

			if (user.getRole() == null || user.getRole().isEmpty()) {
				user.setRole("user");
			}

			User savedUser = registerService.saveUser(user);
			return ResponseEntity.ok(savedUser);
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during user registration");
		}
	}

	@PutMapping("/user/update/{email}")
	public ResponseEntity<?> updateUserProfile(@PathVariable String email, @RequestBody User user) {
		try {

			User updatedUser = registerService.updateUserProfile(email, user);

			if (updatedUser != null) {
				return ResponseEntity.ok(updatedUser);
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with the email: " + email);
			}

		} catch (Exception ex) {

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error during user update: " + ex.getMessage());
		}
	}

	@PutMapping("/user/updateRole/{email}")
	public ResponseEntity<?> updateRole(@PathVariable String email, @RequestParam String newRole) {
		try {
			User user = registerService.fetchUserByEmail(email); // Fetch user by email
			if (user == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
			}

			if (!List.of("user", "volunteer", "admin", "superAdmin").contains(newRole)) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid role");
			}

			user.setRole(newRole);

			registerService.saveUser(user);
			return ResponseEntity.ok("User role updated successfully");
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user role");
		}
	}

	@DeleteMapping("/user/delete/{email}")
	public ResponseEntity<String> deleteUser(@PathVariable String email) {
		try {
			User user = registerService.fetchUserByEmail(email);
			if (user == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
			}

			registerService.deleteUserByEmail(email);

			return ResponseEntity.ok("User deleted successfully");
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user");
		}
	}

	@GetMapping("/userlist")
	public ResponseEntity<List<User>> getUsers() throws Exception {
		List<User> users = registerService.getAllUsers();
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}

	@GetMapping("/profileDetails/{email}")
	public ResponseEntity<List<User>> getProfileDetails(@PathVariable String email) throws Exception {
		List<User> users = registerService.fetchProfileByEmail(email);
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}

	@GetMapping("/getTotalUsers")
	public ResponseEntity<List<Integer>> getTotalUsers() throws Exception {
		List<User> users = registerService.getAllUsers();
		List<Integer> al = new ArrayList<>();
		al.add(users.size());
		return new ResponseEntity<List<Integer>>(al, HttpStatus.OK);
	}

}
