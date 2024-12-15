import React from "react";
import "./mission.css";

const Mission = () => {
  return (
    <div>
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
      {/* Mission and Vision Section */}
      {/* <section className="mission-vision">
        <div className="vision">
          <h2>
            Our <br />
            Mission
          </h2>
          <p>
            To make blood donation accessible and rewarding, empowering
            individuals and communities to save lives with every drop.
          </p>
        </div>
        <div className="vision">
          <h2>
            Our <br />
            Vision
          </h2>
          <p>
            A world where blood is available to all who need it, with every
            community member engaged in the life-saving effort.
          </p>
        </div>
      </section> */}
    </div>
  );
};

export default Mission;
