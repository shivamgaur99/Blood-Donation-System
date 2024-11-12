import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BloodRequestHistory() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch blood request history from the server
    axios
      .get('http://localhost:8181/requestHistory')
      .then((response) => {
        // Set the requests state with the fetched data
        setRequests(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  }, []);

  const handleUpdateStatus = (email, status) => {
    // Update status in the database
    axios
      .post(`http://localhost:8181/updateStatus/${email}`, { status })
      .then(() => {
        // Handle success
        console.log(`Status updated to "${status}"`);
        // Refresh the blood request history
        refreshBloodRequestHistory();
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  };

  const refreshBloodRequestHistory = () => {
    // Fetch the updated blood request history from the server
    axios
      .get('http://localhost:8181/requestHistory')
      .then((response) => {
        // Set the requests state with the updated data
        setRequests(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  };

  return (
    <div>
      <h1>Blood Request History</h1>
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
            <th>Actions</th>
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
              <td>
                {request.status === 'false' && (
                  <div>
                    <button
                      className="btn btn-success"
                      onClick={() => handleUpdateStatus(request.email, 'accepted')}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleUpdateStatus(request.email, 'rejected')}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BloodRequestHistory;
