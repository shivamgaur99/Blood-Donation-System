import React from "react";
import PropTypes from "prop-types";
import "./event-modal.css";

const EventModal = ({ event, isOpen, onClose, dark }) => {
  if (!isOpen) return null;

  return (
    <div className={`event-modal-overlay ${dark ? "dark" : ""}`} onClick={onClose}>
      <div
        className={`event-modal-container ${dark ? "dark" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`event-modal-header ${dark ? "dark" : ""}`}>
          <h1>{event.name}</h1>
        </div>
        <div className={`event-modal-content ${dark ? "dark" : ""}`}>
          <p className={`event-modal-description ${dark ? "dark" : ""}`}>{event.description}</p>
          <p className={`event-modal-organizer ${dark ? "dark" : ""}`}>
            <strong>Organizer:</strong> {event.organizer}
          </p>
          <p className={`event-modal-dateTime ${dark ? "dark" : ""}`}>
            <strong>Date & Time:</strong>{" "}
            {new Date(event.dateTime).toLocaleString()}
          </p>
          <p className={`event-modal-location ${dark ? "dark" : ""}`}>
            <strong>Location:</strong> {event.location}
          </p>
        </div>
        <div className={`event-modal-footer ${dark ? "dark" : ""}`}>
          <button className={`event-modal-action-btn ${dark ? "dark" : ""}`} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

EventModal.propTypes = {
  event: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dark: PropTypes.bool.isRequired,
};

export default EventModal;
