import React from "react";
import "./edit-event-modal.css";

const EditEventModal = ({ isOpen, onClose, event, onSubmit, onChange, dark }) => {
  if (!isOpen) return null;

  return (
    <div className={`edit-event-modal ${dark ? "dark" : ""}`}>
      <div className="modal-content">
        <h3>Edit Event</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={event.name || ""}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={event.location || ""}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date & Time:</label>
            <input
              type="datetime-local"
              name="dateTime"
              value={event.dateTime || ""}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Organizer:</label>
            <input
              type="text"
              name="organizer"
              value={event.organizer || ""}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={event.description || ""}
              onChange={onChange}
              required
            ></textarea>
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
