package com.application.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.model.Requesting;
import com.application.model.User;
import com.application.repository.RequestingBloodRepository;

@Service
public class RequestingService {

	@Autowired
	private RequestingBloodRepository requestingRepository;

	public void updateStatus(String email) {
		requestingRepository.updateStatus(email);
		System.out.println("Updated");
	}

	public void rejectStatus(String email) {
		requestingRepository.rejectStatus(email);
	}

	public boolean updateRequestStatus(int id, String status) {
		Optional<Requesting> request = requestingRepository.findById(id);
		if (request.isPresent()) {
			Requesting req = request.get();
			req.setStatus(status);
			requestingRepository.save(req);
			return true;
		}
		return false;
	}
	
	public List<Requesting> getRequestHistory() {
		return (List<Requesting>) requestingRepository.findAll();
	}

	public List<Requesting> getRequestHistoryByUser(User user) {
		return requestingRepository.findByUser(user);
	}

	public List<Requesting> getRequestsByBloodGroup(String bloodGroup) {
		return requestingRepository.findByBloodGroup(bloodGroup);
	}

	public List<Requesting> getRequestsByStatus(String status) {
		return requestingRepository.findByStatus(status);
	}

	public void saveBloodRequest(Requesting requesting) {
		requestingRepository.save(requesting); // Assuming a JPA repository is available
	}

	public List<Requesting> getRequestHistoryByEmail(String email) {
		System.out.println("Fetching history for email: " + email);
		return requestingRepository.findByEmail(email);
	}

	public boolean deleteRequestingById(int id) {
		if (requestingRepository.existsById(id)) {
			requestingRepository.deleteById(id);
			return true;
		} else {
			return false;
		}
	}
}
