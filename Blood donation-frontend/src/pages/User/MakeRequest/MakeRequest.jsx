import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { END_POINT } from "../../../config/api";

const MakeRequest = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [units, setUnits] = useState(0);
  const [disease, setDisease] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Get the JWT token from localStorage
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Required',
        text: 'Please log in to submit the request.',
      });
      return;
    }

    const requestData = {
      name,
      email,
      bloodGroup,
      units,
      disease,
      mobile,
      gender,
      age,
      status: false,
    };

    // Include the token in the Authorization header
    axios
      .post(`${END_POINT}/blood-requests`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Blood request added successfully!',
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to add the blood request. Please try again later.',
        });
      });
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        {/* Left Side Image */}
        <div className="col-md-6 mt-5 d-none d-md-block">
          <img 
            src="https://via.placeholder.com/500"  // Add your image source here
            alt="Donate Blood"
            className="img-fluid rounded"
            style={{ marginTop: '60px' }}
          />
        </div>

        {/* Right Side Form */}
        <div className="col-md-6">
          <h1 className="text-center mb-4 text-primary">Make Blood Request</h1>
          <form onSubmit={handleSubmit} className="shadow-lg p-4 bg-light rounded">
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name" className="font-weight-bold">Name <span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="font-weight-bold">Email <span className="text-danger">*</span></label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            {/* Blood Group and Units in Same Row */}
            <div className="form-row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="bloodGroup" className="font-weight-bold">Blood Group <span className="text-danger">*</span></label>
                  <select
                    className="form-control"
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
                  <label htmlFor="units" className="font-weight-bold">Units <span className="text-danger">*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    id="units"
                    value={units}
                    onChange={(e) => setUnits(Number(e.target.value))}
                    required
                    placeholder="Enter number of units"
                  />
                </div>
              </div>
            </div>

            {/* Disease */}
            <div className="form-group">
              <label htmlFor="disease" className="font-weight-bold">Disease (Optional)</label>
              <input
                type="text"
                className="form-control"
                id="disease"
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                placeholder="Any known disease (optional)"
              />
            </div>

            {/* Mobile */}
            <div className="form-group">
              <label htmlFor="mobile" className="font-weight-bold">Mobile <span className="text-danger">*</span></label>
              <input
                type="tel"
                className="form-control"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                placeholder="Enter your mobile number"
                pattern="^\d{10}$"
                title="Mobile number should be 10 digits"
              />
            </div>

            {/* Gender and Age in Same Row */}
            <div className="form-row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="gender" className="font-weight-bold">Gender <span className="text-danger">*</span></label>
                  <select
                    className="form-control"
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
                  <label htmlFor="age" className="font-weight-bold">Age <span className="text-danger">*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    required
                    placeholder="Enter your age"
                    min="18"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!name || !email || !bloodGroup || units <= 0 || !mobile || !gender || age <= 0}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MakeRequest;
