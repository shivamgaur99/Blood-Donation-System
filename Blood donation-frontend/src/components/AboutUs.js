import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./aboutus.css";

function AboutUs() {
  return (
    <div>
      <main className="about-us">
        {/* Hero Section */}
        {/* <section className="hero">
          <Container className="text-center">
            <h1>About Us</h1>
            <p className="hero-text">
              Saving lives through the power of voluntary blood donation.
            </p>
          </Container>
        </section> */}

        {/* About Section */}
        {/* <section className="about-section">
          <Container>
            <Row className="align-items-center">
              <Col md={12} className="about-content">
                <p>
                  We are a passionate team dedicated to ensuring a sustainable
                  and reliable blood supply for those in need. Our mission is to
                  connect blood donors with patients, hospitals, and blood banks
                  seamlessly.
                </p>
                <p>
                  By donating blood, you have the power to make a difference in
                  someone's life. Join us in this noble cause and help save
                  lives, support medical treatments, and strengthen our
                  community.
                </p>
              </Col>
            </Row>
          </Container>
        </section> */}

        {/* Mission Section */}
        <section className="mission-section">
        <Container className="text-center">
            <h1>About Us</h1>
            <p className="hero-text">
              Saving lives through the power of voluntary blood donation.
            </p>
          </Container>
          <Container>
          <img
                  src="aboutus.jpg"
                  alt="Blood Donation"
                  className="about-us-image"
                />
            <h2 className="text-center">Our Mission</h2>
            <p className="mission-text text-center">
              Our mission is to create awareness about blood donation and make
              it accessible to everyone in need.
            </p>
            <Row className="mission-container">
              <Col md={4}>
                <Card className="mission-card">
                  <Card.Body>
                    <Card.Title>Safe Blood Supply</Card.Title>
                    <Card.Text>
                      Ensure a steady and safe supply of blood for treatments
                      and emergencies.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mission-card">
                  <Card.Body>
                    <Card.Title>Public Education</Card.Title>
                    <Card.Text>
                      Educate the public on the importance of regular blood
                      donation.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mission-card">
                  <Card.Body>
                    <Card.Title>Connect Donors</Card.Title>
                    <Card.Text>
                      Facilitate connections between donors, hospitals, and
                      patients.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mission-card">
                  <Card.Body>
                    <Card.Title>Community Collaboration</Card.Title>
                    <Card.Text>
                      Partner with healthcare organizations and volunteers to
                      build a strong donation ecosystem.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mission-card">
                  <Card.Body>
                    <Card.Title>Altruistic Donation Culture</Card.Title>
                    <Card.Text>
                      Promote a culture of voluntary, altruistic blood donation.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </div>
  );
}

export default AboutUs;
