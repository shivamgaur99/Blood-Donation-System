import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./ContactUs.css";

function ContactUs() {
  return (
    <div>
      <main className="contact-us">
        <section className="contact-section">
          <Container>
            <Row>
              <Col md={6}>
                <h2>Contact Us</h2>
                <Form>
                  <Form.Group controlId="name">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email address"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="message">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Enter your message"
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Send Message
                  </Button>
                </Form>
              </Col>
              <Col md={6}>
                <div className="contact-info">
                  <h3>Contact Information</h3>
                  <p>
                    <strong>Address:</strong> 123 Main Street, City, State, Zip
                    Code
                  </p>
                  <p>
                    <strong>Phone:</strong> (123) 456-7890
                  </p>
                  <p>
                    <strong>Email:</strong> info@example.com
                  </p>
                  <p>
                    <img src="email.png" className="img-fluid" />
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>

      <footer>{/* Insert your footer code here */}</footer>
    </div>
  );
}

export default ContactUs;
