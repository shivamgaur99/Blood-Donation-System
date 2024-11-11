import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  // NavDropdown,
} from "react-bootstrap";

function NavScrollExample() {
  const [scroll, setScroll] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Managing login state here
  const [username, setUsername] = useState(""); // State to hold the username
  const [Role, setRole] = useState("");
  // const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication(); // Call checkAuthentication on mount
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const checkAuthentication = () => {
    const user = localStorage.getItem("LoggedIn");
    const role = localStorage.getItem("Role");
    const isAuthenticated = user ? true : false; // Convert to boolean

    setLoggedIn(isAuthenticated);
    setRole(role);
  };

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.clear();
    // navigate("/login");
    window.location.href = "/login";
  };

  // const checkAuthentication = () => {
  //   const user = localStorage.getItem("username");

  //   // Check if a username exists in local storage
  //   const isAuthenticated = !!user;

  //   setLoggedIn(isAuthenticated);
  //   setUsername(user || ''); // Set the username, if available
  // };

  // const handleLogout = async () => {
  //   try {
  //     await axios.delete("http://localhost:8181/logout");
  //     localStorage.removeItem("token"); // Clear token
  //     localStorage.removeItem("username"); // Clear username

  //     setLoggedIn(false); // Update loggedIn state
  //     setUsername(""); // Clear username state if necessary

  //     // Redirect the user to the login page or any other appropriate page
  //     navigate("/login");
  //   } catch (error) {
  //     console.error("Error occurred while logging out:", error);
  //     // Handle error or show a message to the user
  //   }
  // };

  // const checkAuthentication = () => {
  //   const user = localStorage.getItem("username");

  //   // Check if a username exists in local storage
  //   const isAuthenticated = !!user;

  //   setLoggedIn(isAuthenticated);
  //   setUsername(user || ''); // Set the username, if available
  // };

  // const handleLogout = async () => {
  //   try {
  //     await axios.delete("http://localhost:8181/logout");
  //     localStorage.removeItem("token"); // Clear token
  //     localStorage.removeItem("username"); // Clear username

  //     setLoggedIn(false); // Update loggedIn state
  //     setUsername(""); // Clear username state if necessary

  //     // Redirect the user to the login page or any other appropriate page
  //     navigate("/login");
  //   } catch (error) {
  //     console.error("Error occurred while logging out:", error);
  //     // Handle error or show a message to the user
  //   }
  // };

  return (
    <Navbar
      expand="lg"
      className={`${scroll ? "navbar-dark bg-primary" : "navbar-light"}`}
      sticky="top"
    >
      <Container fluid>
        <Navbar.Brand href="/home" className="d-flex ms-5">
          <img src="logo.png" height={50} alt="Logo" />
          {/* <h1 className="mx-2">Blood Donation System</h1> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {/* <Nav.Link href="/home">
              <h5 style={{ fontFamily: "monoBrush Scriptspace", color: "red" }} className="mx-2">
                Blood Donation System
              </h5>
            </Nav.Link> */}
            <Nav.Link href="/contact-us">
              <h5
                style={{ fontFamily: "monoBrush Scriptspace", color: "red" }}
                className="mx-2"
              >
                ContactUs
              </h5>
            </Nav.Link>

            {/* <NavDropdown title="New Donor" id="navbarScrollingDropdown">
              <NavDropdown.Item href="add-donor">Donate Blood</NavDropdown.Item>
              <NavDropdown.Item href="update-donor/:id">
                Update
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="donors">Donors Details</NavDropdown.Item>
            </NavDropdown> */}
            <Nav.Link href="/about-us">
              <h5
                style={{ fontFamily: "monoBrush Scriptspace", color: "red" }}
                className="mx-2"
              >
                AboutUs
              </h5>
            </Nav.Link>

            {Role === "admin" && (
              <Nav.Link href="/admin-dashboard">
                <h5
                  style={{ fontFamily: "monoBrush Scriptspace", color: "red" }}
                  className="mx-2"
                >
                  AdminDashboard
                </h5>
              </Nav.Link>
            )}
            {Role === "user" && (
              <Nav.Link href="/user-dashboard">
                <h5
                  style={{ fontFamily: "monoBrush Scriptspace", color: "red" }}
                  className="mx-2"
                >
                  UserDashboard
                </h5>
              </Nav.Link>
            )}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button className="me-5" variant="outline-success">
              Search
            </Button>
          </Form>

          {/* <a href="/register" className="me-2">
            <Button variant="outline-danger">SignUp</Button>
          </a>{" "}
          <a href="/login" className="me-5">
            <Button variant="outline-danger">Login</Button>
          </a>{" "} */}

          {loggedIn ? (
            <div className="d-flex align-items-center">
              <span className="me-3">Welcome {username}</span>
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <>
              <a href="/register" className="me-2">
                <Button variant="outline-danger">SignUp</Button>
              </a>{" "}
              <a href="/login" className="me-5">
                <Button variant="outline-danger">Login</Button>
              </a>{" "}
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
