import React from "react";
import "./toggle.css";

const Toggle = (props) => {
  const mobile = props.class;

  return (
    <div className={`toggle-container ${mobile}`}>
      <input
         type="checkbox"
         id="check"
         className="checkbox"
         checked={props.theme}
         onChange={() => props.handleClick()}
         onClick={props.closeMobileMenu}
      />
      <label htmlFor="check" className="label">
        <i className={`fas fa-moon moon`}></i>
        <i className={`fas fa-sun sun`}></i>
        <div className="slider"></div>
      </label>
    </div>
  );
};

export default Toggle;

