import React, { useState, useEffect } from "react";
import axios from "axios";
import { END_POINT } from "../../config/api";
import { SimpleToast } from "../../components/util/Toast/Toast";
import { useToast } from "../../services/toastService";
import "./volunteer-form.css";

const Volunteer = (props) => {
    const initialFormData = {
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        message: "",
        eventId: "",
      };
    
      const [formData, setFormData] = useState(initialFormData);
      const [events, setEvents] = useState([]);
      const [error, setError] = useState("");
      const { toast, showToast, hideToast } = useToast();
      const dark = props.theme;
    
      useEffect(() => {
        const fetchEvents = async () => {
          try {
            const response = await axios.get(`${END_POINT}/events/all`);
            setEvents(response.data);
          } catch (error) {
            setError("Error fetching events");
            showToast("Error fetching events", "error");
          }
        };
    
        fetchEvents();
      }, []);
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formattedData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          dob: formData.dob,
          gender: formData.gender,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          message: formData.message,
          event: { id: formData.eventId },
        };
    
        try {
          const token = localStorage.getItem('jwtToken');
          if (!token) {
            setError('No token found');
            return;
          }
    
          const response = await axios.post(
            `${END_POINT}/volunteers/register`,
            formattedData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          console.log('Volunteer submitted successfully', response.data);
          showToast("Volunteer form submitted successfully", "success");
    
          // Reset the form data to initial state after submission
          setFormData(initialFormData);
    
        } catch (error) {
          console.error('Error submitting volunteer form', error);
          if (error.response) {
            console.error('Response error: ', error.response.data);
            console.error('Response status: ', error.response.status);
    
            // Display the specific validation error dynamically
            if (error.response.data.errorCode === 'VALIDATION_ERROR') {
              const errorMessage = error.response.data.message || 'Validation error';
              setError(errorMessage);
              showToast(errorMessage, 'error');
            } else {
              setError('Error submitting volunteer form');
              showToast('Error submitting volunteer form', 'error');
            }
          } else {
            setError('Error submitting volunteer form');
            showToast('Error submitting volunteer form', 'error');
          }
        }
      };
  

  return (
    <>
      <div
        className={`volunteer-section ${
          dark ? "volunteer-section-dark" : "volunteer-section-light"
        }`}
      >
        <div className="volunteer-parent">
          <div className="volunteer-child child1">
            <img
              src="/images/volunteer-image.png"
              alt="volunteer"
              className="volunteer-image"
            />
          </div>
          <div className="volunteer-child child2">
            <div
              className={`volunteer-card ${
                dark ? "volunteer-card-dark" : "volunteer-card-light"
              }`}
            >
              <h2
                className={`volunteer-header-text ${
                  dark
                    ? "volunteer-header-text-dark"
                    : "volunteer-header-text-light"
                }`}
              >
                Volunteer Form
              </h2>
              <form onSubmit={handleSubmit} className="inside-card">
                <div
                  className={`volunteer-input ${
                    dark ? "volunteer-input-dark" : "volunteer-input-light"
                  }`}
                >
                  <i className="fas fa-user"></i>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Your first name"
                    required
                  />
                </div>
                <div
                  className={`volunteer-input ${
                    dark ? "volunteer-input-dark" : "volunteer-input-light"
                  }`}
                >
                  <i className="fas fa-user"></i>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Your last name"
                    required
                  />
                </div>
                <div
                  className={`volunteer-input ${
                    dark ? "volunteer-input-dark" : "volunteer-input-light"
                  }`}
                >
                  <label htmlFor="dob">Date of Birth:</label>
                  <input
                    id="dob"
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div
                  className={`volunteer-input ${
                    dark ? "volunteer-input-dark" : "volunteer-input-light"
                  }`}
                >
                  <i className="fas fa-venus-mars"></i>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div
                  className={`volunteer-input ${
                    dark ? "volunteer-input-dark" : "volunteer-input-light"
                  }`}
                >
                  <i className="fas fa-phone"></i>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    required
                  />
                </div>
                <div
                  className={`volunteer-input ${
                    dark ? "volunteer-input-dark" : "volunteer-input-light"
                  }`}
                >
                  <i className="fas fa-envelope"></i>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                  />
                </div>
                <div
                  className={`volunteer-input ${
                    dark ? "volunteer-input-dark" : "volunteer-input-light"
                  }`}
                >
                  <i className="fas fa-home"></i>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Your address"
                    required
                  />
                </div>
                <div
                  className={`volunteer-input ${
                    dark ? "volunteer-input-dark" : "volunteer-input-light"
                  }`}
                >
                  <i className="fas fa-city"></i>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Your city"
                    required
                  />
                </div>
                <div
                  className={`volunteer-input ${
                    dark ? "volunteer-input-dark" : "volunteer-input-light"
                  }`}
                >
                  <i className="fas fa-map-marker-alt"></i>
                  <input
                    id="state"
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Your state"
                    required
                  />
                </div>
                <div
                  className={`volunteer-input ${
                    dark ? "volunteer-input-dark" : "volunteer-input-light"
                  }`}
                >
                  <i className="fas fa-map-pin"></i>
                  <input
                    id="zipCode"
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Your zip code"
                    required
                  />
                </div>

                <div
                  className={`volunteer-input ${
                    dark ? "volunteer-input-dark" : "volunteer-input-light"
                  }`}
                >
                  <i className="fas fa-calendar-day"></i>
                  <select
                    id="eventId"
                    name="eventId"
                    value={formData.eventId}
                    onChange={handleChange}
                  >
                    <option value="">Select Event</option>
                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div
                  className={`volunteer-input ${
                    dark ? "volunteer-input-dark" : "volunteer-input-light"
                  }`}
                >
                  <i className="fas fa-comment-alt"></i>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us why you want to volunteer"
                    required
                  />
                </div>

                <div className="submit-btns">
                  <button
                    type="submit"
                    className="submit-button primary signup-btn"
                    disabled={false}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <SimpleToast
        open={toast.open}
        severity={toast.severity}
        message={toast.message}
        handleCloseToast={hideToast}
      />
    </>
  );
};

export default Volunteer;
