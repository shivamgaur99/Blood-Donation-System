import React from "react";
import { Link } from "react-router-dom"; 
import "./join-us.css"; 

const JoinUs = () => {
  return (
    <div className="join-us-page">
      <section className="call-to-action">
        <h2>Join Us Today!</h2>
        <p>
          Become a donor today and help us save lives. It only takes a small
          part of your time to make a big difference.
        </p>
        {/* <button className="cta-button">Sign Up to Donate</button> */}             
        {/* Navigation Link */}
        <Link to="/join-us" style={{ textDecoration: "none" }}>
        <button className="join-us-button primary">Join Now</button>
        </Link>
      </section>
    </div>
  );
};

export default JoinUs;
