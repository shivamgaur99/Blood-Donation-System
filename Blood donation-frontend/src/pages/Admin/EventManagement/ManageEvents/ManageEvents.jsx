import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { END_POINT } from '../../../../config/api';
import Loader from '../../../../components/util/Loader';
import { SimpleToast } from '../../../../components/util/Toast/Toast';
import { useToast } from '../../../../services/toastService';
import './manage-events.css';

const ManageEvents = (props) => {
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
  const [loading, setLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  let dark = props.theme;
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${END_POINT}/events/all`);
      setEvents(response.data);
      // showToast("Events fetched successfully!", "success");
    } catch (error) {
      console.error('Error fetching events:', error);
      showToast('Failed to fetch events. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setFormData(event);
    setIsEditing(true);
    setEditingId(event.id);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.put(`${END_POINT}/events/${editingId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showToast('Event updated successfully!', 'success');
      fetchEvents();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating event:', error);
      showToast('Failed to update event. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${END_POINT}/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showToast('Event deleted successfully!', 'success');
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      showToast('Failed to delete event. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`manage-events ${isEditing ? 'editing' : ''}`}>
      <h1>All Events</h1>

      {/* {isEditing && (
        <Modal onClose={() => setIsEditing(false)}>
          <form className="event-form">
            <input
              type="text"
              name="name"
              placeholder="Event Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
              required
            />
            <input
              type="text"
              name="organizer"
              placeholder="Organizer"
              value={formData.organizer}
              onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <button type="button" onClick={handleUpdate} disabled={loading}>
              Update Event
            </button>
          </form>
        </Modal>
      )} */}

      {loading ? (
        <Loader />
      ) : (
        <div className="events-list">
          {events.map((event) => (
            <div className="event-card" key={event.id}>
              <h3>{event.name}</h3>
              <p className="description">{event.description}</p>
              <p className="organizer">Organizer: {event.organizer}</p>     
              <p className="datetime">Date & Time: {new Date(event.dateTime).toLocaleString()}</p>       
              <p className="location">Location: {event.location}</p>
              <div className="actions">
                <button onClick={() => handleEdit(event)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(event.id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

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

export default ManageEvents;