package com.application.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.application.model.AuthRequest;
import com.application.model.User;
import com.application.service.RegistrationService;
import com.application.util.JwtUtils;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RegistrationController
{
	@Autowired
	private RegistrationService registerService;
	
	@Autowired
    private JwtUtils jwtUtil;
	
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @GetMapping("/")
    public String welcomeMessage()
    {
    	return "Welcome to Blood Bank Management system !!!";
    }
  
    @PostMapping("/authenticate")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> generateToken(@RequestBody AuthRequest authRequest) throws Exception 
    {
        try 
        {
        	System.out.println(authRequest.getEmail());
        	System.out.println(authRequest.getPassword());
        	List<User> users = registerService.getAllUsers();
        	String currentEmail = "";
    		for(User obj:users)
    		{
    			if(obj.getEmail().equalsIgnoreCase(authRequest.getEmail()))
    			{
    				currentEmail = obj.getUsername();
    			}
    		}
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(currentEmail, authRequest.getPassword()));
        } 
        catch (Exception ex) 
        {
            throw new Exception("Invalid Username/password");
        }
        return new ResponseEntity<String>(jwtUtil.generateToken(authRequest.getEmail()), HttpStatus.OK);
    }
	
//	@PostMapping("/register")
//	@CrossOrigin(origins = "http://localhost:3000")
//	public User registerUser(@RequestBody User user) throws Exception
//	{
//		String currEmail = user.getEmail();
//		if(currEmail != null || !"".equals(currEmail))
//		{
//			User userObj = registerService.fetchUserByEmail(currEmail);
//			if(userObj != null)
//			{
//				throw new Exception("User with "+currEmail+" already exists !!!");
//			}
//		}
//		User userObj = null;
//		userObj = registerService.saveUser(user);
//		return userObj;
//	}
	
//	@PostMapping("/login")
//	@CrossOrigin(origins = "http://localhost:3000")
//	public User loginUser(@RequestBody User user) throws Exception
//	{
//		String currEmail = user.getEmail();
//		String currPassword = user.getPassword();
//		
//		User userObj = null;
//		if(currEmail != null && currPassword != null)
//		{
//			userObj = registerService.fetchUserByEmailAndPassword(currEmail, currPassword);
//		}
//		if(userObj == null)
//		{
//			throw new Exception("User does not exists!!! Please enter valid credentials...");
//		}		
//		return userObj;
//	}
	
	@PostMapping("/login")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<?> loginUser(@RequestBody User user) {
	    try {
	        String email = user.getEmail();
	        String password = user.getPassword();

	        if (email != null && password != null) {
	            User authenticatedUser = registerService.fetchUserByEmailAndPassword(email, password);
	            if (authenticatedUser != null) {
	                return ResponseEntity.ok(authenticatedUser);
	            }
	        }
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
	    } catch (Exception ex) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while processing login");
	    }
	}
	
	@PostMapping("/register")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<?> registerUser(@RequestBody User user) {
	    try {
	        String currEmail = user.getEmail();
	        if (currEmail != null && !currEmail.isEmpty()) {
	            User existingUser = registerService.fetchUserByEmail(currEmail);
	            if (existingUser != null) {
	                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with " + currEmail + " already exists!");
	            }
	        } else {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is required for registration!");
	        }

	        User savedUser = registerService.saveUser(user);
	        return ResponseEntity.ok(savedUser);
	    } catch (Exception ex) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during user registration");
	    }
	}

	@PutMapping("/updateuser")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<User> updateUserProfile(@RequestBody User user) throws Exception
	{
		registerService.updateUserProfile(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	

}
