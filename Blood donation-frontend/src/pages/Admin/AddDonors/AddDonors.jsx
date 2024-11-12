import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function AddDonors() {
  const [name, setName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [units, setUnits] = useState(0);
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(0);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');

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

    axios
      .post('http://localhost:8181/addDonor', donorData)
      .then((response) => {
        if (response.status === 200) {
          // Display success alert
          Swal.fire({
            icon: 'success',
            title: 'Donor Added',
            text: 'The donor has been successfully added.',
          }
          );
          // Redirect the user to the home page
          window.location.href = "/userDashboard";
        } else {
          // Display error alert
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to add the donor. Please try again later.',
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Display error alert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add the donor. Please try again later.',
        });
      });
  };

  return (
    <div>
      <h1>Add Donor</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bloodGroup">Blood Group</label>
          <input
            type="text"
            className="form-control"
            id="bloodGroup"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="units">Units</label>
          <input
            type="number"
            className="form-control"
            id="units"
            value={units}
            onChange={(e) => setUnits(Number(e.target.value))}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            className="form-control"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            className="form-control"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="text"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default AddDonors;
