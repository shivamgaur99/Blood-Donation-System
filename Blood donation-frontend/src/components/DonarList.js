import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DonarList = () => {
  const [donorList, setDonorList] = useState([]);

  useEffect(() => {
    fetchDonorList();
  }, []);

  const fetchDonorList = () => {
    axios
      .get('http://localhost:8181/donorlist')
      .then((response) => {
        setDonorList(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to fetch donor list. Please try again later.');
      });
  };

  return (
    <div>
      <h1>Donor List</h1>
      {donorList.map((donor) => (
        <div key={donor.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{donor.name}</h5>
            <p className="card-text">
              <strong>Address:</strong> {donor.address}
              <br />
              <strong>Age:</strong> {donor.age}
              <br />
              <strong>Gender:</strong> {donor.gender}
              <br />
              <strong>Blood Group:</strong> {donor.bloodGroup || 'Not Available'}
              {/* Display 'Not Available' if blood group info is missing */}
              <br />
              <strong>City:</strong> {donor.city}
              <br />
              <strong>Mobile:</strong> {donor.mobile}
              <br />
              <strong>Units:</strong> {donor.units}
              <br />
              <strong>Date:</strong> {donor.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DonarList;
