package com.application.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.model.BloodDetails;
import com.application.model.Donor;
import com.application.model.Requesting;
import com.application.model.User;
import com.application.repository.DonorRepository;
import com.application.repository.RequestingBloodRepository;

@Service
public class DonorService {

	@Autowired
	private DonorRepository donorRepository;

	public Donor getDonorById(int id) {
		Optional<Donor> donor = donorRepository.findById(id);
		return donor.orElse(null);
	}

	public boolean deleteDonor(int id) {
		Optional<Donor> donor = donorRepository.findById(id);
		if (donor.isPresent()) {
			donorRepository.deleteById(id);
			return true;
		} else {
			return false;
		}
	}

	public List<Donor> getDonorsByBloodGroup(String bloodGroup) {
		return donorRepository.findByBloodGroup(bloodGroup);
	}

	public List<Donor> getDonorsByUser(User user) {
		return donorRepository.findByUser(user);
	}

	public List<BloodDetails> getDonorUnitsByBloodGroup() {

		List<Donor> donors = (List<Donor>) donorRepository.findAll();

		Map<String, Integer> bloodGroupUnitsMap = new LinkedHashMap<>();

		for (Donor donor : donors) {
			String bloodGroup = donor.getBloodGroup();
			int units = donor.getUnits();

			bloodGroupUnitsMap.put(bloodGroup, bloodGroupUnitsMap.getOrDefault(bloodGroup, 0) + units);
		}

		List<BloodDetails> bloodDetailsList = new ArrayList<>();
		for (Map.Entry<String, Integer> entry : bloodGroupUnitsMap.entrySet()) {
			bloodDetailsList.add(new BloodDetails(entry.getKey(), entry.getValue(), entry.getValue()));
		}

		return bloodDetailsList;
	}

	public Donor saveDonor(Donor donor) {
		return donorRepository.save(donor);
	}

	public Donor saveUserAsDonor(Donor donor) {
		return donorRepository.save(donor);
	}

	public List<Donor> getAllDonors() {
		return (List<Donor>) donorRepository.findAll();
	}

	public List<Donor> getBloodDetails() {
		return (List<Donor>) donorRepository.findBloodDetails();
	}

	public void checkForOldBloodSamples(List<Donor> donors) {
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