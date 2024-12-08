package com.application.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.application.constants.Role;
import com.application.custom_excs.InvalidCredentialsException;
import com.application.custom_excs.ResourceNotFoundException;
import com.application.custom_excs.UserAlreadyExistsException;
import com.application.custom_excs.UserNotFoundException;
import com.application.model.Admin;
import com.application.model.AuthRequest;
import com.application.model.ContactUs;
import com.application.model.JwtResponse;
import com.application.model.User;
import com.application.service.AdminService;
import com.application.service.ContactUsService;
import com.application.service.UserService;
import com.application.util.JwtUtils;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private AdminService adminService;

	@Autowired
	private UserService userService;

	@Autowired
	private ContactUsService contactUsService;

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@PostMapping("/login")
	public ResponseEntity<?> loginAdmin(@RequestBody AuthRequest authRequest) {
	    Admin admin = adminService.fetchAdminByEmail(authRequest.getEmail());
	    if (admin == null || !passwordEncoder.matches(authRequest.getPassword(), admin.getPassword())) {
	        throw new InvalidCredentialsException("Invalid credentials");
	    }

	    // Generate both access and refresh tokens
	    String accessToken = jwtUtils.generateToken(admin.getEmail(), admin.getRole());
	    String refreshToken = jwtUtils.generateRefreshToken(admin.getEmail());

	    // Return tokens in the response
	    return ResponseEntity.ok(new JwtResponse(accessToken, refreshToken, authRequest.getEmail()));
	}


	@PostMapping("/register")
	public ResponseEntity<?> registerAdmin(@Valid @RequestBody Admin admin) {
		if (adminService.fetchAdminByEmail(admin.getEmail()) != null) {
			throw new UserAlreadyExistsException("Admin with this email already exists!");
		}

		String password = admin.getPassword();
		if (password == null || password.isEmpty()) {
			throw new IllegalArgumentException("Password is required!");
		}

		if (password.length() < 6) {
			throw new IllegalArgumentException("Password must be at least 6 characters long!");
		}

		if (admin.getRole() != null && !admin.getRole().isEmpty()) {
			Role role = Role.fromString(admin.getRole());
			admin.setRole(role.getRole());
		} else {
			admin.setRole(Role.ADMIN.getRole());
		}

		admin.setPassword(passwordEncoder.encode(admin.getPassword()));
		Admin savedAdmin = adminService.registerAdmin(admin);
		return ResponseEntity.ok(savedAdmin);
	}

	@PutMapping("/{email}")
	public ResponseEntity<?> updateAdmin(@PathVariable String email, @RequestBody Admin updatedAdmin) {
		Admin updated = adminService.updateAdmin(email, updatedAdmin);
		if (updated == null) {
			throw new UserNotFoundException("Admin not found with the email: " + email);
		}
		return ResponseEntity.ok(updated);
	}

	@DeleteMapping("/{email}")
	public ResponseEntity<?> deleteAdmin(@PathVariable String email) {
		boolean deleted = adminService.deleteAdmin(email);
		if (!deleted) {
			throw new UserNotFoundException("Admin not found with the email: " + email);
		}
		return ResponseEntity.ok("Admin with email " + email + " has been deleted successfully.");
	}

	@GetMapping("/all")
	public ResponseEntity<List<Admin>> getAllAdmins() {
		List<Admin> admins = adminService.fetchAllAdmins();
		if (admins.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(admins);
	}

	@GetMapping("/userlist")
	public ResponseEntity<?> getUsers() {
		List<User> users = userService.getAllUsers();
		if (users.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(users);
	}

	@PutMapping("/updateRole/{email}")
	public ResponseEntity<?> updateRole(@PathVariable String email, @RequestParam String newRole) {
		User user = userService.fetchUserByEmail(email);
		if (user == null) {
			throw new UserNotFoundException("User not found");
		}

		Role role = Role.fromString(newRole);
		user.setRole(role.getRole());
		userService.saveUser(user);
		return ResponseEntity.ok("Role updated successfully");
	}

	@GetMapping("/contact-us/all")
	public ResponseEntity<List<ContactUs>> getAllContactForms() {
		List<ContactUs> contactForms = contactUsService.getAllContactForms();
		return ResponseEntity.ok(contactForms);
	}

	@DeleteMapping("/contact-us/delete/{id}")
	public ResponseEntity<?> deleteContactForm(@PathVariable Long id) {

		contactUsService.findContactFormById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Contact form not found with ID: " + id));

		contactUsService.deleteContactFormById(id);
		return ResponseEntity.ok("Contact form with ID " + id + " has been deleted successfully.");
	}

}
