package com.application.controller;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.application.constants.RequestStatus;
import com.application.model.BloodDetails;
import com.application.model.Donor;
import com.application.model.Requesting;
import com.application.model.User;
import com.application.service.DonorService;
import com.application.service.RegistrationService;
import com.application.util.JwtUtils;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DonorController {

	@Autowired
	private DonorService donorService;

	@Autowired
	private RegistrationService userService;

	@Autowired
	private JwtUtils jwtUtils;

	@PostMapping("/add")
	public ResponseEntity<String> addDonor(@RequestBody Donor donor, HttpServletRequest request) {
		try {

			String token = extractTokenFromRequest(request);

			if (token == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization token is required.");
			}

			String email = jwtUtils.extractUsername(token);

			User user = userService.fetchUserByEmail(email);
			if (user == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
			}

			donor.setUser(user);

			donorService.saveDonor(donor);

			return ResponseEntity.status(HttpStatus.CREATED).body("Donor details added successfully.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
		}
	}

	@GetMapping("/donorlist")
	public ResponseEntity<List<Donor>> getAllDonors() {
		List<Donor> donors = donorService.getAllDonors();
		return ResponseEntity.ok(donors);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Object> getDonorById(@PathVariable int id) {
		Donor donor = donorService.getDonorById(id);
		if (donor != null) {
			return ResponseEntity.ok(donor);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Donor not found.");
		}
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteDonor(@PathVariable int id) {
		try {
			donorService.deleteDonor(id);
			return ResponseEntity.ok("Donor deleted successfully.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
		}
	}

	private String extractTokenFromRequest(HttpServletRequest request) {
		String authorizationHeader = request.getHeader("Authorization");
		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			return authorizationHeader.substring(7); // Remove "Bearer " prefix
		}
		return null;
	}

	@GetMapping("/blood-group/{bloodGroup}")
	public ResponseEntity<List<Donor>> getDonorsByBloodGroup(@PathVariable String bloodGroup) {
		List<Donor> donors = donorService.getDonorsByBloodGroup(bloodGroup);
		if (!donors.isEmpty()) {
			return ResponseEntity.ok(donors);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@PostMapping("/blood-requests")
	public ResponseEntity<String> addBloodRequest(@RequestBody Requesting requesting, HttpServletRequest request) {
		try {

			String token = extractTokenFromRequest(request);
			if (token == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization token is required.");
			}

			String email = jwtUtils.extractUsername(token);

			User user = userService.fetchUserByEmail(email);
			if (user == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
			}

			requesting.setUser(user);

			requesting.setStatus(RequestStatus.PENDING.getStatus());

			donorService.saveBloodRequest(requesting);

			return ResponseEntity.status(HttpStatus.CREATED).body("Blood request created successfully.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while processing the blood request: " + e.getMessage());
		}
	}

	@GetMapping("/requestHistory")
	public ResponseEntity<List<Requesting>> getRequestHistory() throws Exception {
		List<Requesting> history = donorService.getRequestHistory();
		return new ResponseEntity<List<Requesting>>(history, HttpStatus.OK);
	}

	@GetMapping("/requestHistory/{email}")
	public ResponseEntity<List<Requesting>> getRequestHistoryByEmail(@PathVariable String email) {
		List<Requesting> history = donorService.getRequestHistoryByEmail(email);
		if (!history.isEmpty()) {
			return ResponseEntity.ok(history);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@GetMapping("/userRequestHistory")
	public ResponseEntity<List<Requesting>> getRequestHistoryByUser(HttpServletRequest request) {
		try {

			String token = extractTokenFromRequest(request);
			if (token == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
			}

			String email = jwtUtils.extractUsername(token);
			if (email == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
			}

			User user = userService.fetchUserByEmail(email);
			if (user == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			}

			List<Requesting> requestHistory = donorService.getRequestHistoryByUser(user);
			if (requestHistory.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			}

			return ResponseEntity.ok(requestHistory);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PutMapping("/blood-requests/{id}/approve")
	public ResponseEntity<String> approveRequest(@PathVariable int id) {
		boolean result = donorService.updateRequestStatus(id, RequestStatus.APPROVED.getStatus());
		if (result) {
			return ResponseEntity.ok("Request approved successfully.");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request not found.");
		}
	}

	@PutMapping("/blood-requests/{id}/reject")
	public ResponseEntity<String> rejectRequest(@PathVariable int id) {
		boolean result = donorService.updateRequestStatus(id, RequestStatus.REJECTED.getStatus());
		if (result) {
			return ResponseEntity.ok("Request rejected successfully.");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request not found.");
		}
	}

	@GetMapping("/userDonors")
	public ResponseEntity<List<Donor>> getDonorsByUser(HttpServletRequest request) {
		try {

			String token = extractTokenFromRequest(request);
			if (token == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
			}

			String email = jwtUtils.extractUsername(token);
			if (email == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
			}

			User user = userService.fetchUserByEmail(email);
			if (user == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			}

			List<Donor> donors = donorService.getDonorsByUser(user);
			return ResponseEntity.ok(donors);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/requestsByBloodGroup/{bloodGroup}")
	public ResponseEntity<List<Requesting>> getRequestsByBloodGroup(@PathVariable String bloodGroup) {
		try {
			List<Requesting> requests = donorService.getRequestsByBloodGroup(bloodGroup);
			if (requests.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			}
			return ResponseEntity.ok(requests);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PutMapping("/updateDonor/{id}")
	public ResponseEntity<String> updateDonor(@PathVariable int id, @RequestBody Donor updatedDonor) {
		try {
			Donor existingDonor = donorService.getDonorById(id);
			if (existingDonor == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Donor not found.");
			}

			existingDonor.setName(updatedDonor.getName());
			existingDonor.setBloodGroup(updatedDonor.getBloodGroup());
			existingDonor.setUnits(updatedDonor.getUnits());

			donorService.saveDonor(existingDonor);
			return ResponseEntity.ok("Donor updated successfully.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
		}
	}

	@GetMapping("/requestsByStatus/{status}")
	public ResponseEntity<List<Requesting>> getRequestsByStatus(@PathVariable String status) {
		try {
			List<Requesting> requests = donorService.getRequestsByStatus(status);
			if (requests.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			}
			return ResponseEntity.ok(requests);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/donorUnitsByBloodGroup")
	public ResponseEntity<List<BloodDetails>> getDonorUnitsByBloodGroup() {
		try {
			List<BloodDetails> bloodDetails = donorService.getDonorUnitsByBloodGroup();
			return ResponseEntity.ok(bloodDetails);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/bloodDetails")
	public ResponseEntity<List<BloodDetails>> getBloodDetails() throws Exception {
		List<Donor> bloodDetails = donorService.getBloodDetails();

		List<Donor> donors = donorService.getAllDonors();
		donorService.checkforOldBloodSamples(donors);

		List<String> groups = new ArrayList<>();
		List<Integer> units = new ArrayList<>();
		Map<String, Integer> details = new LinkedHashMap<>();
		for (Donor donor : bloodDetails) {
			if (details.containsKey(donor.getBloodGroup()))
				details.put(donor.getBloodGroup(), details.get(donor.getBloodGroup()) + 1);
			else
				details.put(donor.getBloodGroup(), 1);
			if (groups.contains(donor.getBloodGroup())) {
				int index = groups.indexOf(donor.getBloodGroup());
				units.set(index, units.get(index) + donor.getUnits());
			} else {
				groups.add(donor.getBloodGroup());
				units.add(donor.getUnits());
			}
		}
		List<BloodDetails> result = new ArrayList<>();
		for (Map.Entry<String, Integer> m : details.entrySet()) {
			result.add(new BloodDetails(m.getKey(), m.getValue(), units.get(0)));
			units.remove(0);
		}
		return new ResponseEntity<List<BloodDetails>>(result, HttpStatus.OK);
	}

	@GetMapping("/getTotalDonors")
	public ResponseEntity<List<Integer>> getTotalDonors() throws Exception {
		List<Donor> donors = donorService.getAllDonors();

		donorService.checkforOldBloodSamples(donors);

		List<Integer> al = new ArrayList<>();
		al.add(donors.size());
		return new ResponseEntity<List<Integer>>(al, HttpStatus.OK);
	}

	@GetMapping("/getTotalBloodGroups")
	public ResponseEntity<List<Integer>> getTotalBloodGroups() throws Exception {
		List<Donor> bloodDetails = donorService.getBloodDetails();
		Set<String> set = new LinkedHashSet<>();
		for (Donor details : bloodDetails) {
			set.add(details.getBloodGroup());
		}
		List<Integer> al = new ArrayList<>();
		al.add(set.size());
		return new ResponseEntity<List<Integer>>(al, HttpStatus.OK);
	}

	@GetMapping("/getTotalUnits")
	public ResponseEntity<List<Integer>> getTotalUnits() throws Exception {
		List<Donor> bloodDetails = donorService.getBloodDetails();
		int units = 0;
		for (Donor details : bloodDetails) {
			units += details.getUnits();
		}
		List<Integer> al = new ArrayList<>();
		al.add(units);
		return new ResponseEntity<List<Integer>>(al, HttpStatus.OK);
	}

	@GetMapping("/getTotalRequests/{email}")
	public ResponseEntity<List<Integer>> getTotalRequests(@PathVariable String email) throws Exception {
		List<Requesting> history = donorService.getRequestHistoryByEmail(email);
		List<Integer> al = new ArrayList<>();
		al.add(history.size());
		return new ResponseEntity<List<Integer>>(al, HttpStatus.OK);
	}

	@GetMapping("/getTotalDonationCount/{email}")
	public ResponseEntity<List<Integer>> getTotalDonationCount(@PathVariable String email) throws Exception {
		List<Donor> donors = donorService.getAllDonors();
		List<Integer> al = new ArrayList<>();
		int count = 0;
		for (Donor val : donors) {
			if (val.getName().equalsIgnoreCase("gowtham"))
				count++;
		}
		al.add(count);
		return new ResponseEntity<List<Integer>>(al, HttpStatus.OK);
	}

}