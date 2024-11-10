import React from "react";
import "./about-us.css";

const AboutUs = () => {
  return (
    <div className="about-us">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About Us</h1>
          <p>
            Join us on a mission to save lives, support communities, and make every donation count.
          </p>
          <button className="abt-us-btn primary">Become a Part of Our Story</button>
        </div>
      </section>

       {/* Story Section */}
       <section className="story">
        <h2>Our Story</h2>
        <p>
          Founded with a commitment to saving lives, we started as a small group of volunteers passionate about making blood donations accessible to everyone in need. Today, we’re a growing community of donors, supporters, and heroes united by a simple goal: to provide hope and save lives through the gift of blood.
        </p>
        <button className="abt-us-btn secondary">Learn More About Our Journey</button>
      </section>


      {/* Mission and Vision Section */}
      <section className="mission-vision">
        <div className="vision">
          <h2>Our Mission</h2>
          <p>
            To make blood donation accessible and rewarding, empowering individuals and communities to save lives with every drop.
          </p>
        </div>
        <div className="vision">
          <h2>Our <br />Vision</h2>
          <p>
            A world where blood is available to all who need it, with every community member engaged in the life-saving effort.
          </p>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="values">
        <h2>Our Core Values</h2>
        <div className="values-list">
          <div className="value">
            <h3>Compassion</h3>
            <p>Putting empathy at the heart of our work and our relationships.</p>
          </div>
          <div className="value">
            <h3>Community</h3>
            <p>Building connections that empower individuals and strengthen society.</p>
          </div>
          <div className="value">
            <h3>Integrity</h3>
            <p>Ensuring trust through transparent, ethical practices.</p>
          </div>
          <div className="value">
            <h3>Innovation</h3>
            <p>Finding new ways to improve the donation process and save more lives.</p>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      {/* <section className="impact">
        <h2>Our Impact</h2>
        <p>Since our founding, our community has made a difference in countless lives.</p>
        <div className="impact-stat">
        <div className="stat">
            <h3>15,000+</h3>
            <p>Lives Saved</p>
          </div>
          <div className="stat">
            <h3>7,500+</h3>
            <p>Pints Collected</p>
          </div>
          <div className="stat">
            <h3>500+</h3>
            <p>Volunteer Heroes</p>
          </div>
          <div className="stat">
            <h3>200+</h3>
            <p>Successful Drives</p>
          </div>
        </div>
      </section> */}

         
    </div>
  );
};

export default AboutUs;
