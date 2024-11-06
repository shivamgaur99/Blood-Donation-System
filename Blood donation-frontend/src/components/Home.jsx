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
      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1>Save a Life. Donate Blood.</h1>
            <p>Your donation could make a difference.</p>
            <button 
              className="cta-btn" 
              onClick={() => alert('Thank you for considering to donate!')}
            >
              Donate Now
            </button>
          </div>
          <div className="hero-images">
            <div className="hero-image blood-drop">
              <img src="bldrop.png" alt="Left Image" />
            </div>
            <div className="hero-image hand-image">
              <img src="hand.png" alt="Right Image" />
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      {/* <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Save a Life. Donate Blood.</h1>
          <p>Your donation could make a difference.</p>
          <button 
            className="cta-btn" 
            onClick={() => alert('Thank you for considering to donate!')}
          >
            Donate Now
          </button>
        </div>
      </section> */}

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How Does Blood Donation Work?</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Register</h3>
            <p>Fill out a simple form and register as a blood donor.</p>
          </div>
          <div className="step">
            <h3>2. Donor Screening</h3>
            <p>A health screening will be conducted to ensure you're eligible to donate.</p>
          </div>
          <div className="step">
            <h3>3. Blood Donation</h3>
            <p>Donate blood in a safe and comfortable environment.</p>
          </div>
          <div className="step">
            <h3>4. Recovery & Refresh</h3>
            <p>Enjoy a snack and relax before heading home.</p>
          </div>
        </div>
      </section>

      {/* Hero Welcome Section */}
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
