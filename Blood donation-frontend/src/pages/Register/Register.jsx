import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      username === "" ||
      email === "" ||
      age === "" ||
      bloodGroup === "" ||
      gender === "" ||
      mobile === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length <= 6) {
      setError("Password must be more than 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const payload = {
      username: username,
      email: email,
      age: age,
      bloodgroup: bloodGroup,
      gender: gender,
      mobile: mobile,
      password: password
    };

    axios
      .post("http://localhost:8181/register", payload)
      .then((response) => {
        if (response.status === 200) {
          setSuccess("Registration Successful");
          setError("");
          navigate("/login");
        } else {
          setError("Registration failed: " + response.data.error);
          setSuccess("");
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const { data } = error.response;
          if (data.error === "duplicate_email") {
            setError("Registration failed: Email already exists");
          } else {
            setError("Registration failed: " + error.response.data);
          }
        } else {
          setError("Registration failed. Please try again later.");
        }
        setSuccess("");
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="text-center mb-4">Registration</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form id="registrationForm" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Blood Group</Form.Label>
              <Form.Control
                as="select"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                required
              >
              <option value="">Select</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select</option>
                
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;

