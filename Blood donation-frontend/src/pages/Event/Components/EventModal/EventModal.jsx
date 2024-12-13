import React from "react";
import PropTypes from "prop-types";
import "./event-modal.css";

const EventModal = ({ event, isOpen, onClose, dark }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${dark ? "dark" : ""}`} onClick={onClose}>
      <div
        className={`modal-container ${dark ? "dark" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`modal-header ${dark ? "dark" : ""}`}>
          <h1>{event.name}</h1>
        </div>
        <div className={`modal-content ${dark ? "dark" : ""}`}>
          <p className="modal-description">{event.description}</p>
          <p>
            <strong>Organizer:</strong> {event.organizer}
          </p>
          <p>
            <strong>Date & Time:</strong>{" "}
            {new Date(event.dateTime).toLocaleString()}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
        </div>
        <div className="modal-footer">
          <button className={`modal-action-btn ${dark ? "dark" : ""}`} onClick={onClose}>
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
