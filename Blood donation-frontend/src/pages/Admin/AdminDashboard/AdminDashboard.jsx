import React from 'react';
import { useNavigate } from 'react-router-dom';
import './admin-dashboard.css'; 

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="card-deck">
        <div className="card" onClick={() => navigate('/addDonors')}>
          <div className="card-body">
            <h5 className="card-title">Add Donors</h5>
            <p className="card-text">Add new blood donors</p>
            <button className="btn btn-primary">Go to Add Donors</button>
          </div>
        </div>
        <div className="card" onClick={() => navigate('/users')}>
          <div className="card-body">
            <h5 className="card-title">Users</h5>
            <p className="card-text">Manage registered users</p>
            <button className="btn btn-primary">Go to Users</button>
          </div>
        </div>
        <div className="card" onClick={() => navigate('/bloodRequests')}>
          <div className="card-body">
            <h5 className="card-title">Blood Requests</h5>
            <p className="card-text">Manage blood requests</p>
            <button className="btn btn-primary">Blood Requests History</button>
          </div>
        </div>
        <div className="card" onClick={() => navigate('/availableDonors')}>
          <div className="card-body">
            <h5 className="card-title">Donors</h5>
            <p className="card-text">Manage blood donors</p>
            <button className="btn btn-primary">Go to Donors</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
