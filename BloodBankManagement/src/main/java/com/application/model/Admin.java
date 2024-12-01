package com.application.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.jetbrains.annotations.NotNull;

import lombok.Data;

@Entity
@Table(name = "admins")
@Data
public class Admin {

	@NotNull
	@Id
	private String email;
	private String username;
	@NotNull
	private String password;
	private String mobile;
	private String gender;
	private int age;
	private String role;

	public Admin() {
	}

	public Admin(String email, String username, String password, String role) {
		this.email = email;
		this.username = username;
		this.password = password;
		this.role = role;
	}

}
