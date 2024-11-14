package com.application.repository;

import org.springframework.data.repository.CrudRepository;
import com.application.model.Admin;

public interface AdminRepository extends CrudRepository<Admin, String> {
    
    public Admin findByEmail(String email); 
    public Admin findByUsername(String username);  // For username-based lookup
}
