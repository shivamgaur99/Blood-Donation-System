package com.application.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;

@Entity
@Data
public class Donor {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String name;

	@Column(name = "bloodgroup")
	private String bloodGroup;
	private int units;
	private String mobile;
	private String gender;
	private int age;
	private String city;
	private String address;
	private String date;

	@ManyToOne
	@JoinColumn(name = "user_email", referencedColumnName = "email", nullable = false, foreignKey = @ForeignKey(name = "FK_donor_user"))
	 @JsonBackReference("userReference")
	private User user;

	@ManyToOne
	@JoinColumn(name = "request_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "FK_donor_request"))
	 @JsonBackReference("requestReference")
	private Requesting requesting;

	
	public Donor() {
		super();
	}

	public Donor(int id, String name, String bloodGroup, int units, String mobile, String gender, int age, String city,
			String address, String date) {
		super();
		this.id = id;
		this.name = name;
		this.bloodGroup = bloodGroup;
		this.units = units;
		this.mobile = mobile;
		this.gender = gender;
		this.age = age;
		this.city = city;
		this.address = address;
		this.date = date;
	}

}