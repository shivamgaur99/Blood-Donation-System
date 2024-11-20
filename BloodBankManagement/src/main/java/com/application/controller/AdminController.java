package com.application.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.application.model.Admin;
import com.application.model.AuthRequest;
import com.application.model.JwtResponse;
import com.application.model.User;
import com.application.service.AdminService;
import com.application.service.RegistrationService;
import com.application.util.JwtUtils;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;
    
    @Autowired
	private RegistrationService registerService;
    
    @Autowired
    private JwtUtils jwtUtils;
    
    
 // Admin Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody AuthRequest authRequest) {
        try {
            // Fetch the admin by email
            Admin admin = adminService.fetchAdminByEmail(authRequest.getEmail());
            if (admin == null || !admin.getPassword().equals(authRequest.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
            
            // Generate JWT Token for the admin
            String token = jwtUtils.generateToken(admin.getEmail(), admin.getRole());
            return ResponseEntity.ok(new JwtResponse(token, authRequest.getEmail())); // Assuming JwtResponse is a DTO class
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during admin login");
        }
    }
    
    // Admin Registration Endpoint
    @PostMapping("/register")
    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
        try {
            // Check if admin with the same email already exists
            Admin existingAdmin = adminService.fetchAdminByEmail(admin.getEmail());
            if (existingAdmin != null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Admin with this email already exists!");
            }
            
            String password = admin.getPassword();
			if (password == null || password.isEmpty()) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password is required!");
			}

			// Check if password meets minimum length requirement
			if (password.length() < 6) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body("Password must be at least 6 characters long!");
			}


			if (admin.getRole() == null || admin.getRole().isEmpty()) {
				admin.setRole("admin");
			}
            
            Admin savedAdmin = adminService.registerAdmin(admin);
            return ResponseEntity.ok(savedAdmin);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during admin registration");
        }
    }
    
 // Admin Update Endpoint
    @PutMapping("/update/{email}")
    public ResponseEntity<?> updateAdmin(@PathVariable String email, @RequestBody Admin updatedAdmin) {
        try {
            Admin updated = adminService.updateAdmin(email, updatedAdmin);
            if (updated != null) {
                return ResponseEntity.ok(updated);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found with the email: " + email);
            }
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during admin update");
        }
    }

    // Admin Delete Endpoint
	    @DeleteMapping("/delete/{email}")
	    public ResponseEntity<?> deleteAdmin(@PathVariable String email) {
	        try {
	            boolean deleted = adminService.deleteAdmin(email);
	            if (deleted) {
	                return ResponseEntity.ok("Admin with email " + email + " has been deleted successfully.");
	            } else {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found with the email: " + email);
	            }
	        } catch (Exception ex) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during admin deletion");
	        }
	    }

	    @PutMapping("/updateRole/{email}")
		public ResponseEntity<?> updateRole(@PathVariable String email, @RequestParam String newRole) {
			try {
				User user = registerService.fetchUserByEmail(email); // Fetch user by email
				if (user == null) {
					return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
				}

				if (!List.of("user", "volunteer", "admin", "superAdmin").contains(newRole)) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid role");
				}

				// Update the role
				user.setRole(newRole);

				// Save the updated user
				registerService.saveUser(user);
				return ResponseEntity.ok("User role updated successfully");
			} catch (Exception ex) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user role");
			}
		}
}
