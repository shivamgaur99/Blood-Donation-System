package com.application.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VolunteerDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String gender;
    private String phone;
    private String email;
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String message;
    private String role;

    private EventDTO event;  
}
