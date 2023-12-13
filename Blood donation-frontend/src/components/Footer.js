import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5">
      <Container fluid >
        <Row className="py-5">
          <Col md={4}>
            <h4>About Us</h4>
            <p>
              We are dedicated to saving lives through voluntary blood donation.
              Join us in making a difference.
            </p>
          </Col>
          <Col md={4}>
            <h4>Contact Us</h4>
            <ul className="list-unstyled">
              <li>123 Main Street</li>
              <li>City, State, Zip Code</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@example.com</li>
            </ul>
          </Col>
          <Col md={4}>
            <h4>Follow Us</h4>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="#">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="text-center py-3">
        <p>
          &copy; {new Date().getFullYear()} Blood Donation System. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
