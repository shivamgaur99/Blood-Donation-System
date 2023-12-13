import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

function Cards() {
  return (
    <Container>
      <h2>About Us</h2>
      <Row className="justify-content-center">
        <Col md={4}>
          <Card>
            <Card.Img
              variant="top"
              src="nikhil.jpg"
              style={{ width: "24vh" }}
            />
            <Card.Body>
              <Card.Title>Nikhil</Card.Title>
              <Card.Text>Ceo of Blood Donor</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="shivam.jpg" />
            <Card.Body>
              <Card.Title>Shivam Gaur</Card.Title>
              <Card.Text>Co Founder Of Blood Donor</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img
              variant="top"
              src="roshan.jpg"
              style={{ width: "22vh" }}
            />
            <Card.Body>
              <Card.Title>Roshan</Card.Title>
              <Card.Text>Ceo of Blood Donor</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Cards;
