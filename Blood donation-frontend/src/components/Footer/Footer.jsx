import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-bottom">
          <div className="row">
            <div className="col-md-6 col-lg-3 about-footer">
              <h3>Blood Donor</h3>
              <ul>
                <li>
                <a href="tel:+919876543210">
                  <i className="fas fa-phone fa-flip-horizontal"></i>+91 98765 43210
                </a>
                </li>
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  b-52, Noida
                  <br />
                  Gautam Buddha Nagar
                  <br />
                  201301, India
                </li>
              </ul>
            </div>

            <div className="col-md-6 col-lg-2 page-more-info">
              <div className="footer-title">
                <h4>Page links</h4>
              </div>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/about-us">About Us</a>
                </li>
                <li>
                  <a href="/events">Events</a>
                </li>
                <li>
                  <a href="/contact-us">Contact Us</a>
                </li>
              </ul>
            </div>

            <div className="col-md-6 col-lg-3 page-more-info">
              <div className="footer-title">
                <h4>More Info</h4>
              </div>
              <ul>
                <li>
                  <a href="/privacy-policy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms">Terms and Conditions</a>
                </li>
                <li>
                  <a href="/get-involved">Get Involved</a>
                </li>
              </ul>
            </div>

            <div className="col-md-6 col-lg-4 open-hours">
              <div className="footer-title">
                <h4>Open hours</h4>
                <ul className="footer-social">
                  <li>
                    <a href="#" target="_blank" rel="noreferrer">
                      <i className="fab fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" rel="noreferrer">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" rel="noreferrer">
                      <i className="fab fa-github"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" rel="noreferrer">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank" rel="noreferrer">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <i className="far fa-clock"></i>Monday - Thursday
                    </td>
                    <td>9:00am - 5:00pm</td>
                  </tr>
                  <tr>
                    <td>
                      <i className="far fa-clock"></i>Friday
                    </td>
                    <td>9:00am - 4:00pm</td>
                  </tr>
                  <tr>
                    <td>
                      <i className="far fa-clock"></i>Saturday
                    </td>
                    <td>9:00am - 1:30pm</td>
                  </tr>
                  <tr>
                    <td>
                      <i className="far fa-clock"></i>Sunday
                    </td>
                    <td>9:30am - 12:00pm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <hr />
        <div className="footer-bottom">
          <div className="row">
            <div className="col-sm-8">
              <p>
                &copy; {new Date().getFullYear()} Blood Donation System. All
                rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
