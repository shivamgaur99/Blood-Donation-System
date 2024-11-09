import React from 'react';
import './events.css'; // Custom styling for Events page

const Events = () => {
  return (
    <div className="events">
      <h2>Upcoming Events & Drives</h2>
      <div className="event-list">
        <div className="event">
          <div className="header">
            <div className="badge">Nov 15</div>
            <h3>Community Blood Drive</h3>
          </div>
          <p>Join us on November 15 at Central Park Community Center. Every donation counts!</p>
          <button className="event-btn">Sign Up</button>
        </div>
        <div className="event">
          <div className="header">
            <div className="badge">Dec 20</div>
            <h3>Holiday Blood Drive</h3>
          </div>
          <p>Celebrate the holiday season by giving the gift of life. Join us on December 20 at the Town Hall.</p>
          <button className="event-btn">Learn More</button>
        </div>
        <div className="event">
          <div className="header">
            <div className="badge">Jan 5</div>
            <h3>Monthly Donor Meet-up</h3>
          </div>
          <p>Connect with fellow donors and share stories on January 5 at our headquarters. Let’s celebrate our impact!</p>
          <button className="event-btn">Register Now</button>
        </div>
        <div className="event">
          <div className="header">
            <div className="badge">Feb 1</div>
            <h3>Volunteer Outreach Program</h3>
          </div>
          <p>Become a volunteer at our upcoming events and help organize drives in your local community.</p>
          <button className="event-btn">Register Now</button>
        </div>
      </div>
    </div>
  );
};

export default Events;
