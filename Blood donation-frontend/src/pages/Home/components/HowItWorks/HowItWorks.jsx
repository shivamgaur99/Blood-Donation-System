import React from "react";
import "./how-it-works.css";

const HowItWorks = () => {
  return (
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
            <h3>Visit donation center</h3>
            <p>Visit a nearby donation center and give the gift of life.</p>
          </div>
          <div className="step">
            <div className="step-icon">3</div>
            <h3>Donor Screening</h3>
            <p>
              A health screening will be conducted to ensure you're eligible to
              donate.
            </p>
          </div>
          <div className="step">
            <div className="step-icon">4</div>
            <h3>Blood Donation</h3>
            <p>Donate blood in a safe and comfortable environment.</p>
          </div>
          <div className="step">
            <div className="step-icon">5</div>
            <h3>Recovery & Refresh</h3>
            <p>Enjoy a snack and relax before heading home.</p>
          </div>
          <div className="step">
            <div className="step-icon">6</div>
            <h3>Save Lives</h3>
            <p>
              Your donation can save up to three lives. Join us in making a
              difference.
            </p>
          </div>
        </div>
      </section>   
  );
};

export default HowItWorks;
