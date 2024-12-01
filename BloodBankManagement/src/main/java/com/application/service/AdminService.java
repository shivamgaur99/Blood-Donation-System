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
public class AdminService {

	@Autowired
	private AdminRepository adminRepository;

	public UserDetails loadAdminByEmail(String email) throws UsernameNotFoundException {
		Admin admin = adminRepository.findByEmail(email);
		if (admin == null) {
			throw new UsernameNotFoundException("Admin not found");
		}
		return new org.springframework.security.core.userdetails.User(admin.getEmail(), admin.getPassword(),
				new ArrayList<>());
	}

	public Admin registerAdmin(Admin admin) {
		return adminRepository.save(admin);
	}

	public Admin fetchAdminByEmail(String email) {
		return adminRepository.findByEmail(email);
	}

	public Admin updateAdmin(String email, Admin updatedAdmin) {
		Admin existingAdmin = adminRepository.findByEmail(email);
		if (existingAdmin != null) {
			existingAdmin.setUsername(updatedAdmin.getUsername());
			existingAdmin.setMobile(updatedAdmin.getMobile());
			existingAdmin.setGender(updatedAdmin.getGender());
			existingAdmin.setAge(updatedAdmin.getAge());
			existingAdmin.setRole(updatedAdmin.getRole());
			existingAdmin.setPassword(updatedAdmin.getPassword());
			return adminRepository.save(existingAdmin);
		} else {
			return null;
		}
	}

	public boolean deleteAdmin(String email) {
		Admin admin = adminRepository.findByEmail(email);
		if (admin != null) {
			adminRepository.delete(admin);
			return true;
		}
		return false;
	}

}
