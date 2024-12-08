package com.application.dto;

import java.time.Instant;
import java.util.List;

import com.application.model.Donor;
import com.application.model.Requesting;
import com.application.model.Volunteer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private String email;
    private String username;
    private String mobile;
    private String bloodgroup;
    private String gender;
    private int age;
    private String role;
    private List<Donor> donations;
    private List<Requesting> requests;
    private List<Volunteer> volunteers;
    private Instant createdAt;
    private Instant updatedAt;

}
