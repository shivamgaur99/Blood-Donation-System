import React from "react";
import "./Home.css";

// Reusable Feature Item Component
const FeatureItem = ({ iconClass, title, description }) => (
  <div className="feature-item">
    <i className={`fas ${iconClass} fa-3x`} aria-hidden="true"></i>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 wlcm">
              <div>
                <h1>Welcome to Blood Donation</h1>
                <p className="para">
                  We are dedicated to saving lives through voluntary blood donation. Join us in making a difference.
                </p>
                <a href="http://localhost:3000/login" aria-label="Donate Now">
                  <button className="donate-button">Donate Now</button>
                </a>
              </div>
            </div>
            <div className="col-12 col-md-6 hero-image">
              <div className="image-container">
                <img src="bldrop.png" alt="Blood Drop" className="blood-drop" />
                <img src="hand.png" alt="Hand" className="hand-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="features-title">Why Donate Blood?</h2>
        <div className="features-container">
          <FeatureItem
            iconClass="fa-heart"
            title="Save Lives"
            description="By donating blood, you can help save lives and support medical treatments."
          />
          <FeatureItem
            iconClass="fa-users"
            title="Community Impact"
            description="Join our blood donation community and make a positive impact in your area."
          />
          <FeatureItem
            iconClass="fa-medkit"
            title="Health Benefits"
            description="Regular blood donation has numerous health benefits for donors."
          />
        </div>
      </section>
    </div>
  );
}

export default Home;
