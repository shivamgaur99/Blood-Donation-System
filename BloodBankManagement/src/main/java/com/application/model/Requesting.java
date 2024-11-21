package com.application.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

@Entity
@Data
public class Requesting {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String name;
	private String email;
	private String bloodgroup;
	private int units;
	private String disease;
	private String mobile;
	private String gender;
	private int age;
	private String status;

	@ManyToOne
	@JoinColumn(name = "user_email", referencedColumnName = "email", nullable = false, foreignKey = @ForeignKey(name = "FK_requesting_user"))
	@JsonBackReference("userReference")
	private User user;

	@OneToMany(mappedBy = "requesting", cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE })
	 @JsonManagedReference("requestReference")
	private List<Donor> donors;

	
	public Requesting(int id, String name, String email, String bloodgroup, int units, String disease, String mobile,
			String gender, int age, String status) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.bloodgroup = bloodgroup;
		this.units = units;
		this.disease = disease;
		this.mobile = mobile;
		this.gender = gender;
		this.age = age;
		this.status = status;
	}

}