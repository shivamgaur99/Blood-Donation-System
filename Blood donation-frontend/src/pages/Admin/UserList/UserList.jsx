import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { END_POINT } from "../../../config/api";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');  // Get the token from local storage or another method

    if (!token) {
      setError('No authentication token found.');
      setLoading(false);
      return;
    }

    // Fetch user list from the server
    axios
      .get(`${END_POINT}/userlist`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Add authorization header
        }
      })
      .then((response) => {
        // Set the users state with the fetched data
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        if (error.response && error.response.status === 401) {
          setError('Authentication failed. Please login again.');
        } else if (error.response && error.response.status === 404) {
          setError('Endpoint not found. Please check the API URL.');
        } else {
          setError('Failed to fetch users. Please try again later.');
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center text-primary mb-4">User List</h1>

      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      {/* No users available */}
      {!loading && !error && users.length === 0 && (
        <div className="alert alert-info text-center">No users available.</div>
      )}

      {/* User Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Age</th>
              <th>Blood Group</th>
              <th>Gender</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="table-row">
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.bloodgroup}</td>
                <td>{user.gender}</td>
                <td>{user.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
