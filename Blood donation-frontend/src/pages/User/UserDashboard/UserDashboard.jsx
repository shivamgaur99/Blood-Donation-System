import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = (props) => {
  let dark = props.theme; 

  return (
    <div className={`dashboard-container ${dark ? 'dark' : 'light'}`}>
      <h1 className={`dashboard-title text-center ${dark ? 'text-light' : 'text-primary'} mb-5`}>User Dashboard</h1>
      <div className="row">
        {/* Make Request Card */}
        <div className={`col-md-6 col-lg-3 mb-4 ${dark ? 'dark-card' : ''}`}>
          <div className={`card shadow-lg border-primary rounded ${dark ? 'dark-card' : ''}`}>
            <img
              src="https://via.placeholder.com/500"
              className="card-img-top"
              alt="Make Request"
            />
            <div className="card-body">
              <h5 className="card-title">Make Request</h5>
              <p className="card-text">Click here to make a blood request.</p>
              <Link to="/makeRequest" className={`btn btn-primary btn-block ${dark ? 'btn-dark' : ''}`}>
                Go to Make Request
              </Link>
            </div>
          </div>
        </div>

        {/* Request History Card */}
        <div className={`col-md-6 col-lg-3 mb-4 ${dark ? 'dark-card' : ''}`}>
          <div className={`card shadow-lg border-success rounded ${dark ? 'dark-card' : ''}`}>
            <img
              src="https://via.placeholder.com/500"
              className="card-img-top"
              alt="Request History"
            />
            <div className="card-body">
              <h5 className="card-title">Request History</h5>
              <p className="card-text">View your blood request history.</p>
              <Link to="/requestHistory" className={`btn btn-success btn-block ${dark ? 'btn-dark' : ''}`}>
                Go to Request History
              </Link>
            </div>
          </div>
        </div>

        {/* Donate Blood Card */}
        <div className={`col-md-6 col-lg-3 mb-4 ${dark ? 'dark-card' : ''}`}>
          <div className={`card shadow-lg border-danger rounded ${dark ? 'dark-card' : ''}`}>
            <img
              src="https://via.placeholder.com/500"
              className="card-img-top"
              alt="Donate Blood"
            />
            <div className="card-body">
              <h5 className="card-title">Donate Blood</h5>
              <p className="card-text">Click here to donate blood.</p>
              <Link to="/donateBlood" className={`btn btn-danger btn-block ${dark ? 'btn-dark' : ''}`}>
                Go to Donate Blood
              </Link>
            </div>
          </div>
        </div>

        {/* Donation History Card */}
        <div className={`col-md-6 col-lg-3 mb-4 ${dark ? 'dark-card' : ''}`}>
          <div className={`card shadow-lg border-warning rounded ${dark ? 'dark-card' : ''}`}>
            <img
              src="https://via.placeholder.com/500"
              className="card-img-top"
              alt="Donation History"
            />
            <div className="card-body">
              <h5 className="card-title">Donation History</h5>
              <p className="card-text">View Donation History</p>
              <Link to="/user-donors" className={`btn btn-warning btn-block ${dark ? 'btn-dark' : ''}`}>
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
