import React from "react";
import PropTypes from "prop-types";
import "./event-card.css";

const EventCard = ({ event, dark, onLearnMore }) => {
  const parseDate = (dateTime) => {
    const date = new Date(dateTime);
    return isNaN(date) ? "Invalid Date" : date.toLocaleString();
  };

  return (
    <div className={`all-event ${dark ? "dark" : ""}`} key={event.id}>
      <div className="header">
        <div className="badge">
          {new Date(event.dateTime).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </div>
        <h3>{event.name}</h3>
      </div>
      <p className="all-event-description">
        {event.description
          ? event.description.length > 120
            ? event.description.substring(0, 120) + "..."
            : event.description
          : "Join us to make a difference!"}
      </p>
      <p className="all-event-organizer">Organizer: {event.organizer}</p>
      <p className="all-event-date">{parseDate(event.dateTime)}</p>
      <p className="all-event-location">
        <i className="fas fa-map-marker-alt fa-sm"></i>
        {event.location}
      </p>
      <button
        className={`all-event-btn ${dark ? "dark" : ""}`}
        onClick={() => onLearnMore(event)} 
      >
        Learn More
      </button>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
  dark: PropTypes.bool.isRequired,
  onLearnMore: PropTypes.func.isRequired,
};

export default EventCard;
