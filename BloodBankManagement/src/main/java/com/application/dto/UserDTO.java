package com.application.dto;

import java.time.Instant;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDTO {

	private String email;
	private String username;
	private String mobile;
	private String bloodgroup;
	private String gender;
	private int age;
	private String role;
	private Instant createdAt;
	private Instant updatedAt;

	private List<VolunteerDTO> volunteers;
	private List<DonorDTO> donations;
	private List<RequestDTO> requests;

	public UserDTO(String email, String username, String mobile, String bloodgroup, String gender, int age, String role,
			Instant createdAt, Instant updatedAt) {
		this.email = email;
		this.username = username;
		this.mobile = mobile;
		this.bloodgroup = bloodgroup;
		this.gender = gender;
		this.age = age;
		this.role = role;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

}
