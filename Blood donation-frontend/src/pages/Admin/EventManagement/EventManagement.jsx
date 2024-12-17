import React from 'react';
import { useNavigate } from 'react-router-dom';
import './event-management.css'; 

const EventManagement = (props) => {
  let dark = props.theme; // Determine the theme based on props

  const navigate = useNavigate();

  const navigateToCreateEvent = () => {
    navigate("/create-event");
  };

  const navigateToManageEvent = () => {
    navigate("/manage-events");
  };

  return (
    <div className={`event-container ${dark ? 'dark' : 'light'}`}>
      <h1>Event Management</h1>

      <div className="ecards-container">
        <div className="ecard" onClick={navigateToCreateEvent}>
          <h2>Create Event</h2>
          <p>Click here to create a new event.</p>
          <p><i className="fas fa-plus-circle fa-3x icon-spacing"></i></p>
        </div>

        <div className="ecard" onClick={navigateToManageEvent}>
          <h2>Manage Events</h2>
          <p>Click here to view, edit, or delete events.</p>
          <p><i className="fas fa-cogs fa-2x icon-spacing"></i></p>
        </div>
      </div>
    </div>
  );
};

export default EventManagement;
