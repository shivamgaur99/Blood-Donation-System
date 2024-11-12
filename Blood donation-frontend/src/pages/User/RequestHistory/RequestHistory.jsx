import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RequestHistory = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequestHistory();
  }, []);

  const fetchRequestHistory = () => {
    axios
      .get('http://localhost:8181/requestHistory') // Update the URL with your backend endpoint
      .then((response) => {
        // Handle the response from the server
        const data = response.data;
        setRequests(data);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to fetch the request history. Please try again later.');
      });
  };

  return (
    <div>
      <h1>Request History</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Gender</th>
            <th>Blood Group</th>
            <th>Age</th>
            <th>Disease</th>
            <th>Units</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.name}</td>
              <td>{request.mobile}</td>
              <td>{request.gender}</td>
              <td>{request.bloodgroup}</td>
              <td>{request.age}</td>
              <td>{request.disease}</td>
              <td>{request.units}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestHistory;
