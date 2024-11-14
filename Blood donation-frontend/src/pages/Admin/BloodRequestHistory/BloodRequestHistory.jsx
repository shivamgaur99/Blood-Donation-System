import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { END_POINT } from "../../../config/api";

function BloodRequestHistory() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch blood request history
  const fetchBloodRequestHistory = () => {
    setLoading(true);
    const token = localStorage.getItem('jwtToken');  // Get the JWT token from localStorage (or another storage)

    if (!token) {
      setError('No token found, please login.');
      setLoading(false);
      return;
    }

    // Add the token to the headers
    axios
      .get(`${END_POINT}/requestHistory`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header with token
        },
      })
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching request history:', error);
        setError('Failed to fetch request history');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBloodRequestHistory();
  }, []);

  const handleAcceptStatus = (email, status) => {
    const token = localStorage.getItem('jwtToken');  // Get the JWT token from localStorage (or another storage)

    if (!token) {
      setError('No token found, please login.');
      return;
    }

    axios
      .post(
        `${END_POINT}/updateStatus/${email}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header with token
          },
        }
      )
      .then(() => {
        fetchBloodRequestHistory(); // Refresh the data after updating the status
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        setError('Failed to update status');
      });
  };

  const handleRejectStatus = (email) => {
    const token = localStorage.getItem('jwtToken');  // Get the JWT token from localStorage (or another storage)

    if (!token) {
      setError('No token found, please login.');
      return;
    }

    axios
      .get(`${END_POINT}/rejectstatus/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header with token
        },
      })
      .then((response) => {
        console.log('Status updated to rejected:', response.data);
        fetchBloodRequestHistory(); // Refresh the data after updating the status
      })
      .catch((error) => {
        console.error('Error updating status to rejected:', error);
        setError('Failed to update status to rejected');
      });
  };

  return (
    <div className="container my-5">
      <h1 className="text-center text-primary mb-4">Blood Request History</h1>

      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          {requests.length === 0 ? (
            <div className="alert alert-info text-center">
              No blood requests available at the moment.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <thead className="table-dark">
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
                    <tr
                      key={request.id}
                      className={
                        request.status === 'accepted'
                          ? 'table-success'
                          : request.status === 'rejected'
                          ? 'table-danger'
                          : ''
                      }
                    >
                      <td>{request.id}</td>
                      <td>{request.name}</td>
                      <td>{request.mobile}</td>
                      <td>{request.gender}</td>
                      <td>{request.bloodgroup}</td>
                      <td>{request.age}</td>
                      <td>{request.disease}</td>
                      <td>{request.units}</td>
                      <td>
                        <span
                          className={`badge ${
                            request.status === 'accepted'
                              ? 'bg-success'
                              : request.status === 'rejected'
                              ? 'bg-danger'
                              : 'bg-warning'
                          }`}
                        >
                          {request.status === 'false'
                            ? 'Pending'
                            : request.status.charAt(0).toUpperCase() +
                              request.status.slice(1)}
                        </span>
                      </td>
                      <td>
                      {request.status === 'false' && (
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-success"
                            onClick={() => handleAcceptStatus(request.email, 'accepted')}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleRejectStatus(request.email)}
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
          )}
        </>
      )}
    </div>
  );
}

export default BloodRequestHistory;
