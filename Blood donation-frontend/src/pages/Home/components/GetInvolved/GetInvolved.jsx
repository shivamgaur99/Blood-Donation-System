import React, { useState } from 'react';
import './get-involved.css';

const GetInvolved = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for signing up to volunteer!');
  };

  return (
    <div className="get-involved">
      {/* Hero Section */}
      <section className="join-us">
        <div className="join-us-content">
          <h2>Become a Hero, Save a Life</h2>
          {/* <h2>Join Us and Save Lives</h2> */}
          <p>
            Your donation can help save lives. Every drop matters. Join our
            community of life-saving heroes and make a difference. Whether
            you're donating blood, organizing events, or spreading awareness, we
            welcome you to take part.
          </p>
          {/* <p>
            Every donation is a life saved. Join our community of selfless
            donors and make an incredible impact. Whether you're donating blood,
            organizing a drive, or spreading awareness, your contribution
            counts!
          </p> */}
          <div className="cta-buttons">
            <button className="cta-button primary">Donate Now</button>
            <button className="cta-button secondary">Get Involved</button>
          </div>
        </div>

        <div className="join-us-image">
          <img src="path-to-your-image.jpg" alt="Join Us Image" />
        </div>
      </section>


     {/* Get Involved Section */}
     <section className="get-involve">
        <h2>Get Involved</h2>
        <p>
          There are many ways to help: volunteer, host a drive, or spread
          awareness.
        </p>
        <button className="get-involved-btn primary">Learn More</button>
      </section>

      <section className="get-involved-header">
        <h1>Get Involved & Save Lives</h1>
        <p>Join our mission to help others by volunteering, donating, and spreading awareness!</p>
        <div className="get-involved-btns">
          <button className="get-involved-btn primary">Become a Donor</button>
          <button className="get-involved-btn secondary">Volunteer with Us</button>
        </div>
      </section>

      {/* Volunteer Form */}
      <section className="volunteer-form">
        <h2>Volunteer Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Tell us why you want to volunteer"
            value={formData.message}
            onChange={handleChange}
          />
          <button type="submit" className="get-involved-btn primary">Sign Up</button>
        </form>
      </section>

      {/* Event Registration Section */}
     

      {/* Donation Facts Section */}
      <section className="donation-facts">
        <h2>Did You Know?</h2>
        <div className="fact-cards">
          <div className="fact-card">
            <h3>1 Pint Saves 3 Lives</h3>
            <p>Your single blood donation can help up to three individuals in need.</p>
          </div>
          <div className="fact-card">
            <h3>1 Donation Every 56 Days</h3>
            <p>Donors can donate blood every two months. Regular donations are essential to maintaining a stable blood supply.</p>
          </div>
          <div className="fact-card">
            <h3>Only 10% of the Population Donates</h3>
            <p>Just 10% of eligible individuals donate blood, which is why your contribution matters!</p>
          </div>
        </div>
      </section>

      {/* Partner Organizations Section */}
      <section className="partner-orgs">
        <h2>Our Partners</h2>
        <div className="partners">
          <div className="partner">
            <img src="/path/to/partner-logo1.png" alt="Partner 1" />
            <p>Partner 1</p>
          </div>
          <div className="partner">
            <img src="/path/to/partner-logo2.png" alt="Partner 2" />
            <p>Partner 2</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
