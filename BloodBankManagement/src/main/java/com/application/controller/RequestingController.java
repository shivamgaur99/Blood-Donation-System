package com.application.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.application.constants.RequestStatus;
import com.application.custom_excs.InvalidTokenException;
import com.application.custom_excs.ResourceNotFoundException;
import com.application.custom_excs.UserNotFoundException;
import com.application.model.Requesting;
import com.application.model.User;
import com.application.service.RequestingService;
import com.application.service.UserService;
import com.application.util.JwtUtils;

@RestController
public class RequestingController {

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private UserService userService;

	@Autowired
	private RequestingService requestingService;

	private static final Logger logger = LoggerFactory.getLogger(RequestingController.class);

	@PostMapping("/blood-requests")
	public ResponseEntity<String> addBloodRequest(@Valid @RequestBody Requesting requesting,
			HttpServletRequest request) {
		String token = extractTokenFromRequest(request);
		String email = jwtUtils.extractUsername(token);

		User user = userService.fetchUserByEmail(email);
		if (user == null) {
			throw new UserNotFoundException("User not found.");
		}

		requesting.setUser(user);
		requesting.setStatus(RequestStatus.PENDING.getStatus());
		requestingService.saveBloodRequest(requesting);

		logger.info("Blood request created successfully for user: {}", email);
		return ResponseEntity.status(HttpStatus.CREATED).body("Blood request created successfully.");
	}

	@GetMapping("/blood-requests")
	public ResponseEntity<List<Requesting>> getRequestHistory() {
		List<Requesting> history = requestingService.getRequestHistory();

		if (history.isEmpty()) {
			return ResponseEntity.noContent().build();
		}

		return ResponseEntity.ok(history);
	}

	@GetMapping("/blood-requests/{email}")
	public ResponseEntity<List<Requesting>> getRequestHistoryByEmail(@PathVariable String email) {
		List<Requesting> history = requestingService.getRequestHistoryByEmail(email);

		if (history.isEmpty()) {
			return ResponseEntity.noContent().build();
		}

		return ResponseEntity.ok(history);
	}

	@GetMapping("/user-blood-requests")
	public ResponseEntity<List<Requesting>> getRequestHistoryByUser(HttpServletRequest request) {
		String token = extractTokenFromRequest(request);
		String email = jwtUtils.extractUsername(token);
		User user = userService.fetchUserByEmail(email);

		if (user == null) {
			throw new UserNotFoundException("User not found with email: " + email);
		}

		List<Requesting> requestHistory = requestingService.getRequestHistoryByUser(user);

		if (requestHistory.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(requestHistory);
		}

		return ResponseEntity.ok(requestHistory);
	}

	@PutMapping("/blood-requests/{id}/approve")
	public ResponseEntity<String> approveRequest(@PathVariable int id) {
		boolean result = requestingService.updateRequestStatus(id, RequestStatus.APPROVED.getStatus());

		if (!result) {
			throw new ResourceNotFoundException("Request with ID " + id + " not found.");
		}

		return ResponseEntity.ok("Request approved successfully.");
	}

	@PutMapping("/blood-requests/{id}/reject")
	public ResponseEntity<String> rejectRequest(@PathVariable int id) {
		boolean result = requestingService.updateRequestStatus(id, RequestStatus.REJECTED.getStatus());

		if (!result) {
			throw new ResourceNotFoundException("Request with ID " + id + " not found.");
		}

		return ResponseEntity.ok("Request rejected successfully.");
	}

	@DeleteMapping("/blood-requests/{id}")
	public ResponseEntity<String> deleteRequesting(@PathVariable int id) {
		boolean isDeleted = requestingService.deleteRequestingById(id);
		if (isDeleted) {
			return ResponseEntity.ok("Requesting record with ID " + id + " deleted successfully.");
		} else {
			return ResponseEntity.status(404).body("Requesting record with ID " + id + " not found.");
		}
	}

	@GetMapping("/requestsByBloodGroup/{bloodGroup}")
	public ResponseEntity<List<Requesting>> getRequestsByBloodGroup(@PathVariable String bloodGroup) {
		List<Requesting> requests = requestingService.getRequestsByBloodGroup(bloodGroup);

		if (requests.isEmpty()) {
			return ResponseEntity.noContent().build();
		}

		return ResponseEntity.ok(requests);
	}

	@GetMapping("/requestsByStatus/{status}")
	public ResponseEntity<List<Requesting>> getRequestsByStatus(@PathVariable String status) {
		List<Requesting> requests = requestingService.getRequestsByStatus(status);
		if (requests.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(requests);
	}

	@GetMapping("/getTotalRequests/{email}")
	public ResponseEntity<List<Integer>> getTotalRequests(@PathVariable String email) {
		try {
			List<Requesting> requestHistory = requestingService.getRequestHistoryByEmail(email);
			List<Integer> result = new ArrayList<>();
			result.add(requestHistory.size());
			return ResponseEntity.ok(result);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	private String extractTokenFromRequest(HttpServletRequest request) {
		String authorizationHeader = request.getHeader("Authorization");

		if (authorizationHeader == null || authorizationHeader.trim().isEmpty()) {
			logger.warn("Authorization header is missing or empty");
			throw new InvalidTokenException("Authorization token is required but missing.");
		}

		if (!authorizationHeader.startsWith("Bearer ")) {
			logger.warn("Authorization header does not start with 'Bearer ': {}", authorizationHeader);
			throw new InvalidTokenException("Authorization token is invalid.");
		}

		String token = authorizationHeader.substring(7).trim();
		if (token.isEmpty()) {
			logger.warn("Token extracted from Authorization header is empty");
			throw new InvalidTokenException("Authorization token is invalid or empty.");
		}

		return token;
	}
}
