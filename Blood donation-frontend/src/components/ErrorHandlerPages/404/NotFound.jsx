import React from "react";
import "./not-found.css";

export const NotFound = (props) => {
  const dark = props.theme;

  return (
    <main className={dark ? "main-dark" : "main"}>
      <div className={dark ? "not-found-dark" : "not-found"}>
        <div className="error">
          <div>
            <img
              className={dark ? "error-logo-dark" : "error-logo"}
              src={dark ? "/images/404error-dark.png" : "/images/404error.png"}
              alt="404 - Not Found"
            />
          </div>
          <p className={dark ? "error-text-dark" : "error-text"}>
            Oops! You seem to be lost.
          </p>
          <div className={dark ? "error-content-dark" : "error-content"}>
            Unfortunately, the page you're looking for doesn't exist. You can
            return to the homepage and continue saving lives.
          </div>
          <div className="goback">
            <a href="/">
              <button className="go-back-button primary">Go Back Home</button>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};
