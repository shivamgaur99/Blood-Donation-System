import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const MakeRequest = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [units, setUnits] = useState(0);
  const [disease, setDisease] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestData = {
      name,
      email,
      bloodgroup: bloodGroup,
      units,
      disease,
      mobile,
      gender,
      age,
      status: false
    };

    axios
      .post('http://localhost:8181/requestblood', requestData)
      .then((response) => {
        // Handle the response from the server
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Blood request added successfully!'
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to add the blood request. Please try again later.'
        });
      });
  };

  return (
    <div>
      <h1>Make Blood Request</h1>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <label htmlFor="disease">Disease</label>
          <input
            type="text"
            className="form-control"
            id="disease"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MakeRequest;

