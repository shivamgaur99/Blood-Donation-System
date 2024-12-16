import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { END_POINT } from "../../../../config/api";
import Loader from "../../../../components/util/Loader";
import { SimpleToast } from "../../../../components/util/Toast/Toast";
import { useToast } from "../../../../services/toastService";
import EventModal from "../../../Event/Components/EventModal/EventModal";
import EditEventModal from "./EditModel/EditEventModal";
import "./manage-events.css";
import Swal from 'sweetalert2';

const ManageEvents = ({ theme }) => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState(initialFormState());
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({ month: "", year: "" });
  const [modalState, setModalState] = useState({
    isEditModalOpen: false,
    isEventModalOpen: false,
    selectedEvent: null,
  });
  const { toast, showToast, hideToast } = useToast();

  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${END_POINT}/events/all`);
      setEvents(response.data);
    } catch (error) {
      showToast("Failed to fetch events. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setFormData(event);
    setModalState({ ...modalState, isEditModalOpen: true });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`${END_POINT}/events/${formData.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast("Event updated successfully!", "success");
      setEvents((prev) => prev.map((ev) => (ev.id === formData.id ? response.data : ev)));
      closeEditModal();
    } catch (error) {
      showToast("Failed to update event. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // SweetAlert2 confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await axios.delete(`${END_POINT}/events/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          showToast("Event deleted successfully!", "success");
          setEvents((prev) => prev.filter((event) => event.id !== id));
          // Swal.fire('Deleted!', 'Your event has been deleted.', 'success');
        } catch (error) {
          showToast("Failed to delete event. Please try again.", "error");
          // Swal.fire('Error!', 'Something went wrong while deleting the event.', 'error');
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleFilterChange = (field, value) => {
    setSelectedFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredEvents = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return events.filter((event) => {
      const eventDate = new Date(event.dateTime);
      const matchesSearchQuery =
        event.name.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query);
      const matchesMonth =
        !selectedFilters.month || eventDate.getMonth() + 1 === parseInt(selectedFilters.month);
      const matchesYear =
        !selectedFilters.year || eventDate.getFullYear() === parseInt(selectedFilters.year);
      return matchesSearchQuery && matchesMonth && matchesYear;
    });
  }, [searchQuery, events, selectedFilters]);

  const closeEditModal = () => {
    setModalState({ ...modalState, isEditModalOpen: false });
    setFormData(initialFormState());
  };

  const parseDate = (dateTime) => {
    const date = new Date(dateTime);
    return isNaN(date) ? "Invalid Date" : date.toLocaleString();
  };

  return (
    <div className={`manage-events ${theme ? "dark" : ""}`}>
      <h2>All Events</h2>

      <div className="filters-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fas fa-search search-icon fa-sm"></i>
        </div>

        <div className="filters">
          <select
            value={selectedFilters.month}
            onChange={(e) => handleFilterChange("month", e.target.value)}
          >
            <option value="">Select Month</option>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>

          <select
            value={selectedFilters.year}
            onChange={(e) => handleFilterChange("year", e.target.value)}
          >
            <option value="">Select Year</option>
            {Array.from({ length: 7 }, (_, index) => new Date().getFullYear() - 5 + index).map(
              (year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : filteredEvents.length === 0 ? (
        <p>No events available at the moment.</p>
      ) : (
        <div className="all-events-list">
          {filteredEvents.map((event) => (
            <div className={`all-event ${theme ? "dark" : ""}`} key={event.id}>
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
                {event.description?.length > 120
                  ? event.description.substring(0, 120) + "..."
                  : event.description || "Join us to make a difference!"}
              </p>
              {/* <p className="all-event-organizer">Organizer: {event.organizer}</p>
              <p className="all-event-date">{parseDate(event.dateTime)}</p>
              <p className="all-event-location">
                <i className="fas fa-map-marker-alt fa-sm"></i>
                {event.location}
              </p> */}
              <button
                className={`all-event-btn ${theme ? "dark" : ""}`}
                onClick={() =>
                  setModalState({ ...modalState, isEventModalOpen: true, selectedEvent: event })
                }
              >
                Learn More
              </button>
              <div className="actions">
                <button onClick={() => handleEdit(event)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(event.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <EventModal
        isOpen={modalState.isEventModalOpen}
        onClose={() =>
          setModalState({ ...modalState, isEventModalOpen: false, selectedEvent: null })
        }
        event={modalState.selectedEvent || {}}
        dark={theme}
      />

      <EditEventModal
        isOpen={modalState.isEditModalOpen}
        onClose={closeEditModal}
        event={formData}
        onSubmit={handleUpdate}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        }
        dark={theme}
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

const initialFormState = () => ({
  id: null,
  name: "",
  location: "",
  dateTime: "",
  organizer: "",
  description: "",
});

export default ManageEvents;
