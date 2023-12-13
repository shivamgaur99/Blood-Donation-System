import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./aboutus.css";
import Cards from "./Cards";

function AboutUs() {
  return (
    <div>
      <main className="about-us">
        <section className="hero">
          <Container>
            <img
              src="https://img.freepik.com/free-vector/illustration-business-people_53876-5879.jpg?size=626&ext=jpg&ga=GA1.2.2138836995.1688756964&semt=ais"
              alt="About Us"
              height={100}
            />
            <Row>
              {/* <Col md={6}>
             
              </Col> */}
              <Col md={6}>
                <h2>About Us</h2>
                <p>
                  Welcome to Blood Donation, a platform dedicated to saving
                  lives through voluntary blood donation. We are a passionate
                  team of individuals committed to ensuring a sustainable and
                  reliable blood supply for those in need. Our mission is to
                  connect blood donors with patients, hospitals, and blood banks
                  in a seamless and efficient manner.
                </p>
                <p>
                  At Blood Donation, we believe that every blood donation has
                  the power to make a difference in someone's life. By giving
                  blood, you can help save lives, support medical treatments,
                  and contribute to the well-being of your community. We
                  encourage individuals from all walks of life to join us in
                  this noble cause.
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="mission">
          <Container>
            <Row>
              <Col>
                <h2>Our Mission</h2>
                <p>
                  Our mission is to create awareness about the importance of
                  blood donation and make it accessible to everyone in need. We
                  strive to:
                </p>
                <ul>
                  <li>
                    Ensure a steady and safe supply of blood for medical
                    treatments and emergencies.
                  </li>
                  <li>
                    Educate the public about the significance of regular blood
                    donation and its positive impact on health.
                  </li>
                  <li>
                    Facilitate the process of finding blood donors, connecting
                    them with hospitals and patients in real-time.
                  </li>
                  <li>
                    Collaborate with blood banks, healthcare organizations, and
                    volunteers to strengthen the blood donation ecosystem.
                  </li>
                  <li>
                    Promote a culture of voluntary and altruistic blood
                    donation.
                  </li>
                </ul>
              </Col>
              <Cards />
            </Row>
          </Container>
        </section>
      </main>
    </div>
  );
}

export default AboutUs;
