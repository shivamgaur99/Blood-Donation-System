package com.application.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

@Entity
@Data
public class User {
	// @Id
	// @GeneratedValue(strategy = GenerationType.AUTO)
	// private int id;
	@Id
	private String email;
	private String username;
	private String mobile;
	private String bloodgroup;
	private String gender;
	private int age;
	private String password;
	private String role;

	@OneToMany(mappedBy = "user", cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE })
	@JsonManagedReference("userReference")
	private List<Donor> donations;

	@OneToMany(mappedBy = "user", cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE })
	@JsonManagedReference("userReference")
	private List<Requesting> requests;

	
	public User() {
		super();
	}

	public User(String email, String username, String password) {
		super();
		// this.id = id;
		this.email = email;
		this.username = username;
		this.password = password;
	}

}