import React from 'react';
import { useNavigate } from 'react-router-dom';
import './admin-dashboard.css'; 

function AdminDashboard(props) {
  const navigate = useNavigate();
  let dark = props.theme; // Assuming `props.theme` indicates dark mode

  return (
    <div className={`dashboard-container ${dark ? 'dark' : 'light'} `}>
      <h1 className={`dashboard-title text-center ${dark ? 'text-light' : 'text-primary'} mb-5`}>Admin Dashboard</h1>
      <div className="card-deck">
        {/* Add Donors Card */}
        <div className={`card shadow-lg border-primary rounded ${dark ? 'dark-card' : ''}`}>
          <div className="card-body">
            <h5 className="card-title">Add Donors</h5>
            <p className="card-text">Add new blood donors</p>
            <button 
              className={`btn btn-primary btn-block ${dark ? 'btn-dark' : ''}`}
              onClick={() => navigate('/addDonors')}
            >
              Go to Add Donors
            </button>
          </div>
        </div>

        {/* Manage Users Card */}
        <div className={`card shadow-lg border-success rounded ${dark ? 'dark-card' : ''}`}>
          <div className="card-body">
            <h5 className="card-title">Users</h5>
            <p className="card-text">Manage registered users</p>
            <button 
              className={`btn btn-success btn-block ${dark ? 'btn-dark' : ''}`}
              onClick={() => navigate('/users')}
            >
              Go to Users
            </button>
          </div>
        </div>

        {/* Blood Requests Card */}
        <div className={`card shadow-lg border-danger rounded ${dark ? 'dark-card' : ''}`}>
          <div className="card-body">
            <h5 className="card-title">Blood Requests</h5>
            <p className="card-text">Manage blood requests</p>
            <button 
              className={`btn btn-danger btn-block ${dark ? 'btn-dark' : ''}`}
              onClick={() => navigate('/bloodRequests')}
            >
              Blood Requests History
            </button>
          </div>
        </div>

        {/* Donors Management Card */}
        <div className={`card shadow-lg border-warning rounded ${dark ? 'dark-card' : ''}`}>
          <div className="card-body">
            <h5 className="card-title">Donors</h5>
            <p className="card-text">Manage blood donors</p>
            <button 
              className={`btn btn-warning btn-block ${dark ? 'btn-dark' : ''}`}
              onClick={() => navigate('/donorlist')}
            >
              Go to Donors
            </button>
          </div>
        </div>

        {/* Events Card */}
        <div className={`card shadow-lg border-info rounded ${dark ? 'dark-card' : ''}`}>
          <div className="card-body">
            <h5 className="card-title">Events</h5>
            <p className="card-text">Manage events</p>
            <button 
              className={`btn btn-info btn-block ${dark ? 'btn-dark' : ''}`}
              onClick={() => navigate('/event-management')}
            >
              Go to Events
            </button>
          </div>
        </div>

        {/* Volunteers Card */}
        <div className={`card shadow-lg border-secondary rounded ${dark ? 'dark-card' : ''}`}>
          <div className="card-body">
            <h5 className="card-title">Volunteers</h5>
            <p className="card-text">Manage volunteers</p>
            <button 
              className={`btn btn-light btn-block ${dark ? 'btn-dark' : ''}`}
              onClick={() => navigate('/volunteers')}
            >
              Go to Volunteers
            </button>
          </div>
        </div>

        {/* Contacts Card */}
        <div className={`card shadow-lg border-dark rounded ${dark ? 'dark-card' : ''}`}>
          <div className="card-body">
            <h5 className="card-title">Contacts</h5>
            <p className="card-text">Manage contact information</p>
            <button 
              className={`btn btn-dark btn-block ${dark ? 'btn-dark' : ''}`}
              onClick={() => navigate('/contacts')}
            >
              Go to Contacts
            </button>
          </div>
        </div>

        {/* Teams Card */}
        <div className={`card shadow-lg border-light rounded ${dark ? 'dark-card' : ''}`}>
          <div className="card-body">
            <h5 className="card-title">Teams</h5>
            <p className="card-text">Manage teams and their roles</p>
            <button 
              className={`btn btn-light btn-block ${dark ? 'btn-dark' : ''}`}
              onClick={() => navigate('/teams')}
            >
              Go to Teams
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
