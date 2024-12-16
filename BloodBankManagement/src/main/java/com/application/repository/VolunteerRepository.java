package com.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.application.model.Event;
import com.application.model.User;
import com.application.model.Volunteer;

public interface VolunteerRepository extends JpaRepository<Volunteer, Long> {

	boolean existsByUserAndEvent(User user, Event event);

	
}