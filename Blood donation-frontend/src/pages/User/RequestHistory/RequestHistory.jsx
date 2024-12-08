import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { END_POINT } from "../../../config/api";
import Loader from "../../../components/util/Loader"; // Assuming you have a Loader component
import { useToast } from "../../../services/toastService"; // Assuming you're using a toast service for notifications
import { SimpleToast } from "../../../components/util/Toast/Toast"; // Toast Component

const RequestHistory = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast, showToast, hideToast } = useToast(); // Toast service

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      fetchRequestHistory(email);
    } else {
      setError('No user logged in');
      setLoading(false);
    }
  }, []);

  const fetchRequestHistory = (email) => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      setError('User is not authenticated');
      setLoading(false);
      return;
    }

    setLoading(true); // Show loader before fetching data
    axios
      .get(`${END_POINT}/userRequestHistory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
        showToast("Request history fetched successfully!", "success"); // Success toast
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching request history:', error);
        if (error.response && error.response.status === 401) {
          setError('Authentication failed. Please login again.');
        } else {
          setError('Failed to fetch the request history. Please try again later.');
        }
        showToast(error.message || "Failed to fetch request history. Please try again.", "error"); // Error toast
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Request History</h1>

      {/* Loading Spinner */}
      {loading && (
        <div className="d-flex justify-content-center my-4">
          <Loader /> {/* Custom Loader component */}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {/* Request History Table */}
      {!loading && !error && (
       
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
                </tr>
              </thead>
              <tbody>
                {requests.length > 0 ? (
                  requests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.id}</td>
                      <td>{request.name}</td>
                      <td>{request.mobile}</td>
                      <td>{request.gender}</td>
                      <td>{request.bloodGroup}</td>
                      <td>{request.age}</td>
                      <td>{request.disease}</td>
                      <td>{request.units}</td>
                      <td>
                        <span className={`badge ${request.status === 'Approved' ? 'bg-success' : request.status === 'Rejected' ? 'bg-danger' : 'bg-warning'}`}>
                          {request.status === 'false' ? 'Pending' : request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">You have not made any requests yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        
      )}

      {/* Toast Notification */}
      {toast.open && (
        <SimpleToast
          open={toast.open}
          severity={toast.severity}
          message={toast.message}
          handleCloseToast={hideToast}
        />
      )}
    </div>
  );
};

export default RequestHistory;
