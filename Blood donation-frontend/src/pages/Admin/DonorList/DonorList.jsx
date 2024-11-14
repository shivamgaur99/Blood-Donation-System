import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { END_POINT } from "../../../config/api";

const DonorList = () => {
  const [donorList, setDonorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDonorList();
  }, []);

  const fetchDonorList = () => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      setError('User is not authenticated');
      setLoading(false);
      return;
    }

    axios
      .get(`${END_POINT}/donorlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDonorList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to fetch donor list. Please try again later.');
        setLoading(false);
      });
  };

  return (
    <div className="container my-5">
      <h1 className="text-center text-primary mb-4">Available Blood Donors</h1>

      {loading && <div className="spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div>}

      {error && <div className="alert alert-danger">{error}</div>}

      {donorList.length === 0 && !loading && !error && (
        <div className="alert alert-info text-center">No donors available at the moment.</div>
      )}

      <div className="row">
        {donorList.map((donor) => (
          <div key={donor.id} className="col-md-4 mb-4">
            <div className="card shadow-sm border-primary rounded">
              <div className="card-header text-center text-white">
                <h5 className="card-title mb-0">{donor.name}</h5>
              </div>
              <div className="card-body">
                <p><strong>Address:</strong> {donor.address || 'Not Available'}</p>
                <p><strong>Age:</strong> {donor.age || 'Not Available'}</p>
                <p><strong>Gender:</strong> {donor.gender || 'Not Available'}</p>
                <p><strong>Blood Group:</strong> {donor.bloodGroup || 'Not Available'}</p>
                <p><strong>City:</strong> {donor.city || 'Not Available'}</p>
                <p><strong>Mobile:</strong> {donor.mobile || 'Not Available'}</p>
                <p><strong>Units:</strong> {donor.units || 'Not Available'}</p>
                <p><strong>Date:</strong> {donor.date || 'Not Available'}</p>
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-success">Contact Donor</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonorList;
