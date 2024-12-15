import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { END_POINT } from "../../../config/api";

function AddDonors() {
  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [units, setUnits] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const donorData = {
      name,
      bloodGroup,
      units,
      mobile,
      gender,
      age,
      city,
      address,
      date,
    };

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "User is not authenticated. Please login again.",
      });
      return;
    }

    setIsLoading(true); // Start loading

    axios
      .post(`${END_POINT}/add`, donorData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setIsLoading(false); // Stop loading
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Donation data added successfully!",
        });
        resetForm();
      })
      .catch((error) => {
        setIsLoading(false); // Stop loading
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add donation data. Please try again later.",
        });
      });
  };

  const resetForm = () => {
    setName("");
    setBloodGroup("");
    setUnits("");
    setMobile("");
    setGender("");
    setAge("");
    setCity("");
    setAddress("");
    setDate("");
  };

  const isFormValid = () => {
    return (
      name &&
      bloodGroup &&
      units &&
      mobile &&
      gender &&
      age &&
      city &&
      address &&
      date
    );
  };

  return (
    <div className="container mt-5 mb-5 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        {/* Left Side Image */}
        <div className="col-md-6 mt-5 d-none d-md-block">
          <img
            src="https://via.placeholder.com/500" // Replace with an actual image source
            alt="Add Donor"
            className="img-fluid rounded"
            style={{ marginTop: "60px" }}
          />
        </div>

        {/* Right Side Form */}
        <div className="col-md-6">
          <h1 className="text-center mb-4 text-primary">Add Donor</h1>
          <form
            onSubmit={handleSubmit}
            className="shadow-lg p-4 bg-light rounded"
          >
            <div className="form-group">
              <label htmlFor="name">
                Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter donor's full name"
              />
            </div>

            {/* Blood Group and Units in Same Row */}
            <div className="form-row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="bloodGroup">
                    Blood Group <span className="text-danger">*</span>
                  </label>
                  <select
                    id="bloodGroup"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    required
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="units">
                    Units <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    id="units"
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    required
                    placeholder="Enter units of blood"
                  />
                </div>
              </div>
            </div>

            {/* Mobile Number */}
            <div className="form-group">
              <label htmlFor="mobile">
                Mobile <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  placeholder="Enter mobile number"
                />
              </div>
            </div>

            {/* Gender and Age in Same Row */}
            <div className="form-row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="gender">
                    Gender <span className="text-danger">*</span>
                  </label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="age">
                    Age <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    placeholder="Enter age"
                  />
                </div>
              </div>
            </div>

            {/* City */}
            <div className="form-group">
              <label htmlFor="city">
                City <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder="Enter city"
              />
            </div>

            {/* Address */}
            <div className="form-group">
              <label htmlFor="address">
                Address <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Enter address"
              />
            </div>

            {/* Date */}
            <div className="form-group">
              <label htmlFor="date">
                Date <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isFormValid() || isLoading}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDonors;
