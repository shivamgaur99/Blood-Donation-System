package com.application.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.application.custom_excs.EventNotFoundException;
import com.application.dto.EventDTO;
import com.application.model.Event;
import com.application.repository.EventRepository;

@Service
@Transactional
public class EventService {

	@Autowired
	private EventRepository eventRepository;

	public Event saveEvent(Event event) {
		return eventRepository.save(event);
	}

	public List<Event> getAllEventsWithDetails() {
		return eventRepository.findAll();
	}
	
	
	public List<EventDTO> getAllEvents() {
	    return eventRepository.findAll().stream()
	        .map(event -> new EventDTO(
	            event.getId(),
	            event.getName(),
	            event.getLocation(),
	            event.getDateTime(),
	            event.getOrganizer(),
	            event.getDescription()
	        ))
	        .toList();  
	}

	
	public Event getEventById(Long id) {
		Optional<Event> event = eventRepository.findById(id);
		if (event.isPresent()) {
			return event.get();
		}
		throw new EventNotFoundException("Event not found with id: " + id);
	}

	public Event updateEvent(Long id, Event updatedEvent) {
		Optional<Event> existingEventOptional = eventRepository.findById(id);
		if (existingEventOptional.isPresent()) {
			Event existingEvent = existingEventOptional.get();

			existingEvent.setName(updatedEvent.getName());
			existingEvent.setLocation(updatedEvent.getLocation());
			existingEvent.setDateTime(updatedEvent.getDateTime());
			existingEvent.setOrganizer(updatedEvent.getOrganizer());
			existingEvent.setDescription(updatedEvent.getDescription());

			return eventRepository.save(existingEvent);
		} else {
			throw new RuntimeException("Event not found with id: " + id);
		}
	}

	public void deleteEvent(Long id) {
		eventRepository.deleteById(id);
	}
}
