import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center text-primary mb-5">User Dashboard</h1>
      <div className="row">
        {/* Make Request Card */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card shadow-lg border-primary rounded">
            <img
              src="https://via.placeholder.com/500"
              className="card-img-top"
              alt="Make Request"
            />
            <div className="card-body">
              <h5 className="card-title">Make Request</h5>
              <p className="card-text">Click here to make a blood request.</p>
              <Link to="/makeRequest" className="btn btn-primary btn-block">
                Go to Make Request
              </Link>
            </div>
          </div>
        </div>

        {/* Request History Card */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card shadow-lg border-success rounded">
            <img
              src="https://via.placeholder.com/500"
              className="card-img-top"
              alt="Request History"
            />
            <div className="card-body">
              <h5 className="card-title">Request History</h5>
              <p className="card-text">View your blood request history.</p>
              <Link to="/requestHistory" className="btn btn-success btn-block">
                Go to Request History
              </Link>
            </div>
          </div>
        </div>

        {/* Donate Blood Card */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card shadow-lg border-danger rounded">
            <img
              src="https://via.placeholder.com/500"
              className="card-img-top"
              alt="Donate Blood"
            />
            <div className="card-body">
              <h5 className="card-title">Donate Blood</h5>
              <p className="card-text">Click here to donate blood.</p>
              <Link to="/donateBlood" className="btn btn-danger btn-block">
                Go to Donate Blood
              </Link>
            </div>
          </div>
        </div>

        {/* Available Donors Card */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card shadow-lg border-warning rounded">
            <img
              src="https://via.placeholder.com/500"
              className="card-img-top"
              alt="Donation History"
            />
            <div className="card-body">
              <h5 className="card-title">Donation History</h5>
              <p className="card-text">View Donation History</p>
              <Link to="/user-donors" className="btn btn-warning btn-block">
                Go to Donation History
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
