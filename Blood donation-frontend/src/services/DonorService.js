//Service class created to invoke our rest-apis
import axios from "axios";

//define rest-api endpoint url
const DONOR_API_BASE_URL = "http://localhost:8181/api/v1/donors";

class DonorService {
  getDonors() {
    //returns response of get method
    return axios.get(DONOR_API_BASE_URL);
  }

  createDonor(donor) {
    console.log("Create donor : " + JSON.stringify(donor));
    return axios.post(DONOR_API_BASE_URL, donor);
  }

  getDonorById(donorId) {
    console.log("Get donor by id :" + donorId);
    console.log("donorId " + donorId.toString());
    return axios.get(DONOR_API_BASE_URL + "/" + donorId.toString());
  }

  updateDonor(donor, donorId) {
    console.log("Donor : ", donor);
    console.log("Id to be updated : " + donorId);
    console.log("donorId " + donorId.toString());
    return axios.put(DONOR_API_BASE_URL + "/" + donorId, donor);
  }

  deleteDonor(donorId) {
    console.log("Id to be deleted : " + donorId);
    return axios.delete(DONOR_API_BASE_URL + "/" + donorId);
  }

  // registerUser(user) {
  //   console.log("Register User : " + JSON.stringify(user));
  //   return axios.post(DONOR_API_BASE_URL, user);
  // }
}

export default new DonorService();
//object is exported instead of class here,
//so we can directly use object of this class
//inside a component
