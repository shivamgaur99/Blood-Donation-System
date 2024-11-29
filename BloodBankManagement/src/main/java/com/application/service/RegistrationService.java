package com.application.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.application.model.User;
import com.application.repository.UserRepository;

@Service
public class RegistrationService implements UserDetailsService {
	@Autowired
	private UserRepository userRepository;

	public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(email);
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
				new ArrayList<>());
	}

	public User saveUser(User user) {
		return userRepository.save(user);
	}

	public User updateUserProfile(String email, User user) {
		// Fetch the existing user by email
		User existingUser = userRepository.findByEmail(email);

		// Update the user's details
		if (existingUser != null) {
			existingUser.setUsername(user.getUsername());
			existingUser.setMobile(user.getMobile());
			existingUser.setBloodgroup(user.getBloodgroup());
			existingUser.setGender(user.getGender());
			existingUser.setAge(user.getAge());
			existingUser.setPassword(user.getPassword()); // Update password if provided (ensure hashing)

			// Only update role if it's provided in the request
			if (user.getRole() != null && !user.getRole().isEmpty()) {
				existingUser.setRole(user.getRole());
			}

			// Save the updated user to the database
			return userRepository.save(existingUser);

		} else {
			return null;
		}

	}

	public void deleteUserByEmail(String email) {
		User user = userRepository.findByEmail(email);
		if (user != null) {
			userRepository.delete(user);
		}
	}

	public User fetchUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	public User fetchUserByEmailAndPassword(String email, String password) {
		return userRepository.findByEmailAndPassword(email, password);
	}

	public List<User> getAllUsers() {
		return (List<User>) userRepository.findAll();
	}

	public List<User> fetchProfileByEmail(String email) {
		return (List<User>) userRepository.findProfileByEmail(email);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username);
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				new ArrayList<>());
	}
}