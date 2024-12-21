import React from "react";
import "./about-us.css";
import Founder from "../../components/Founder/Founder";

const AboutUs = (props) => {
  let dark = props.theme;

  return (
    <div className="about-us">
      <div className={dark ? "about about-dark" : "about about-light"}>
        <div className="row">
          {/* <div className="col-lg-5">
            <h3>Who are we and what do we do?</h3>
            <div className={dark ? "dash dash-dark" : "dash dash-light"}></div>
            <h6 className={dark ? "text-d" : ""}>
              Connecting Lives, Saving Lives
            </h6>
          </div> */}
          <div className={dark ? "col-lg-7 text-d" : "col-lg-7"}>
            <p>
              Our Blood Donation Platform is dedicated to bridging the gap
              between blood donors and those in need. We believe in the power of
              community to save lives, and our platform is built to make the
              process of finding and donating blood as seamless as possible.
            </p>
            <p>
              Through this platform, we aim to:
              <br /> <br />
              🩸 Connect donors with those in urgent need of blood. <br />
              🩸 Provide information on local blood donation drives and events.{" "}
              <br />
              🩸 Encourage and educate people about the importance of regular
              blood donations. <br />
              🩸 Facilitate quick and easy communication between donors,
              recipients, and healthcare providers.
            </p>
            <p>
              Join our mission to make a difference. Together, we can save
              lives, one drop of blood at a time.
            </p>
          </div>
          <div className="col-lg-5">
              <img
                alt="about"
                src="/images/about-us.png"
                className="aboutus-img"
              />
          </div>
        </div>
      </div>

      <Founder theme={dark} />

       {/* Story Section */}
       <section className="story">
        <h2>Our Story</h2>
        <p>
          Founded with a commitment to saving lives, we started as a small group
          of volunteers passionate about making blood donations accessible to
          everyone in need. Today, we’re a growing community of donors,
          supporters, and heroes united by a simple goal: to provide hope and
          save lives through the gift of blood.
        </p>
        <button className="abt-us-btn secondary">
          Learn More About Our Journey
        </button>
      </section>
      
    </div>
  );
};

export default AboutUs;
