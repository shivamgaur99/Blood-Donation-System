import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Toggle from "../util/Toggle/Toggle";
import "./navbar.css";

export const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [Role, setRole] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const closeMobileMenu = () => setIsNavOpen(false);

  const checkAuthentication = () => {
    const user = localStorage.getItem("LoggedIn");
    const role = localStorage.getItem("Role");
    const isAuthenticated = user ? true : false;

    setLoggedIn(isAuthenticated);
    setRole(role);
    setUsername(localStorage.getItem("Username"));
  };

  const handleLogout = () => {
    // localStorage.removeItem('jwtToken');
    // Clear the token from localStorage
    localStorage.clear();
    // Redirect to login page
    window.location.href = "/login";
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevState) => {
      const newTheme = !prevState ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return !prevState;
    });
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <Fragment>
      <nav className={`${"navbar-div"} ${isDarkMode ? "navbar-div-dark" : ""}`}>
        {/* Logo */}
        <NavLink to="/" className={"navbar-logo"}>
          <img
            src="logo2.png"
            alt="logo"
            // width="65px"
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
              ? `${"nav-menu"} ${"active"} ${isDarkMode ? "nav-menu-dark" : ""}`
              : `${"nav-menu"} ${isDarkMode ? "nav-menu-dark" : ""}`
          }
        >
          <li className={isDarkMode ? "nav-item-dark" : "nav-item"}>
            <NavLink
              activeClassName={"active-link"}
              to="/"
              className={({ isActive }) =>
                `${isActive ? (isDarkMode ? "active-link-dark" : "active-link") : ""} ${
                  isDarkMode ? "nav-links-dark" : "nav-links"
                }`
              }
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>
          </li>

          <li className={isDarkMode ? "nav-item-dark" : "nav-item"}>
            <NavLink
              activeClassName={"active-link"}
              to="/about-us"
              className={({ isActive }) =>
                `${isActive ? (isDarkMode ? "active-link-dark" : "active-link") : ""} ${
                  isDarkMode ? "nav-links-dark" : "nav-links"
                }`
              }
              onClick={closeMobileMenu}
            >
              About Us
            </NavLink>
          </li>

          <li className={isDarkMode ? "nav-item-dark" : "nav-item"}>
            <NavLink
              activeClassName={"active-link"}
              to="/contact-us"
              className={({ isActive }) =>
                `${isActive ? (isDarkMode ? "active-link-dark" : "active-link") : ""} ${
                  isDarkMode ? "nav-links-dark" : "nav-links"
                }`
              }
              onClick={closeMobileMenu}
            >
              Contact Us
            </NavLink>
          </li>

          {Role === "admin" && (
            <li className={isDarkMode ? "nav-item-dark" : "nav-item"}>
              <NavLink
                activeClassName={"active-link"}
                to="/admin-dashboard"
                className={({ isActive }) =>
                  `${isActive ? (isDarkMode ? "active-link-dark" : "active-link") : ""} ${
                    isDarkMode ? "nav-links-dark" : "nav-links"
                  }`
                }
                onClick={closeMobileMenu}
              >
                Admin Dashboard
              </NavLink>
            </li>
          )}

          {Role === "user" && (
            <li className={isDarkMode ? "nav-item-dark" : "nav-item"}>
              <NavLink
                activeClassName={"active-link"}
                to="/user-dashboard"
                className={({ isActive }) =>
                  `${isActive ? (isDarkMode ? "active-link-dark" : "active-link") : ""} ${
                    isDarkMode ? "nav-links-dark" : "nav-links"
                  }`
                }
                onClick={closeMobileMenu}
              >
                User Dashboard
              </NavLink>
            </li>
          )}

          {/* <li className={isDarkMode ? "nav-item-dark" : "nav-item"}>
            <Link
              to="/admin"
              className={isDarkMode ? "nav-links-mobile-dark" : "nav-links-mobile"}
              onClick={closeMobileMenu}
            >
              Admin ?
            </Link>
          </li> */}

          {loggedIn ? (
            <li className={isDarkMode ? "nav-item-dark" : "nav-item"}>
              <Link
                to="/login"
                className={
                  isDarkMode ? "nav-links-mobile-dark" : "nav-links-mobile"
                }
                onClick={handleLogout}
              >
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li className={isDarkMode ? "nav-item-dark" : "nav-item"}>
                <Link
                  to="/register"
                  className={
                    isDarkMode ? "nav-links-mobile-dark" : "nav-links-mobile"
                  }
                  onClick={closeMobileMenu}
                >
                  Sing Up
                </Link>
              </li>
              <li className={isDarkMode ? "nav-item-dark" : "nav-item"}>
                <Link
                  to="/login"
                  className={
                    isDarkMode ? "nav-links-mobile-dark" : "nav-links-mobile"
                  }
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
            </>
          )}
          <div onClick={closeMobileMenu} className={"nav-links-toggle"}>
            <Toggle
              isChecked={isDarkMode}
              handleToggleChange={toggleDarkMode}
            />
          </div>
        </ul>

        {/* Admin Button */}
        {/* <NavLink
          to="/admin"
            activeClassName={"button-div"}
              className={({ isActive }) =>
                `${isActive ? (isDarkMode ? "button-div-dark" : "button-div") : ""} ${isActive ? "" : ""} ${
                  isDarkMode ? "nav-admin-button-dark" : "nav-admin-button"
                }`
              }
        >
          Admin ?
        </NavLink> */}

        {loggedIn ? (
          <NavLink
            to="/login"
            activeClassName={"button-div"}
            className={({ isActive }) =>
              `${isActive ? (isDarkMode ? "button-div-dark" : "button-div") : ""} ${isActive ? "" : ""} ${
                isDarkMode ? "nav-admin-button-dark" : "nav-admin-button"
              }`
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
                `${isActive ? (isDarkMode ? "button-div-dark" : "button-div") : ""} ${isActive ? "" : ""} ${
                  isDarkMode ? "nav-admin-button-dark" : "nav-admin-button"
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              activeClassName={"button-div"}
              className={({ isActive }) =>
                `${isActive ? (isDarkMode ? "button-div-dark" : "button-div") : ""} ${isActive ? "" : ""} ${
                  isDarkMode ? "nav-admin-button-dark" : "nav-admin-button"
                }`
              }
            >
              Sign Up
            </NavLink>
          </>
        )}

        {/* Dark Mode Toggle Button */}
        <div className={"nav-toggle"}>
          <Toggle isChecked={isDarkMode} handleToggleChange={toggleDarkMode} />
        </div>
      </nav>
    </Fragment>
  );
};
