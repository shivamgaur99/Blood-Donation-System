import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { END_POINT } from "../../../../config/api";
import Loader from "../../../../components/util/Loader";
import { SimpleToast } from "../../../../components/util/Toast/Toast";
import { useToast } from "../../../../services/toastService";
import EventCard from "../EventCard/EventCard";
import EventModal from "../EventModal/EventModal";
import "./all-events.css";

const AllEvents = (props) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const { toast, showToast, hideToast } = useToast();

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 7 },
    (_, index) => currentYear - 5 + index
  );

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

  const filteredEvents = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return events.filter((event) => {
      const eventDate = new Date(event.dateTime);
      const eventMonth = eventDate.getMonth() + 1;
      const eventYear = eventDate.getFullYear();

      const matchesSearchQuery =
        event.name.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query);

      const matchesMonth =
        !selectedMonth || eventMonth === parseInt(selectedMonth);
      const matchesYear = !selectedYear || eventYear === parseInt(selectedYear);

      return matchesSearchQuery && matchesMonth && matchesYear;
    });
  }, [searchQuery, events, selectedMonth, selectedYear]);

  const handleLearnMore = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className={`all-events ${dark ? "dark-mode" : ""}`}>
      <h2>All Events</h2>

      <div className="filters-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filters">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          {filteredEvents.length === 0 && (
            <p>No events available at the moment.</p>
          )}
          <div className="all-events-list">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                dark={dark}
                onLearnMore={handleLearnMore}
              />
            ))}
          </div>
        </>
      )}

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

export default AllEvents;
