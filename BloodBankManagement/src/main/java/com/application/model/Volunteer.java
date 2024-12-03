package com.application.model;

import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Volunteer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "First name is required")
	@Size(max = 50, message = "First name cannot exceed 50 characters")
	private String firstName;

	@NotBlank(message = "Last name is required")
	@Size(max = 50, message = "Last name cannot exceed 50 characters")
	private String lastName;

	@NotBlank(message = "Email is required")
	@Email(message = "Invalid email format")
	private String email;

	@NotBlank(message = "Phone number is required")
	@Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Invalid phone number")
	private String phone;

	@NotBlank(message = "Address is required")
	@Size(max = 255, message = "Address cannot exceed 255 characters")
	private String address;

	@NotBlank(message = "Emergency contact name is required")
	private String emergencyContactName;

	@NotBlank(message = "Emergency contact phone is required")
	@Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Invalid emergency contact phone number")
	private String emergencyContactPhone;

	private String role;

	private boolean isFirstTimeDonor;
	private boolean isPreviousVolunteer;
	private boolean consent;

	@ManyToOne
	@JoinColumn(name = "user_email", foreignKey = @ForeignKey(name = "FK_user"))
	@JsonBackReference("user-volunteer")
	private User user;

	@CreationTimestamp
	@Column(name = "created_at", updatable = false)
	private Instant createdAt;

	@UpdateTimestamp
	@Column(name = "updated_at")
	private Instant updatedAt;
}
