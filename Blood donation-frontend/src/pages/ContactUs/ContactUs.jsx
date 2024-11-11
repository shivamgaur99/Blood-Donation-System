import React, { useState } from "react";
import './contact-us.css'; // Import your custom CSS for styling

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your message has been sent!');
    // Here you would typically handle the form submission to your server
  };

  return (
    <div className="contact-us-container">
      {/* Hero Section */}
      {/* <section className="contact-hero">
        <div className="contact-hero-overlay">
          <h1>Connect With Us</h1>
          <p>We're here to guide you. Reach out and make a difference.</p>
        </div>
      </section> */}

      {/* Contact Details Section */}
      <section className="contact-details">
        <div className="container">
          <h2>Ways to Reach Us</h2>
          <div className="contact-info">
            <div className="contact-item">
              <h3>📞 Call Us</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="contact-item">
              <h3>📧 Email</h3>
              <p>contact@lifegivers.org</p>
            </div>
            <div className="contact-item">
              <h3>📍 Office Location</h3>
              <p>123 Hope Street, Compassion City</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form">
        <div className="container">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
