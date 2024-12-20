import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./overview.css";

const Overview = (props) => {
  const navigate = useNavigate();
  const isUserLoggedIn = localStorage.getItem("jwtToken");

  const handleDonateNow = () => {
    if (isUserLoggedIn) {
      navigate("/donateBlood");
    } else {
      Swal.fire({
        title: "Login Required",
        text: "You need to login to donate blood.",
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

  const handleFindCenter = () => {
    if (isUserLoggedIn) {
      navigate("/contact-us");
    } else {
      Swal.fire({
        title: "Login Required",
        text: "You need to login to find a donation center.",
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
    <div className="overview-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Saving Lives, One Donation at a Time</h1>
          <p>
            Your blood can make a difference. Join us in helping those in need.
          </p>
          <div className="hero-buttons">
            <button
              className="overview-button primary"
              onClick={handleDonateNow}
            >
              Donate Now
            </button>
            <button
              className="overview-button secondary"
              onClick={handleFindCenter}
            >
              Find a Donation Center
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Overview;
