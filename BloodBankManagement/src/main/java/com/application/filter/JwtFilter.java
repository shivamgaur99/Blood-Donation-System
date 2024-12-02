package com.application.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.application.service.AdminService;
import com.application.service.UserService;
import com.application.util.JwtUtils;

@Component
public class JwtFilter extends OncePerRequestFilter 
{
	    @Autowired
	    private JwtUtils jwtUtil;
	 
	    @Autowired
	    private UserService userService;
	    
	    @Autowired
	    private AdminService adminService;

	    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {

	        String authorizationHeader = httpServletRequest.getHeader("Authorization");

	        String token = null;
	        String userEmail = null;

	        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
	            token = authorizationHeader.substring(7);
	            userEmail = jwtUtil.extractUsername(token);
	        }

	        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

	        	UserDetails userDetails;
	            if (jwtUtil.isAdminToken(token)) {
	                userDetails = adminService.loadAdminByEmail(userEmail);
	            } else {
	                userDetails = userService.loadUserByEmail(userEmail);
	            }

	            if (jwtUtil.validateToken(token, userDetails)) {

	                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
	                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	                usernamePasswordAuthenticationToken
	                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
	                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
	            }
	        }
	        filterChain.doFilter(httpServletRequest, httpServletResponse);
	    }
	}