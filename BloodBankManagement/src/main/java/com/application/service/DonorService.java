package com.application.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.model.Donor;
import com.application.model.Requesting;
import com.application.repository.DonorRepository;
import com.application.repository.RequestingBloodRepository;

@Service
public class DonorService {
	
	@Autowired
	private DonorRepository donorRepository;

	@Autowired
	private RequestingBloodRepository requestingBloodRepository;

	/**
	 * Save a new donor or update an existing donor.
	 *
	 * @param donor the donor object to be saved
	 */
//    public void saveDonor(Donor donor) {
//        donorRepository.save(donor);
//    }

	/**
	 * Retrieve all donors.
	 *
	 * @return a list of all donors
	 */
//    public List<Donor> getAllDonors() {
//        return donorRepository.findAll();
//    }

	/**
	 * Retrieve a donor by ID.
	 *
	 * @param id the ID of the donor
	 * @return the donor object, or null if not found
	 */
	public Donor getDonorById(int id) {
		Optional<Donor> donor = donorRepository.findById(id);
		return donor.orElse(null);
	}

	/**
	 * Delete a donor by ID.
	 *
	 * @param id the ID of the donor to be deleted
	 */
	public void deleteDonor(int id) {
		donorRepository.deleteById(id);
	}

	/**
	 * Find donors by blood group.
	 *
	 * @param bloodGroup the blood group to search for
	 * @return a list of donors with the specified blood group
	 */
    public List<Donor> getDonorsByBloodGroup(String bloodGroup) {
        return donorRepository.findByBloodGroup(bloodGroup);
    }

	public Donor saveDonor(Donor donor) {
		return donorRepository.save(donor);
	}

	public Donor saveUserAsDonor(Donor donor) {
		return donorRepository.save(donor);
	}

	public Requesting saveBloodRequest(Requesting request) {
		return requestingBloodRepository.save(request);
	}

//	public Donor fetchDonorByBloodGroup(String bloodGroup) {
//		return donorRepository.findByBloodGroup(bloodGroup);
//	}

	public void updateStatus(String email) {
		requestingBloodRepository.updateStatus(email);
		System.out.println("Updated");
	}

	public void rejectStatus(String email) {
		requestingBloodRepository.rejectStatus(email);
	}

//	public Donor fetchDonorByGender(String gender) {
//		return donorRepository.findByGender(gender);
//	}

	public List<Donor> getAllDonors() {
		return (List<Donor>) donorRepository.findAll();
	}

	public List<Requesting> getRequestHistory() {
		return (List<Requesting>) requestingBloodRepository.findAll();
	}

	public List<Requesting> getRequestHistoryByEmail(String email) {
		return (List<Requesting>) requestingBloodRepository.findByEmail(email);
	}

	public List<Donor> getBloodDetails() {
		return (List<Donor>) donorRepository.findBloodDetails();
	}

	public void checkforOldBloodSamples(List<Donor> donors) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		String todayDate = formatter.format(date);
		for (Donor donorlist : donors) {
			String donationDate = donorlist.getDate();
			long days = findDifference(donationDate, todayDate);
			if (days > 90) {
				String userName = donorlist.getName();
				donorRepository.deleteByUsername(userName);
			}
		}
	}

	static long findDifference(String donationDate, String todayDate) {
		long daysDifference = 0;
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Date date1 = sdf.parse(donationDate);
			Date date2 = sdf.parse(todayDate);
			long timeDifference = date2.getTime() - date1.getTime();
			daysDifference = (timeDifference / (1000 * 60 * 60 * 24)) % 365;
			System.out.println("The Blood sample is " + daysDifference + " days older.");
		} catch (Exception e) {
			System.out.print(e);
		}
		return daysDifference;
	}
}