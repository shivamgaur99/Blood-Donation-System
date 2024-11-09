import React from "react";
import "./mission.css";

const Mission = () => {
  return (
    <section className="mission">
      <div className="icon">
        <img src="images/mission.png" alt="Mission Icon" />
      </div>
      <h2>
        <i className="fas fa-crosshairs"></i>ur Mission
      </h2>
      <p>
        We are dedicated to saving lives by making blood donation accessible,
        safe, and rewarding. Together, we can create a healthier, more
        compassionate world.
      </p>
      <button className="mission-btn">Learn More</button>
    </section>
  );
};

export default Mission;
