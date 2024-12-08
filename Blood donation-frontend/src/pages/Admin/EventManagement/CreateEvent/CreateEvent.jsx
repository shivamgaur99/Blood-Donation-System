import React, { useState } from 'react';
import axios from 'axios';
import { END_POINT } from "../../../../config/api";
import Loader from "../../../../components/util/Loader";
import { SimpleToast } from "../../../../components/util/Toast/Toast";
import { useToast } from "../../../../services/toastService";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    dateTime: '',
    organizer: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const token = localStorage.getItem('jwtToken');

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
      showToast('Event created successfully!', 'success');
      setFormData({
        name: '',
        location: '',
        dateTime: '',
        organizer: '',
        description: '',
      });
    } catch (error) {
      console.error('Error creating event:', error);

      if (error.response) {
        const errorMessage = error.response.data.message || 'Failed to create event. Please try again later.';
        showToast(errorMessage, 'error');
      } else if (error.request) {
        console.error('Error Request:', error.request);
        showToast('No response received from server. Please try again later.', 'error');
      } else {
        console.error('Error Message:', error.message);
        showToast('An error occurred. Please try again later.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Create Event</h1>

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
        <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Create Event'}</button>
      </form>

      {loading && <Loader />}

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
