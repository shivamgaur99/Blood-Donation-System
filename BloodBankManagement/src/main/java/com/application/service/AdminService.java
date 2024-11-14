package com.application.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.application.model.Admin;
import com.application.repository.AdminRepository;

@Service
public class AdminService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;
    
    // Method for loading admin by email (for authentication)
    public UserDetails loadAdminByEmail(String email) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByEmail(email);
        if (admin == null) {
            throw new UsernameNotFoundException("Admin not found");
        }
        return new org.springframework.security.core.userdetails.User(admin.getEmail(), admin.getPassword(), new ArrayList<>());
    }
    
    // Method for registering a new admin (without password encoding)
    public Admin registerAdmin(Admin admin) {
        return adminRepository.save(admin);  // Directly saving password as plain text
    }
    
    // Method for fetching admin by email (used for login)
    public Admin fetchAdminByEmail(String email) {
        return adminRepository.findByEmail(email);
    }
    
    // Method for updating an existing admin
    public Admin updateAdmin(String email, Admin updatedAdmin) {
        Admin existingAdmin = adminRepository.findByEmail(email);
        if (existingAdmin != null) {
            // Update the existing admin with the new data
            existingAdmin.setUsername(updatedAdmin.getUsername());
            existingAdmin.setMobile(updatedAdmin.getMobile());
            existingAdmin.setGender(updatedAdmin.getGender());
            existingAdmin.setAge(updatedAdmin.getAge());
            existingAdmin.setRole(updatedAdmin.getRole());
            existingAdmin.setPassword(updatedAdmin.getPassword());  // Update password if provided
            return adminRepository.save(existingAdmin);  // Save the updated admin
        } else {
            return null;  // Admin not found
        }
    }

    // Method for deleting an admin by email
    public boolean deleteAdmin(String email) {
        Admin admin = adminRepository.findByEmail(email);
        if (admin != null) {
            adminRepository.delete(admin);  // Delete the admin from the repository
            return true;  // Deletion successful
        }
        return false;  // Admin not found
    }

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Admin user = adminRepository.findByUsername(username);
	    return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
	}

}
