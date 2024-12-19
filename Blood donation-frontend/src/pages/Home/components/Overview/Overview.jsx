import React from "react";
import "./overview.css";

const Overview = (props) => {
  let dark = props.theme;
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
            <button className="overview-button primary">Donate Now</button>
            <button className="overview-button secondary">
              Find a Donation Center
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Overview;
