package com.application.dto;

import java.time.Instant;
import java.util.List;

import lombok.Data;

@Data
public class RequestDTO {

	private int id;
	private String name;
	private String email;
	private String bloodGroup;
	private int units;
	private String disease;
	private String mobile;
	private String gender;
	private int age;
	private String status;
	private Instant createdAt;
	private Instant updatedAt;

	private String userEmail;

	private List<DonorDTO> donors;

	public RequestDTO(int id, String name, String email, String bloodGroup, int units, String disease, String mobile,
			String gender, int age, String status, Instant createdAt, Instant updatedAt) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.bloodGroup = bloodGroup;
		this.units = units;
		this.disease = disease;
		this.mobile = mobile;
		this.gender = gender;
		this.age = age;
		this.status = status;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

}
