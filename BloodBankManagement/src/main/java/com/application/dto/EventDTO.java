package com.application.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventDTO {
	private Long id;
	private String name;
	private String location;
	private LocalDateTime dateTime;
	private String organizer;
	private String description;
}
