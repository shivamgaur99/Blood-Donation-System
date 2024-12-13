import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { END_POINT } from "../../config/api";
import Loader from "../../components/util/Loader";
import { SimpleToast } from "../../components/util/Toast/Toast";
import { useToast } from "../../services/toastService";
import Slider from "react-slick";
import "./event.css";
import CarouselSettings from "../../components/util/Carousel/CarouselSettings";
import EventModal from "./Components/EventModal/EventModal";

const Event = (props) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const navigate = useNavigate();
  const { theme: dark } = props;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${END_POINT}/events/all`);
      if (response.data && Array.isArray(response.data)) {
        setEvents(response.data);
      } else {
        setEvents([]);
        showToast("No events found.", "warning");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      if (error.response) {
        showToast(
          `Error: ${error.response.status} - ${
            error.response.data.message || "Failed to fetch events."
          }`,
          "error"
        );
      } else if (error.request) {
        showToast("Network error, please try again later.", "error");
      } else {
        showToast("An unexpected error occurred, please try again.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const parseDate = (dateTime) => {
    const date = new Date(dateTime);
    return isNaN(date) ? "Invalid Date" : date.toLocaleString();
  };

  const handleLearnMore = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  const renderEventCard = (event) => (
    <div className={`event ${dark ? "dark" : ""}`} key={event.id}>
      <div className="header">
        <div className="badge">
          {new Date(event.dateTime).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </div>
        <h3>{event.name}</h3>
      </div>
      <p className="event-description">
        {event.description
          ? event.description.length > 120
            ? event.description.substring(0, 120) + "..."
            : event.description
          : "Join us to make a difference!"}
      </p>
      <p className="event-organizer">Organizer: {event.organizer}</p>
      <p className="event-date">{parseDate(event.dateTime)}</p>
      <p className="event-location">
        <i className="fas fa-map-marker-alt fa-sm"></i>
        {event.location}
      </p>
      <button
        className={`event-btn ${dark ? "dark" : ""}`}
        onClick={() => handleLearnMore(event)}
      >
        Learn More
      </button>
    </div>
  );

  const now = new Date();

  const settings = CarouselSettings();

  return (
    <div className={`events ${dark ? "dark-mode" : ""}`}>
      <h2>Upcoming Events</h2>
      {loading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <>
          {events.filter((event) => new Date(event.dateTime) > now).length ===
            0 &&
            !loading && <p>No upcoming events available at the moment.</p>}
          <Slider {...settings}>
            {events
              .filter((event) => new Date(event.dateTime) > now)
              .map((event) => renderEventCard(event))}
          </Slider>
        </>
      )}

      <h2>Previous Events</h2>
      {loading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <>
          {events.filter((event) => new Date(event.dateTime) <= now).length ===
            0 &&
            !loading && <p>No previous events available at the moment.</p>}
          <Slider {...settings}>
            {events
              .filter((event) => new Date(event.dateTime) <= now)
              .map((event) => renderEventCard(event))}
          </Slider>
        </>
      )}

      <div className="all-events-btn-container">
        <button
          className="all-events-btn"
          onClick={() => navigate("/all-events")}
        >
          View All Events
        </button>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        event={selectedEvent || {}}
        dark={dark}
      />

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

export default Event;
