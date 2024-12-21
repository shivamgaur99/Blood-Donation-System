import React from "react";
import { Link } from "react-router-dom";
import "./user-dashboard.css";

const UserDashboard = (props) => {
  let dark = props.theme;

  return (
    <div className={`dashboard-container ${dark ? "dark" : "light"}`}>
      <h1
        className={`dashboard-title text-center ${
          dark ? "text-light" : "text-primary"
        } mb-5`}
      >
        User Dashboard
      </h1>
      <div className="card-deck">
        {/* Donate Blood Card */}
        <div
          className={`card shadow-lg border-danger rounded ${
            dark ? "dark-card" : ""
          }`}
        >
          <div className="card-body">
            <h5 className="card-title">Donate Blood</h5>
            <p className="card-text">Click here to donate blood.</p>
            <Link
              to="/donateBlood"
              className={`btn btn-danger btn-block ${dark ? "btn-dark" : ""}`}
            >
              Go to Donate Blood
            </Link>
          </div>
        </div>

        {/* Make Request Card */}
        <div
          className={`card shadow-lg border-primary rounded ${
            dark ? "dark-card" : ""
          }`}
        >
          <div className="card-body">
            <h5 className="card-title">Make Request</h5>
            <p className="card-text">Click here to make a blood request.</p>
            <Link
              to="/makeRequest"
              className={`btn btn-primary btn-block ${dark ? "btn-dark" : ""}`}
            >
              Go to Make Request
            </Link>
          </div>
        </div>

        {/* Donation History Card */}
        <div
          className={`card shadow-lg border-warning rounded ${
            dark ? "dark-card" : ""
          }`}
        >
          <div className="card-body">
            <h5 className="card-title">Donation History</h5>
            <p className="card-text">View Donation History</p>
            <Link
              to="/user-donors"
              className={`btn btn-warning btn-block ${dark ? "btn-dark" : ""}`}
            >
              Go to Donation History
            </Link>
          </div>
        </div>

        {/* Request History Card */}
        <div
          className={`card shadow-lg border-success rounded ${
            dark ? "dark-card" : ""
          }`}
        >
          <div className="card-body">
            <h5 className="card-title">Request History</h5>
            <p className="card-text">View your blood request history.</p>
            <Link
              to="/requestHistory"
              className={`btn btn-success btn-block ${dark ? "btn-dark" : ""}`}
            >
              Go to Request History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
