import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   // Clear the user login status from localStorage
  //   localStorage.removeItem('userLoggedIn');
  //   // Navigate to the login page
  //   navigate('/login');
  // };

  return (
    <div>
      <h1>User Dashboard</h1>
      <div className="card-deck">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Make Request</h5>
            <p className="card-text">Click here to make a blood request.</p>
            <Link to="/makeRequest" className="btn btn-primary">Go to Make Request</Link>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Request History</h5>
            <p className="card-text">View your blood request history.</p>
            <Link to="/requestHistory" className="btn btn-primary">Go to Request History</Link>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Donate Blood</h5>
            <p className="card-text">Click here to donate blood.</p>
            <Link to="/donateBlood" className="btn btn-primary">Go to Donate Blood</Link>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Available Donors</h5>
            <p className="card-text">View available blood donors.</p>
            <Link to="/availableDonors" className="btn btn-primary">Go to Available Donors</Link>
          </div>
        </div>
      </div>
      {/* <button className="btn btn-danger mt-4" onClick={handleLogout}>
        Logout
      </button> */}
    </div>
  );
}

export default UserDashboard;
