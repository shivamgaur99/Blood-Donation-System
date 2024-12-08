import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { END_POINT } from "../../../config/api";
import Loader from "../../../components/util/Loader"; // Assuming you have a Loader component
import { SimpleToast } from "../../../components/util/Toast/Toast"; // Assuming you have a SimpleToast component
import { useToast } from "../../../services/toastService"; // Assuming you're using a toast service for notifications

const EventManagement = (props) => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    dateTime: '',
    organizer: '',
    description: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading
  const { toast, showToast, hideToast } = useToast(); // Toast service

  let dark = props.theme;

  // Get JWT token from localStorage (or another storage)
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true); // Show loader while fetching data
    try {
      const response = await axios.get(`${END_POINT}/events/all`);
      setEvents(response.data);
      setLoading(false); // Hide loader after data is fetched
      showToast("Events fetched successfully!", "success"); // Success toast
    } catch (error) {
      setLoading(false); // Hide loader in case of error
      console.error('Error fetching events:', error);
      showToast('Failed to fetch events. Please try again.', 'error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader while submitting form
    try {
      // Check if the form is being used for editing or creating
      if (isEditing) {
        const response = await axios.put(`${END_POINT}/events/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header with token
          },
        });
        showToast('Event updated successfully!', 'success');
      } else {
        const response = await axios.post(`${END_POINT}/events`, formData, {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header with token
          },
        });
        showToast('Event created successfully!', 'success');
      }
  
      // Reset form and state after successful submission
      setFormData({
        name: '',
        location: '',
        dateTime: '',
        organizer: '',
        description: '',
      });
      setIsEditing(false);
      setEditingId(null);
      fetchEvents(); // Fetch the latest events after submission
  
    } catch (error) {
      console.error('Error saving event:', error);
  
      // Check if the error has a response from the server
      if (error.response) {
        // Handle specific error messages from the server
        const errorMessage = error.response.data.message || 'Failed to save event. Please try again later.';
        showToast(errorMessage, 'error'); // Show the server error message
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error Request:', error.request);
        showToast('No response received from server. Please try again later.', 'error');
      } else {
        // A general error occurred
        console.error('Error Message:', error.message);
        showToast('An error occurred. Please try again later.', 'error');
      }
    } finally {
      setLoading(false); // Hide loader after form submission
    }
  };
  
  const handleEdit = (event) => {
    setFormData(event);
    setIsEditing(true);
    setEditingId(event.id);
  };

  const handleDelete = async (id) => {
    setLoading(true); // Show loader while deleting event
    try {
      await axios.delete(`${END_POINT}/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header with token
        },
      });
      showToast('Event deleted successfully!', 'success');
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      showToast('Failed to delete event. Please try again.', 'error');
    } finally {
      setLoading(false); // Hide loader after deletion
    }
  };

  return (
    <div className="container">
      <h1>Event Management</h1>

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleInputChange}
          required
        />
        <input
          type="datetime-local"
          name="dateTime"
          value={formData.dateTime}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="organizer"
          placeholder="Organizer"
          value={formData.organizer}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <button type="submit">{isEditing ? 'Update Event' : 'Create Event'}</button>
      </form>

      <h2>All Events</h2>
      {loading ? (
        <div className="text-center">
          <Loader /> {/* Loader for events */}
        </div>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <h3>{event.name}</h3>
              <p>{event.location}</p>
              <p>{new Date(event.dateTime).toLocaleString()}</p>
              <p>{event.organizer}</p>
              <p>{event.description}</p>
              <button onClick={() => handleEdit(event)}>Edit</button>
              <button onClick={() => handleDelete(event.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <h2>Upcoming Events</h2>
      {loading ? (
        <div className="text-center">
          <Loader /> {/* Loader for upcoming events */}
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
          <Loader /> {/* Loader for previous events */}
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

export default EventManagement;
