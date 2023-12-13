import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the admin login status from localStorage
    localStorage.removeItem('adminLoggedIn');
    // Navigate to the login page
    navigate('/adminLogin');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="card-deck">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Add Donors</h5>
            <p className="card-text">Add new blood donors</p>
            <Link to="/addDonors" className="btn btn-primary">
              Go to Add Donors
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Users</h5>
            <p className="card-text">Manage registered users</p>
            <Link to="/users" className="btn btn-primary">
              Go to Users
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Blood Requests</h5>
            <p className="card-text">Manage blood requests</p>
            <Link to="/bloodRequests" className="btn btn-primary">
              Blood Requests History
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Donors</h5>
            <p className="card-text">Manage blood donors</p>
            <Link to="/availableDonors" className="btn btn-primary">
              Go to Donors
            </Link>
          </div>
        </div>
      </div>
      {/* <button className="btn btn-danger mt-4" onClick={handleLogout}>
        Logout
      </button> */}
    </div>
  );
}

export default AdminDashboard;
