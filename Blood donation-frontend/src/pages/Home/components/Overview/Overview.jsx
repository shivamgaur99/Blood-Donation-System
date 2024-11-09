import React from "react";
import "./overview.css";

const Overview = () => {
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

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works ?</h2>
        <div className="steps">
          <div className="step">
            <div className="step-icon">1</div>
            <h3>Sign Up</h3>
            <p>Register as a donor and learn about eligibility requirements.</p>
          </div>
          <div className="step">
            <div className="step-icon">2</div>
            <h3>Donate</h3>
            <p>Visit a nearby donation center and give the gift of life.</p>
          </div>
          <div className="step">
            <div className="step-icon">3</div>
            <h3>Save Lives</h3>
            <p>
              Your donation can save up to three lives. Join us in making a
              difference.
            </p>
          </div>
        </div>
      </section>

      <section className="overview">
        <div className="overview-content">
          <h2>Saving Lives, One Donation at a Time</h2>
          <p>
            Blood donations are essential to saving lives. Your contribution
            helps provide life-saving blood to those in need. Every drop counts,
            and your involvement can make a difference in countless lives.
          </p>
          <div className="overview-buttons">
            <button className="cta-button primary">Donate Now</button>
            <button className="cta-button secondary">Learn More</button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How Does Blood Donation Work?</h2>
        <div className="steps">
          <div className="step">
            <div className="step-icon">1</div>
            <h3>Register</h3>
            <p>Fill out a simple form and register as a blood donor.</p>
          </div>
          <div className="step">
            <div className="step-icon">2</div>
            <h3>Donor Screening</h3>
            <p>
              A health screening will be conducted to ensure you're eligible to
              donate.
            </p>
          </div>
          <div className="step">
            <div className="step-icon">3</div>
            <h3>Blood Donation</h3>
            <p>Donate blood in a safe and comfortable environment.</p>
          </div>
          <div className="step">
            <div className="step-icon">4</div>
            <h3>4. Recovery & Refresh</h3>
            <p>Enjoy a snack and relax before heading home.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Overview;
