import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Home.css";

function Home() {
  return (
    <div>
      <main className="home">
        <section className="hero-section">
          <Container>
            <Row>
              <Col md={6} className="hero-text">
                <h1>Welcome to Blood Donation</h1>
                <p>
                  We are dedicated to saving lives through voluntary blood
                  donation. Join us in making a difference.
                </p>

                <a href="http://localhost:3000/add-donor">
                  {" "}
                  <Button variant="primary">Donate Now </Button>{" "}
                </a>
              </Col>
              <Col md={6} className="hero-image">
                <img
                  src="https://img.freepik.com/free-vector/blood-donation-symbol-with-hand-blood-bag_1308-111016.jpg?size=626&ext=jpg&ga=GA1.2.2138836995.1688756964&semt=ais"
                  alt="Hero"
                  className="img-fluid"
                />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="features-section">
          <Container>
            <Row>
              <Col md={4}>
                <div className="feature-item">
                  <i className="fas fa-heart"></i>
                  <h3>Save Lives</h3>
                  <p>
                    By donating blood, you can help save lives and support
                    medical treatments.
                  </p>
                </div>
              </Col>
              <Col md={4}>
                <div className="feature-item">
                  <i className="fas fa-users"></i>
                  <h3>Community</h3>
                  <p>
                    Join our blood donation community and make a positive impact
                    in your community.
                  </p>
                </div>
              </Col>
              <Col md={4}>
                <div className="feature-item">
                  <i className="fas fa-medkit"></i>
                  <h3>Health Benefits</h3>
                  <p>
                    Regular blood donation has numerous health benefits for the
                    donors.
                  </p>
                </div>
              </Col>
              <img src="heart.png" className="img-fluid" />
              <img src="aboutus.jpg" className="img-fluid" />
              <img src="email_footer.png" className="img-fluid" />
            </Row>
          </Container>
        </section>
      </main>
    </div>
  );
}

export default Home;
