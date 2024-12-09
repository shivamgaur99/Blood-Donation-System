package com.application.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.application.model.Admin;
import com.application.model.User;
import com.application.repository.AdminRepository;
import com.application.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AdminRepository adminRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		
		Admin admin = adminRepository.findByEmail(username);
	    if (admin != null) {
	        return org.springframework.security.core.userdetails.User.builder()
	                .username(admin.getEmail())
	                .password(admin.getPassword())
	                .roles(admin.getRole())
	                .build();
	    }
	    
	    User user = userRepository.findByEmail(username);
		if (user != null) {
            return org.springframework.security.core.userdetails.User.builder()
                    .username(user.getEmail())
                    .password(user.getPassword())
                    .roles(user.getRole())
                    .build();
        }

		throw new UsernameNotFoundException("User not found with email: " + username);
	}
}
