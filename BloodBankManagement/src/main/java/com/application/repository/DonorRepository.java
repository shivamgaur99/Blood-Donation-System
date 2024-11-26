package com.application.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.application.model.Donor;
import com.application.model.User;

public interface DonorRepository extends CrudRepository<Donor, Integer> {
//    public Donor findByBloodGroup(String bloodGroup);

//	public Donor findByGender(String gender);

	@Query(value = "select * from donor", nativeQuery = true)
	public List<Donor> findBloodDetails();

	@Transactional
	@Modifying
	@Query(value = "delete from donor where name = ?1", nativeQuery = true)
	public void deleteByUsername(String name);

	// Find donors by blood group
	List<Donor> findByBloodGroup(String bloodGroup);

	List<Donor> findByCity(String city);

	List<Donor> findByGender(String gender);

	List<Donor> findByBloodGroupAndCity(String bloodGroup, String city);

	List<Donor> findByAgeBetween(int minAge, int maxAge);
	
	List<Donor> findByUser(User user);
	 
	 

}