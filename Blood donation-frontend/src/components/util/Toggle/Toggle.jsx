import React from "react";
import "./toggle.css";

const Toggle = ({ isChecked, handleToggleChange }) => {
  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id="check"
        className="checkbox"
        checked={isChecked}
        onChange={handleToggleChange}
      />
      <label htmlFor="check" className="label">
        <i className={`fas fa-moon moon ${isChecked ? "hidden" : ""}`}></i>
        <i className={`fas fa-sun sun ${isChecked ? "" : "hidden"}`}></i>
        <div className="slider"></div>
      </label>
    </div>
  );
};

export default Toggle;
