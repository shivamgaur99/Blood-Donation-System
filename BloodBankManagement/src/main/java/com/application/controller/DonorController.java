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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
	 
	 
	  /**
	     * Add a new donor.
	     * Requires JWT token to identify the user.
	     */
	    @PostMapping("/add")
	    public ResponseEntity<String> addDonor(@RequestBody Donor donor, HttpServletRequest request) {
	        try {
	            // Extract the JWT token from the Authorization header
	            String token = extractTokenFromRequest(request);

	            if (token == null) {
	                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization token is required.");
	            }

	            // Extract username (email) from the token
	            String email = jwtUtils.extractUsername(token);

	            // Fetch user details from the database
	            User user = userService.fetchUserByEmail(email);
	            if (user == null) {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
	            }

	            // Set the user for the donor
	            donor.setUser(user);

	            // Save the donor
	            donorService.saveDonor(donor);

	            return ResponseEntity.status(HttpStatus.CREATED).body("Donor details added successfully.");
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
	        }
	    }

	    /**
	     * Retrieve all donors.
	     */
	    @GetMapping("/all")
	    public ResponseEntity<List<Donor>> getAllDonors() {
	        List<Donor> donors = donorService.getAllDonors();
	        return ResponseEntity.ok(donors);
	    }

	    /**
	     * Retrieve donor by ID.
	     */
	    @GetMapping("/{id}")
	    public ResponseEntity<Object> getDonorById(@PathVariable int id) {
	        Donor donor = donorService.getDonorById(id);
	        if (donor != null) {
	            return ResponseEntity.ok(donor);
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Donor not found.");
	        }
	    }

	    /**
	     * Delete a donor by ID.
	     */
	    @DeleteMapping("/delete/{id}")
	    public ResponseEntity<String> deleteDonor(@PathVariable int id) {
	        try {
	            donorService.deleteDonor(id);
	            return ResponseEntity.ok("Donor deleted successfully.");
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
	        }
	    }

	    /**
	     * Extract the JWT token from the Authorization header.
	     */
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

	
	
	@PostMapping("/addDonor")
	public Donor addNewDonor(@RequestBody Donor donor) throws Exception {
		return donorService.saveDonor(donor);
	}

	@PostMapping("/addAsDonor")
	public Donor addUserAsDonor(@RequestBody Donor donor) throws Exception {
		return donorService.saveUserAsDonor(donor);
	}

	@PostMapping("/updateStatus/{email}")
	public ResponseEntity<List<String>> updateStatus(@PathVariable String email, @RequestBody String status)
			throws Exception {
		donorService.updateStatus(email);
		List<String> response = new ArrayList<>();
		response.add(status);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/acceptstatus/{email}")
	public ResponseEntity<List<String>> updateStatus(@PathVariable String email) throws Exception {
		donorService.updateStatus(email);
		List<String> al = new ArrayList<>();
		al.add("accepted");
		return new ResponseEntity<List<String>>(al, HttpStatus.OK);
	}

	@GetMapping("/rejectstatus/{email}")
	public ResponseEntity<List<String>> rejectStatus(@PathVariable String email) throws Exception {
		donorService.rejectStatus(email);
		List<String> al = new ArrayList<>();
		al.add("rejected");
		return new ResponseEntity<List<String>>(al, HttpStatus.OK);
	}

	@GetMapping("/donorlist")
	public ResponseEntity<List<Donor>> getDonors() throws Exception {
		List<Donor> donors = donorService.getAllDonors();
		return new ResponseEntity<List<Donor>>(donors, HttpStatus.OK);
	}

	@GetMapping("/requestHistory")
	public ResponseEntity<List<Requesting>> getRequestHistory() throws Exception {
		List<Requesting> history = donorService.getRequestHistory();
		return new ResponseEntity<List<Requesting>>(history, HttpStatus.OK);
	}

	@GetMapping("/requestHistory/{email}")
	public ResponseEntity<List<Requesting>> getRequestHistoryByEmail(@PathVariable String email) throws Exception {
		System.out.print("requesting");
		List<Requesting> history = donorService.getRequestHistoryByEmail(email);
		return new ResponseEntity<List<Requesting>>(history, HttpStatus.OK);
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

	@PostMapping("/requestblood")
	public Requesting addNewBloodRequest(@RequestBody Requesting request) throws Exception {
		return donorService.saveBloodRequest(request);
	}
}