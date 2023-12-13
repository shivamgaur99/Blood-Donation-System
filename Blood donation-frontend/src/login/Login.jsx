import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  //  const navigate = useNavigate();

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
      const response = await axios.post("http://localhost:8181/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        localStorage.setItem('LoggedIn', 'true');
        localStorage.setItem('Role', 'user');
        // alert("User login Successful")
        // Redirect the user to the home page
        // navigate("/userDashboard");
        window.location.href = '/userDashboard';
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

  const handleAdminLogin = () => {
    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin@12345";

    if (email.trim() === "" || password.trim() === "") {
      setLoginError("Email and password are required.");
      return;
    }

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem('LoggedIn', 'true');
      localStorage.setItem('Role', 'admin');
      // sessionStorage.setItem('isAdminLoggedIn', 'true');
      // alert("Admin Login Successful");
      // navigate("/adminDashboard");
      window.location.href = '/adminDashboard';
    } else {
      setLoginError("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
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

