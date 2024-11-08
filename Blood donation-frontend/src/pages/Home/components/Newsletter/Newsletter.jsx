import React, { useState } from "react";
import "./newsletter.css"; // Custom styling

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with ${email}`);
    setEmail("");
  };

  return (
    <section className="newsletter">
      <h2>Stay Informed</h2>
      <p>
        Sign up for our newsletter to receive updates, success stories, and
        upcoming events.
      </p>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <button type="submit" className="subscribe-btn">
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
