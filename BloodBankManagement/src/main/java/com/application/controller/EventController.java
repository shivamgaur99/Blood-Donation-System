package com.application.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.application.model.Event;
import com.application.service.EventService;

@RestController
@RequestMapping("/events")
public class EventController {

	@Autowired
	private EventService eventService;

	@PostMapping
	public ResponseEntity<Event> createEvent(@Valid @RequestBody Event event) {
		Event savedEvent = eventService.saveEvent(event);
		return new ResponseEntity<>(savedEvent, HttpStatus.CREATED);
	}

	@GetMapping("/all")
	public ResponseEntity<?> getAllEvents() {
		List<Event> events = eventService.getAllEvents();
		return new ResponseEntity<>(events, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Event> getEventById(@PathVariable Long id) {
		Event event = eventService.getEventById(id);
		return new ResponseEntity<>(event, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
		Event event = eventService.updateEvent(id, updatedEvent);
		return new ResponseEntity<>(event, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteEvent(@PathVariable Long id) {
		eventService.deleteEvent(id);
		return new ResponseEntity<>("Event deleted successfully", HttpStatus.NO_CONTENT);
	}
}
