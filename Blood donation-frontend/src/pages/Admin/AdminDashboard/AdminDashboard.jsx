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
              className="card-img-top"
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
              className="card-img-top"
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
              className="card-img-top"
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
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">Donors</h5>
              <p className="card-text">Manage blood donors</p>
              <button 
                className="btn btn-warning btn-block"
                onClick={() => navigate('/donorlist')}
              >
                Go to Donors
              </button>
            </div>
          </div>
        </div>

        {/* Events Card */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card shadow-lg border-info rounded">
            <img
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">Events</h5>
              <p className="card-text">Manage events</p>
              <button 
                className="btn btn-info btn-block"
                onClick={() => navigate('/event-management')}
              >
                Go to Events
              </button>
            </div>
          </div>
        </div>

        {/* Volunteers Card */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card shadow-lg border-secondary rounded">
            <img
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">Volunteers</h5>
              <p className="card-text">Manage volunteers</p>
              <button 
               className="btn btn-light btn-block"
                onClick={() => navigate('/volunteers')}
              >
                Go to Volunteers
              </button>
            </div>
          </div>
        </div>

        {/* Contacts Card */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card shadow-lg border-dark rounded">
            <img
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">Contacts</h5>
              <p className="card-text">Manage contact information</p>
              <button 
                className="btn btn-dark btn-block"
                onClick={() => navigate('/contacts')}
              >
                Go to Contacts
              </button>
            </div>
          </div>
        </div>

        {/* Teams Card */}
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card shadow-lg border-light rounded">
            <img
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">Teams</h5>
              <p className="card-text">Manage teams and their roles</p>
              <button 
                className="btn btn-light btn-block"
                onClick={() => navigate('/teams')}
              >
                Go to Teams
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
