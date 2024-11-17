import React, { useState, useRef } from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { SimpleToast } from "../../components/util/Toast/Toast"; 
import { END_POINT } from "../../config/api";
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

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isFormValid()) {
      const data = {
        email: credential.email,
        password: credential.password,
      };

      fetch(`${END_POINT}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) =>
          response
            .json()
            .then((res) => {
              if (response.status === 200 && res.token) {
                showToast("Login successful!", "success"); // Updated to use showToast
                localStorage.setItem("email", res.email);
                localStorage.setItem("jwtToken", res.token);
                localStorage.setItem("LoggedIn", "true");
                localStorage.setItem("Role", "user");
                window.location.href = "/user-dashboard";
              } else {
                showToast("Invalid credentials!", "error"); // Updated to use showToast
              }
            })
            .catch((err) => {
              showToast("Backend error, please try again later.", "error"); // Updated to use showToast
              console.error(err);
            })
        )
        .catch((err) => {
          showToast("Network error, please check your connection.", "error"); // Updated to use showToast
          console.error("must be a backend problem🤔:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const loginAdmin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isFormValid()) {
      const data = {
        email: credential.email,
        password: credential.password,
      };

      fetch(`${END_POINT}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) =>
          response
            .json()
            .then((res) => {
              if (response.status === 200 && res.token) {
                showToast("Login successful!", "success"); // Updated to use showToast
                localStorage.setItem("email", res.email);
                localStorage.setItem("jwtToken", res.token);
                localStorage.setItem("LoggedIn", "true");
                localStorage.setItem("Role", "admin");
                window.location.href = "/admin-dashboard";
              } else {
                showToast("Invalid credentials!", "error"); // Updated to use showToast
              }
            })
            .catch((err) => {
              showToast("Backend error, please try again later.", "error"); // Updated to use showToast
              console.error(err);
            })
        )
        .catch((err) => {
          showToast("Network error, please check your connection.", "error"); // Updated to use showToast
          console.error("must be a backend problem🤔:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
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
                      id="btn"
                      type="submit"
                      className="submit-btn primary"
                      onClick={loginUser}
                    >
                      Login as User
                    </button>
                    <button
                      id="btn"
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
