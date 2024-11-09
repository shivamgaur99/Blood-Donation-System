import React from 'react';
import './impact-stats.css'; 

const ImpactStats = () => {
  return (
    <section className="impact-stats">
      <h2>Our Impact</h2>
      <p>Since our founding, our community has made a difference in countless lives.</p>

      <div className="stats">
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
    </section>
  );
};

export default ImpactStats;
