import React from 'react';
import { useNavigate } from 'react-router-dom';
import './admin-dashboard.css'; 

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center text-primary mb-5">Admin Dashboard</h1>
      <div className="row">
        {/* Add Donors Card */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card shadow-lg border-primary rounded">
            <img
              src="https://via.placeholder.com/500"
              className="card-img-top"
              alt="Add Donors"
            />
            <div className="card-body">
              <h5 className="card-title">Add Donors</h5>
              <p className="card-text">Add new blood donors</p>
              <button 
                className="btn btn-primary btn-block"
                onClick={() => navigate('/addDonors')}
              >
                Go to Add Donors
              </button>
            </div>
          </div>
        </div>

        {/* Manage Users Card */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card shadow-lg border-success rounded">
            <img
              src="https://via.placeholder.com/500"
              className="card-img-top"
              alt="Manage Users"
            />
            <div className="card-body">
              <h5 className="card-title">Users</h5>
              <p className="card-text">Manage registered users</p>
              <button 
                className="btn btn-success btn-block"
                onClick={() => navigate('/users')}
              >
                Go to Users
              </button>
            </div>
          </div>
        </div>

        {/* Blood Requests Card */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card shadow-lg border-danger rounded">
            <img
              src="https://via.placeholder.com/500"
              className="card-img-top"
              alt="Blood Requests"
            />
            <div className="card-body">
              <h5 className="card-title">Blood Requests</h5>
              <p className="card-text">Manage blood requests</p>
              <button 
                className="btn btn-danger btn-block"
                onClick={() => navigate('/bloodRequests')}
              >
                Blood Requests History
              </button>
            </div>
          </div>
        </div>

        {/* Donors Management Card */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card shadow-lg border-warning rounded">
            <img
              src="https://via.placeholder.com/500"
              className="card-img-top"
              alt="Manage Donors"
            />
            <div className="card-body">
              <h5 className="card-title">Donors</h5>
              <p className="card-text">Manage blood donors</p>
              <button 
                className="btn btn-warning btn-block"
                onClick={() => navigate('/donors')}
              >
                Go to Donors
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
