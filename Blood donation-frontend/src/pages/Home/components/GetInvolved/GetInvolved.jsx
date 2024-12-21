import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './get-involved.css';

const GetInvolved = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = localStorage.getItem("jwtToken"); 

  const handleGetInvolved = () => {
    if (isUserLoggedIn) {
      navigate("/get-involved"); 
    } else {
      Swal.fire({
        title: "Login Required",
        text: "You need to login to get involved.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login Now",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    }
  };

  const handleVolunteer = () => {
    if (isUserLoggedIn) {
      navigate("/get-involved"); 
    } else {
      Swal.fire({
        title: "Login Required",
        text: "You need to login to volunteer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login Now",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    }
  };

  return (
    <section className="overview">
      <div className="overview-content">
        <h2>Get Involved</h2>

        <p>
          There are many ways to help: volunteer, host a drive, or spread
          awareness.
          <br />
          Blood donations are essential to saving lives. Your contribution
          helps provide life-saving blood to those in need. Every drop counts,
          and your involvement can make a difference in countless lives. Join
          our mission to help others by volunteering, donating, and spreading
          awareness!
        </p>
        <div className="overview-buttons">
          <button className="cta-button primary" onClick={handleGetInvolved}>
            Get Involved
          </button>
          <button className="cta-button secondary" onClick={handleVolunteer}>
            Volunteer with Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
