import React, { useState } from 'react';
import './get-involved.css';

const GetInvolved = (props) => {

  let dark = props.theme;


  return (
    <section className="overview">
        <div className="overview-content">
          <h2>Get Involved</h2>

          <p>
            There are many ways to help: volunteer, host a drive, or spread
            awareness.
            <br />
            Blood donations are essential to saving lives. Your contribution
            helps provide life-saving blood to those in need. Every drop counts,
            and your involvement can make a difference in countless lives. Join
            our mission to help others by volunteering, donating, and spreading
            awareness!
          </p>
          <div className="overview-buttons">
            <button className="cta-button primary">Get Involved</button>
            <button className="cta-button secondary">Volunteer with Us</button>
          </div>
        </div>
      </section>    
  );
};

export default GetInvolved;
