import React, { useState, useEffect } from "react";
import axios from "axios";
import { END_POINT } from "../../config/api";
import { SimpleToast } from "../../components/util/Toast/Toast";
import { useToast } from "../../services/toastService"; // Assuming you're using a toast service for notifications
import Loader from "../../components/util/Loader"; // Assuming you have a Loader component

const Event = (props) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // State for loader
  const { toast, showToast, hideToast } = useToast(); // Toast service

  let dark = props.theme;
  
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true); // Show loader before fetching data
  
    try {
      const response = await axios.get(`${END_POINT}/events/all`);
  
      // Check if the response is valid
      if (response.data && Array.isArray(response.data)) {
        setEvents(response.data); // Set events if response is valid
        showToast("Events fetched successfully!", "success"); // Success toast
      } else {
        setEvents([]); // Clear events if no valid data is returned
        showToast("No events found.", "warning"); // Warning toast if no events
      }
  
    } catch (error) {
      console.error("Error fetching events:", error);
  
      // Handle different error cases based on error object (e.g., network error, 500, etc.)
      if (error.response) {
        // The request was made, and the server responded with an error status code
        showToast(`Error: ${error.response.status} - ${error.response.data.message || "Failed to fetch events."}`, "error");
      } else if (error.request) {
        // The request was made but no response was received
        showToast("Network error, please try again later.", "error");
      } else {
        // Something else caused the error
        showToast("An unexpected error occurred, please try again.", "error");
      }
  
    } finally {
      setLoading(false); // Hide loader after data is fetched or error occurred
    }
  };
  

  return (
    <div className="container">
      <h2>Upcoming Events</h2>
      {loading ? (
        <div className="text-center">
          <Loader /> {/* Loader for events */}
        </div>
      ) : (
        <ul>
          {events
            .filter((event) => new Date(event.dateTime) > new Date())
            .map((event) => (
              <li key={event.id}>
                <h3>{event.name}</h3>
                <p>{event.location}</p>
                <p>{new Date(event.dateTime).toLocaleString()}</p>
                <p>{event.organizer}</p>
              </li>
            ))}
        </ul>
      )}

      <h2>Previous Events</h2>
      {loading ? (
        <div className="text-center">
          <Loader /> {/* Loader for events */}
        </div>
      ) : (
        <ul>
          {events
            .filter((event) => new Date(event.dateTime) <= new Date())
            .map((event) => (
              <li key={event.id}>
                <h3>{event.name}</h3>
                <p>{event.location}</p>
                <p>{new Date(event.dateTime).toLocaleString()}</p>
                <p>{event.organizer}</p>
              </li>
            ))}
        </ul>
      )}

      {/* Toast component for notifications */}
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
