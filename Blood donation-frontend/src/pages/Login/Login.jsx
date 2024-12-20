import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"; // Hook to dispatch Redux actions
import * as Yup from "yup";
import { SimpleToast } from "../../components/util/Toast/Toast";
import { useToast } from "../../services/toastService";
import Loader from "../../components/util/Loader";
import { END_POINT } from "../../config/api";
import axios from "axios";
import "./login.css";
import { login } from "../../store/actions/actions";

function Login(props)  {
  const [hidePassword, setHidePassword] = useState(false);
  const passwordInput = useRef("password");
  const schema = { email: "", password: "", keepMeLoggedIn: false };
  const [credential, setCredential] = useState(schema);
  const dark = props.theme;
  const [errorObj, setErrorObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { toast, showToast, hideToast } = useToast();

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    keepMeLoggedIn: Yup.boolean(),
  });

  const isFormValid = async () => {
    try {
      await validationSchema.validate(credential, { abortEarly: false });
      return true;
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setErrorObj(errors);
      return false;
    }
  };

  const validateField = async (input) => {
    const { name, value } = input;
    try {
      await validationSchema.validateAt(name, { [name]: value });
      return null;
    } catch (err) {
      return err.message;
    }
  };

  const handleChange = async (e) => {
    const { currentTarget: input } = e;
    const errors = { ...errorObj };
    const errorMessage = await validateField(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    setCredential({ ...credential, [input.name]: input.value });
    setErrorObj(errors);
  };

  const dispatch = useDispatch();

  const loginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (await isFormValid()) {
      const data = {
        email: credential.email,
        password: credential.password,
      };

      try {
        const response = await axios.post(`${END_POINT}/auth/login`, data, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        if (response.status === 200) {
          const { accessToken, email, role } = response.data;

          if (accessToken) {
            localStorage.setItem("email", email);
            localStorage.setItem("jwtToken", accessToken);
            localStorage.setItem("LoggedIn", "true");

            if (role && Array.isArray(role) && role.length > 0) {
              const roleValues = role.map((r) =>
                r.authority.replace("ROLE_", "")
              );

              localStorage.setItem("Roles", roleValues.join(","));
            } else {
              showToast("No valid role found.", "error");
            }

            dispatch(login(accessToken));

            showToast("Login successful!", "success");

            const roles = localStorage.getItem("Roles");

            if (roles) {
              const roleArray = roles.split(",");
              if (
                roleArray.includes("admin") ||
                roleArray.includes("superAdmin")
              ) {
                window.location.href = "/admin-dashboard";
              } else {
                window.location.href = "/user-dashboard";
              }
            } else {
              showToast("No valid roles found.", "error");
            }
          } else {
            showToast("Invalid server response. Please try again.", "error");
          }
        }
      } catch (err) {
        if (err.response) {
          const errorMessage =
            err.response.data || "Login failed. Please try again.";
          showToast(errorMessage, "error");
          console.error("Backend error:", err.response.data);
        } else if (err.request) {
          showToast("Network error. Please check your connection.", "error");
          console.error("Network error:", err.request);
        } else {
          showToast("An unexpected error occurred. Please try again.", "error");
          console.error("Error:", err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  hidePassword
    ? (passwordInput.current = "text")
    : (passwordInput.current = "password");

  return (
    <>
      <div
        className={
          dark
            ? "login-section login-section-dark"
            : "login-section login-section-light"
        }
      >
        <div className="login-parent">
          <div className="login-child child1">
            <img
              src="/images/login1.png"
              alt="login-illustration"
              className="login-image"
            />
          </div>
          <div className="login-child child2">
            <div
              className={
                dark
                  ? "login-card login-card-dark"
                  : "login-card login-card-light"
              }
            >
              <h1
                className={
                  dark
                    ? "card-heading card-heading-dark"
                    : "card-heading card-heading-light"
                }
              >
                Welcome Back
              </h1>
              <form onSubmit={loginUser} noValidate>
                <div className="inside-contact">
                  <div
                    className={
                      dark
                        ? "login-input login-input-dark"
                        : "login-input login-input-light"
                    }
                  >
                    <input
                      autoFocus="on"
                      autoComplete="off"
                      id="username"
                      type="email"
                      name="email"
                      placeholder="Username"
                      onChange={handleChange}
                      className={
                        dark
                          ? "input-login-dark input-login"
                          : "input-login-light input-login"
                      }
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
                    className={
                      dark
                        ? "login-input login-input-dark"
                        : "login-input login-input-light"
                    }
                  >
                    <input
                      id="password"
                      name="password"
                      placeholder="Password"
                      className={
                        dark
                          ? "input-login-dark input-login"
                          : "input-login-light input-login"
                      }
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
                      style={{ paddingLeft: "50px", paddingRight: "50px" }}
                      onClick={loginUser}
                    >
                      Login
                    </button>
                  </div>
                  <Link
                    to="#"
                    style={{
                      textAlign: "center",
                      color: dark ? "gray" : "blue",
                      // textDecorationColor: dark ? "gray" : "blue",
                      textDecoration: "none",
                    }}
                  >
                    <p>Forgot your password?</p>
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
