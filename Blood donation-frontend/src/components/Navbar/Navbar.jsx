import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Toggle from "../util/Toggle/Toggle";
import Swal from "sweetalert2";
import "./navbar.css";
import { useToast } from "../../services/toastService";
import { SimpleToast } from "../util/Toast/Toast";
import { logoutUser } from "../../utils/authUtils";

export const Navbar = (props) => {
  const dark = props.theme;
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState("");

  const { toast, showToast, hideToast } = useToast();

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const closeMobileMenu = () => setIsNavOpen(false);

  const checkAuthentication = () => {
    const user = localStorage.getItem("LoggedIn");
    const roles = localStorage.getItem("Roles");
    const isAuthenticated = user ? true : false;

    setLoggedIn(isAuthenticated);
    setRoles(roles);
    setUsername(localStorage.getItem("Username"));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Log Out",
      text: "Are you sure you want to log out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser(dispatch, navigate);
        showToast("You have successfully logged out.", "success");
      }
    });
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const hasRole = (role) => roles && roles.split(",").includes(role);

  return (
    <Fragment>
      <nav className={`${"navbar-div"} ${dark ? "navbar-div-dark" : ""}`}>
        {/* Logo */}
        <NavLink to="/" className={"navbar-logo"}>
          <img
            src="logo2.png"
            alt="logo"
            height="25px"
          />
        </NavLink>

        {/* Mobile Menu Icon */}
        <div className={"menu-icon"} onClick={toggleNav}>
          <i className={isNavOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </div>

        {/* Navbar Links */}
        <ul
          className={
            isNavOpen
              ? `${"nav-menu"} ${"active"} ${dark ? "nav-menu-dark" : ""}`
              : `${"nav-menu"} ${dark ? "nav-menu-dark" : ""}`
          }
        >
          <li className={dark ? "nav-item-dark" : "nav-item"}>
            <NavLink
              activeClassName={"active-link"}
              to="/"
              className={({ isActive }) =>
                `${
                  isActive ? (dark ? "active-link-dark" : "active-link") : ""
                } ${dark ? "nav-links-dark" : "nav-links"}`
              }
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>
          </li>

          <li className={dark ? "nav-item-dark" : "nav-item"}>
            <NavLink
              activeClassName={"active-link"}
              to="/about-us"
              className={({ isActive }) =>
                `${
                  isActive ? (dark ? "active-link-dark" : "active-link") : ""
                } ${dark ? "nav-links-dark" : "nav-links"}`
              }
              onClick={closeMobileMenu}
            >
              About Us
            </NavLink>
          </li>

          <li className={dark ? "nav-item-dark" : "nav-item"}>
            <NavLink
              activeClassName={"active-link"}
              to="/contact-us"
              className={({ isActive }) =>
                `${
                  isActive ? (dark ? "active-link-dark" : "active-link") : ""
                } ${dark ? "nav-links-dark" : "nav-links"}`
              }
              onClick={closeMobileMenu}
            >
              Contact Us
            </NavLink>
          </li>

          <li className={dark ? "nav-item-dark" : "nav-item"}>
            <NavLink
              activeClassName={"active-link"}
              to="/events"
              className={({ isActive }) =>
                `${
                  isActive ? (dark ? "active-link-dark" : "active-link") : ""
                } ${dark ? "nav-links-dark" : "nav-links"}`
              }
              onClick={closeMobileMenu}
            >
              Events & Drives
            </NavLink>
          </li>

          {/* Admin Dashboard Link */}
          {hasRole("admin") && (
            <li className={dark ? "nav-item-dark" : "nav-item"}>
              <NavLink
                activeClassName={"active-link"}
                to="/admin-dashboard"
                className={({ isActive }) =>
                  `${
                    isActive ? (dark ? "active-link-dark" : "active-link") : ""
                  } ${dark ? "nav-links-dark" : "nav-links"}`
                }
                onClick={closeMobileMenu}
              >
                Admin Dashboard
              </NavLink>
            </li>
          )}

          {/* Superadmin Dashboard Link */}
          {hasRole("superAdmin") && (
            <li className={dark ? "nav-item-dark" : "nav-item"}>
              <NavLink
                activeClassName={"active-link"}
                to="/admin-dashboard"
                className={({ isActive }) =>
                  `${
                    isActive ? (dark ? "active-link-dark" : "active-link") : ""
                  } ${dark ? "nav-links-dark" : "nav-links"}`
                }
                onClick={closeMobileMenu}
              >
                Admin Dashboard
              </NavLink>
            </li>
          )}

          {/* User Dashboard Link */}
          {hasRole("user") && (
            <li className={dark ? "nav-item-dark" : "nav-item"}>
              <NavLink
                activeClassName={"active-link"}
                to="/user-dashboard"
                className={({ isActive }) =>
                  `${
                    isActive ? (dark ? "active-link-dark" : "active-link") : ""
                  } ${dark ? "nav-links-dark" : "nav-links"}`
                }
                onClick={closeMobileMenu}
              >
                User Dashboard
              </NavLink>
            </li>
          )}

          {loggedIn ? (
            <li className={dark ? "nav-item-dark" : "nav-item"}>
              <Link
                to="#"
                className={dark ? "nav-links-mobile-dark" : "nav-links-mobile"}
                onClick={handleLogout}
              >
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li className={dark ? "nav-item-dark" : "nav-item"}>
                <Link
                  to="/register"
                  className={
                    dark ? "nav-links-mobile-dark" : "nav-links-mobile"
                  }
                  onClick={closeMobileMenu}
                >
                  Sing Up
                </Link>
              </li>
              <li className={dark ? "nav-item-dark" : "nav-item"}>
                <Link
                  to="/login"
                  className={
                    dark ? "nav-links-mobile-dark" : "nav-links-mobile"
                  }
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
            </>
          )}
          <div onClick={closeMobileMenu} className={"nav-links-toggle"}>
            <Toggle handleClick={props.handleClick} theme={props.theme} />
          </div>
        </ul>

        {loggedIn ? (
          <NavLink
            to="#"
            activeClassName={"button-div"}
            className={({ isActive }) =>
              `${isActive ? (dark ? "button-div-dark" : "button-div") : ""} ${
                isActive ? "" : ""
              } ${dark ? "nav-admin-button-dark" : "nav-admin-button"}`
            }
            onClick={handleLogout}
          >
            Logout
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/login"
              activeClassName={"button-div"}
              className={({ isActive }) =>
                `${isActive ? (dark ? "button-div-dark" : "button-div") : ""} ${
                  isActive ? "" : ""
                } ${dark ? "nav-admin-button-dark" : "nav-admin-button"}`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              activeClassName={"button-div"}
              className={({ isActive }) =>
                `${isActive ? (dark ? "button-div-dark" : "button-div") : ""} ${
                  isActive ? "" : ""
                } ${dark ? "nav-admin-button-dark" : "nav-admin-button"}`
              }
            >
              SignUp
            </NavLink>
          </>
        )}

        <div className={"nav-toggle"}>
          <Toggle handleClick={props.handleClick} theme={props.theme} />
        </div>
      </nav>
      <SimpleToast
        open={toast.open}
        severity={toast.severity}
        message={toast.message}
        handleCloseToast={hideToast}
      />
    </Fragment>
  );
};
