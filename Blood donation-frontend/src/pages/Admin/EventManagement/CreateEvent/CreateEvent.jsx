import React, { useState } from "react";
import axios from "axios";
import { END_POINT } from "../../../../config/api";
import { SimpleToast } from "../../../../components/util/Toast/Toast";
import { useToast } from "../../../../services/toastService";
import "./create-event.css";

const CreateEvent = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    dateTime: "",
    organizer: "",
    description: "",
  });
  let dark = props.theme;
  const [loading, setLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const token = localStorage.getItem("jwtToken");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${END_POINT}/events`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showToast("Event created successfully!", "success");
      setFormData({
        name: "",
        location: "",
        dateTime: "",
        organizer: "",
        description: "",
      });
    } catch (error) {
      console.error("Error creating event:", error);

      if (error.response) {
        const errorMessage =
          error.response.data.message ||
          "Failed to create event. Please try again later.";
        showToast(errorMessage, "error");
      } else if (error.request) {
        showToast(
          "No response received from server. Please try again later.",
          "error"
        );
      } else {
        showToast("An error occurred. Please try again later.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`create-event-section ${
        dark ? "create-event-section-dark" : "create-event-section-light"
      }`}
    >
      <div className="create-event-parent">
      <div className={`create-event-child child1`}>
            <img
              src="./images/contact-us-image.png"
              alt="event"
              className={"contact-image"}
            />
          </div>
          <div className={`contact-child child2`}>
        <div
          className={`create-event-card ${
            dark ? "create-event-card-dark" : "create-event-card-light"
          }`}
        >
          <h2
            className={`create-event-header-text ${
              dark
                ? "create-event-header-text-dark"
                : "create-event-header-text-light"
            }`}
          >
            Create Event
          </h2>
          <form onSubmit={handleFormSubmit} className="inside-card">
            <div
              className={`create-event-input ${
                dark ? "create-event-input-dark" : "create-event-input-light"
              }`}
            >
              <input
                type="text"
                name="name"
                placeholder="Event Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div
              className={`create-event-input ${
                dark ? "create-event-input-dark" : "create-event-input-light"
              }`}
            >
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div
              className={`create-event-input ${
                dark ? "create-event-input-dark" : "create-event-input-light"
              }`}
            >
              <input
                type="datetime-local"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleInputChange}
                required
              />
            </div>
            <div
              className={`create-event-input ${
                dark ? "create-event-input-dark" : "create-event-input-light"
              }`}
            >
              <input
                type="text"
                name="organizer"
                placeholder="Organizer"
                value={formData.organizer}
                onChange={handleInputChange}
                required
              />
            </div>
            <div
              className={`create-event-input ${
                dark ? "create-event-input-dark" : "create-event-input-light"
              }`}
            >
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="submit-btns">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Submitting..." : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
      {toast.open && (
        <SimpleToast
          open={toast.open}
          severity={toast.severity}
          message={toast.message}
          handleCloseToast={hideToast}
        />
      )}
    </div>
  );
};

export default CreateEvent;
