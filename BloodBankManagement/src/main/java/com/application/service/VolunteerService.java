package com.application.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.custom_excs.UserNotFoundException;
import com.application.dto.EventDTO;
import com.application.dto.VolunteerDTO;
import com.application.model.Event;
import com.application.model.User;
import com.application.model.Volunteer;
import com.application.repository.VolunteerRepository;

@Service
public class VolunteerService {

	@Autowired
	private VolunteerRepository volunteerRepository;

	public Volunteer saveVolunteer(Volunteer volunteer) {
		return volunteerRepository.save(volunteer);
	}

	public List<Volunteer> getAllVolunteers() {
		return volunteerRepository.findAll();
	}

	public Volunteer getVolunteerById(Long id) {
		return volunteerRepository.findById(id)
				.orElseThrow(() -> new UserNotFoundException("Volunteer not found with ID: " + id));
	}

	public Volunteer updateVolunteer(Long id, Volunteer volunteerDetails) {
		// Fetch existing volunteer from the database
		Volunteer existingVolunteer = getVolunteerById(id); // Assuming this method fetches the Volunteer by ID

		// Update the existing volunteer's fields with the details from the incoming
		// volunteerDetails
		existingVolunteer.setFirstName(volunteerDetails.getFirstName());
		existingVolunteer.setLastName(volunteerDetails.getLastName());
		existingVolunteer.setEmail(volunteerDetails.getEmail());
		existingVolunteer.setPhone(volunteerDetails.getPhone());
		existingVolunteer.setAddress(volunteerDetails.getAddress());
		existingVolunteer.setDob(volunteerDetails.getDob());
		existingVolunteer.setGender(volunteerDetails.getGender());
		existingVolunteer.setCity(volunteerDetails.getCity());
		existingVolunteer.setState(volunteerDetails.getState());
		existingVolunteer.setZipCode(volunteerDetails.getZipCode());
		existingVolunteer.setMessage(volunteerDetails.getMessage());
		existingVolunteer.setRole(volunteerDetails.getRole());
		existingVolunteer.setEvent(volunteerDetails.getEvent()); // If event should be updated

		// Save the updated volunteer object back to the repository
		return volunteerRepository.save(existingVolunteer);
	}

	public VolunteerDTO getVolunteerWithEvent(Long volunteerId) {
		Volunteer volunteer = volunteerRepository.findById(volunteerId)
				.orElseThrow(() -> new RuntimeException("Volunteer not found"));

		// Convert Volunteer to VolunteerDTO
		VolunteerDTO volunteerDTO = new VolunteerDTO();
		volunteerDTO.setId(volunteer.getId());
		volunteerDTO.setFirstName(volunteer.getFirstName());
		volunteerDTO.setLastName(volunteer.getLastName());
		volunteerDTO.setDob(volunteer.getDob());
		volunteerDTO.setGender(volunteer.getGender());
		volunteerDTO.setEmail(volunteer.getEmail());
		volunteerDTO.setPhone(volunteer.getPhone());
		volunteerDTO.setAddress(volunteer.getAddress());
		volunteerDTO.setCity(volunteer.getCity());
		volunteerDTO.setState(volunteer.getState());
		volunteerDTO.setZipCode(volunteer.getZipCode());
		volunteerDTO.setMessage(volunteer.getMessage());
		volunteerDTO.setRole(volunteer.getRole());

		// Convert associated Event to EventDTO
		Event event = volunteer.getEvent();
		EventDTO eventDTO = new EventDTO();
		eventDTO.setId(event.getId());
		eventDTO.setName(event.getName());
		eventDTO.setLocation(event.getLocation());
		eventDTO.setDateTime(event.getDateTime());
		eventDTO.setOrganizer(event.getOrganizer());
		eventDTO.setDescription(event.getDescription());

		volunteerDTO.setEvent(eventDTO);

		return volunteerDTO;
	}

	public List<VolunteerDTO> getAllVolunteersWithEvent() {
		return volunteerRepository.findAll() // Get all volunteers
				.stream().map(volunteer -> {
					VolunteerDTO volunteerDTO = new VolunteerDTO();
					volunteerDTO.setId(volunteer.getId());
					volunteerDTO.setFirstName(volunteer.getFirstName());
					volunteerDTO.setLastName(volunteer.getLastName());
					volunteerDTO.setDob(volunteer.getDob());
					volunteerDTO.setGender(volunteer.getGender());
					volunteerDTO.setEmail(volunteer.getEmail());
					volunteerDTO.setPhone(volunteer.getPhone());
					volunteerDTO.setAddress(volunteer.getAddress());
					volunteerDTO.setCity(volunteer.getCity());
					volunteerDTO.setState(volunteer.getState());
					volunteerDTO.setZipCode(volunteer.getZipCode());
					volunteerDTO.setMessage(volunteer.getMessage());
					volunteerDTO.setRole(volunteer.getRole());

					// Fetch the associated event for the volunteer
					Event event = volunteer.getEvent();
					if (event != null) {
						EventDTO eventDTO = new EventDTO();
						eventDTO.setId(event.getId());
						eventDTO.setName(event.getName());
						eventDTO.setLocation(event.getLocation());
						eventDTO.setDateTime(event.getDateTime());
						eventDTO.setOrganizer(event.getOrganizer());
						eventDTO.setDescription(event.getDescription());

						volunteerDTO.setEvent(eventDTO);
					}

					return volunteerDTO;
				}).toList();
	}
	
	public boolean existsByUserAndEvent(User user, Event event) {
	    return volunteerRepository.existsByUserAndEvent(user, event);
	}


	public void deleteVolunteer(Long id) {
		Volunteer existingVolunteer = getVolunteerById(id);
		volunteerRepository.delete(existingVolunteer);
	}

}
