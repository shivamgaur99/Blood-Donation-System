import React, { useState, useRef } from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { SimpleToast } from "../../components/util/Toast/Toast"; 
import { END_POINT } from "../../config/api";
import axios from 'axios';
import "./login.css";
import { useToast } from "../../services/toastService";

function Login(props) {
  const [hidePassword, setHidePassword] = useState(false);
  const passwordInput = useRef("password");
  const schema = { email: "", password: "" };
  const [credential, setCredential] = useState(schema);
  const dark = props.theme;
  const [errorObj, setErrorObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { toast, showToast, hideToast } = useToast();

  const validationSchema = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    keepMeLoggedIn: Joi.boolean(),
  };

  const isFormValid = () => {
    const check = Joi.validate(credential, validationSchema, {
      abortEarly: false,
    });
    if (!check.error) return true;
    const errors = {};
    check.error.details.map((item) => {
      if (!errors[item.path[0]]) errors[item.path[0]] = item.message;
      return 0;
    });
    setErrorObj(errors);
    return false;
  };

  const validateField = (input) => {
    const { name, value } = input;
    const obj = { [name]: value };
    const obj_schema = { [name]: validationSchema[name] };
    const result = Joi.validate(obj, obj_schema);

    return result.error ? result.error.details[0].message : null;
  };

  const handleChange = (e) => {
    const { currentTarget: input } = e;
    const errors = { ...errorObj };
    const errorMessage = validateField(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    setCredential({ ...credential, [e.target.name]: e.target.value });
    setErrorObj(errors);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    if (isFormValid()) {
      const data = {
        email: credential.email,
        password: credential.password,
      };
  
      try {
        // Make the login request
        const response = await axios.post(`${END_POINT}/auth/login`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.status === 200) {
          const { accessToken, refreshToken, email } = response.data;
  
          if (accessToken && refreshToken) {
            // Store tokens and user info in localStorage
            localStorage.setItem("email", email);
            localStorage.setItem("jwtToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("LoggedIn", "true");
            localStorage.setItem("Role", "user");
  
            showToast("Login successful!", "success");
            window.location.href = "/user-dashboard"; // Redirect after successful login
          } else {
            showToast("Invalid server response. Please try again.", "error");
          }
        }
      } catch (err) {
        if (err.response) {
          // Backend returned an error response
          const errorMessage = err.response.data || "Login failed. Please try again.";
          showToast(errorMessage, "error");
          console.error("Backend error:", err.response.data);
        } else if (err.request) {
          // Request made but no response received
          showToast("Network error. Please check your connection.", "error");
          console.error("Network error:", err.request);
        } else {
          // Something else caused the error
          showToast("An unexpected error occurred. Please try again.", "error");
          console.error("Error:", err.message);
        }
      } finally {
        setIsLoading(false); // Stop the loader regardless of success or failure
      }
    }
  };
  
  
  const loginAdmin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    if (isFormValid()) {
      const data = {
        email: credential.email,
        password: credential.password,
      };
  
      try {
        // Make the login request
        const response = await axios.post(`${END_POINT}/admin/login`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.status === 200) {
          const { accessToken, refreshToken, email } = response.data;
  
          if (accessToken && refreshToken) {
            // Store tokens and user info in localStorage
            localStorage.setItem("email", email);
            localStorage.setItem("jwtToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("LoggedIn", "true");
            localStorage.setItem("Role", "admin");
  
            showToast("Login successful!", "success");
            window.location.href = "/admin-dashboard"; // Redirect after successful login
          } else {
            showToast("Invalid server response. Please try again.", "error");
          }
        }
      } catch (err) {
        if (err.response) {
          // Backend returned an error response
          const errorMessage = err.response.data || "Login failed. Please try again.";
          showToast(errorMessage, "error");
          console.error("Backend error:", err.response.data);
        } else if (err.request) {
          // Request made but no response received
          showToast("Network error. Please check your connection.", "error");
          console.error("Network error:", err.request);
        } else {
          // Something else caused the error
          showToast("An unexpected error occurred. Please try again.", "error");
          console.error("Error:", err.message);
        }
      } finally {
        setIsLoading(false); // Stop the loader regardless of success or failure
      }
    }
  };
  

  hidePassword ? (passwordInput.current = "text") : (passwordInput.current = "password");

  return (
    <>
      <div
        className={
          dark ? "login-section login-section-dark" : "login-section login-section-light"
        }
      >
        <div className="login-parent">
          <div className="login-child child1">
            <img
              src="./images/login.png"
              alt="login-illustration"
              className="login-image"
            />
          </div>
          <div className="login-child child2">
            <div
              className={dark ? "login-card login-card-dark" : "login-card login-card-light"}
            >
              <h1
                className={dark ? "card-heading card-heading-dark" : "card-heading card-heading-light"}
              >
                Welcome Back
              </h1>
              <form onSubmit={loginUser} noValidate>
                <div className="inside-contact">
                  <div
                    className={dark ? "login-input login-input-dark" : "login-input login-input-light"}
                  >
                    <input
                      autoFocus="on"
                      autoComplete="off"
                      id="username"
                      type="email"
                      name="email"
                      placeholder="Username"
                      onChange={handleChange}
                      className={dark ? "input-login-dark input-login" : "input-login-light input-login"}
                    />
                    <i className="fas fa-user"></i>
                    <div className="validation">
                      {errorObj["email"] ? (
                        <div>* {errorObj["email"]}</div>
                      ) : (
                        <div>&nbsp; &nbsp;</div>
                      )}
                    </div>
                  </div>
                  <div
                    className={dark ? "login-input login-input-dark" : "login-input login-input-light"}
                  >
                    <input
                      id="password"
                      name="password"
                      placeholder="Password"
                      className={dark ? "input-login-dark input-login" : "input-login-light input-login"}
                      type={passwordInput.current}
                      onChange={handleChange}
                    />
                    <i
                      className={hidePassword ? "fa fa-eye" : "fa fa-eye-slash"}
                      onClick={() => setHidePassword(!hidePassword)}
                    ></i>
                    <div className="validation">
                      {errorObj["password"] ? (
                        <div>* {errorObj["password"]}</div>
                      ) : (
                        <div>&nbsp; &nbsp;</div>
                      )}
                    </div>
                  </div>
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      name="keepMeLoggedIn"
                      id="checkBox"
                      value={credential?.keepMeLoggedIn}
                      onChange={(e) => {
                        setCredential({
                          ...credential,
                          keepMeLoggedIn: e.target.checked,
                        });
                      }}
                    />
                    <label className="checkbox-label" htmlFor="checkBox">
                      Keep Me Logged In
                    </label>
                  </div>
                  <div className="submit-btns">
                    <button
                      type="submit"
                      className="submit-btn primary"
                      onClick={loginUser}
                    >
                      Login as User
                    </button>
                    <button
                       type="submit"
                      className="submit-btn secondary"
                      onClick={loginAdmin}
                    >
                      Login as Admin
                    </button>
                  </div>
                  <Link to="#">
                    <p
                      style={{
                        textAlign: "center",
                        color: dark ? "gray" : "blue",
                      }}
                    >
                      Forgot your password?
                    </p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Toast Component */}
      <SimpleToast
        open={toast.open}
        severity={toast.severity}
        message={toast.message}
        handleCloseToast={hideToast}
      />
    </>
  );
}

export default Login;
