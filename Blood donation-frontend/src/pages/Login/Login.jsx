import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { END_POINT } from "../../config/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Handle User Login
  const handleUserLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      setLoginError("Email and password are required.");
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${END_POINT}/user/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 && response.data.token) {
        // Store token in localStorage
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("LoggedIn", "true");
        localStorage.setItem("Role", "user");

        // Redirect the user to the dashboard
        window.location.href = "/user-dashboard";
      } else {
        setLoginError("User Login failed");
      }
    } catch (error) {
      console.error("Error occurred while logging in:", error);
      if (error.response && error.response.status === 401) {
        setLoginError("Invalid credentials");
      } else {
        setLoginError("Login failed. Please try again later.");
      }
    }
  };

  // Handle Admin Login (Updated)
  const handleAdminLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      setLoginError("Email and password are required.");
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    try {
      // Sending request to admin login endpoint
      const response = await axios.post(`${END_POINT}/admin/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("LoggedIn", "true");
        localStorage.setItem("Role", "admin");

        // Redirect the admin to the admin dashboard
        window.location.href = "/admin-dashboard";
      } else {
        setLoginError("Admin Login failed");
      }
    } catch (error) {
      console.error("Error occurred while logging in:", error);
      if (error.response && error.response.status === 401) {
        setLoginError("Invalid credentials");
      } else {
        setLoginError("Login failed. Please try again later.");
      }
    }
  };

  return (
    <div className="container">
      <h1>Loginn</h1>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="button-group">
        <button
          type="button"
          className="btn btn-primary mt-3"
          onClick={handleUserLogin}
        >
          Login as User
        </button>
        <button
          type="button"
          className="btn btn-primary mt-3 ml-3"
          onClick={handleAdminLogin}
        >
          Login as Admin
        </button>
      </div>
      {loginError && <p className="text-danger">{loginError}</p>}
    </div>
  );
};

export default Login;
