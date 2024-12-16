package com.application.dto;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonorDTO {

	private int id;
	private String name;
	private String bloodGroup;
	private int units;
	private String mobile;
	private String gender;
	private int age;
	private String city;
	private String address;
	private String date;
	private String userEmail;
	private int requestId;
	private int eventId;
	private Instant createdAt;
	private Instant updatedAt;

}
