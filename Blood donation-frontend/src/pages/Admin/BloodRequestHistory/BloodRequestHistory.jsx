import React, { useState, useEffect } from "react";
import axios from "axios";
import { END_POINT } from "../../../config/api";
import { SimpleToast } from "../../../components/util/Toast/Toast";
import { useToast } from "../../../services/toastService";
import Loader from "../../../components/util/Loader/index";
import { IconButton } from "@mui/material";  // Importing Material-UI IconButton
import CheckCircleIcon from "@mui/icons-material/CheckCircle";  // Importing CheckCircle icon for "Accept"
import CancelIcon from "@mui/icons-material/Cancel";  // Importing Cancel icon for "Reject"

function BloodRequestHistory() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast, showToast, hideToast } = useToast();

  const fetchBloodRequestHistory = () => {
    setLoading(true);
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setError("No token found, please login.");
      setLoading(false);
      return;
    }

    axios
      .get(`${END_POINT}/requestHistory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching request history:", error);
        if (error.response && error.response.status === 401) {
          setError("Authentication failed. Please login again.");
        } else if (error.response && error.response.status === 404) {
          setError("Endpoint not found. Please check the API URL.");
        } else {
          setError("Failed to fetch request history. Please try again later.");
        }
        setLoading(false);
        showToast(error.message || "Failed to fetch request history.", "error");
      });
  };

  useEffect(() => {
    fetchBloodRequestHistory();
  }, []);

  const handleAcceptStatus = (id) => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setError("No token found, please login.");
      showToast("No token found, please login.", "error");
      return;
    }

    axios
      .put(
        `${END_POINT}/blood-requests/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        fetchBloodRequestHistory();
        showToast("Request approved successfully!", "success");
      })
      .catch((error) => {
        console.error("Error updating status to accepted:", error);
        setError("Failed to update status");
        showToast("Failed to update status", "error");
      });
  };

  const handleRejectStatus = (id) => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setError("No token found, please login.");
      showToast("No token found, please login.", "error");
      return;
    }

    axios
      .put(
        `${END_POINT}/blood-requests/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        fetchBloodRequestHistory();
        showToast("Request rejected successfully!", "success");
      })
      .catch((error) => {
        setError("Failed to update status");
        showToast("Failed to update status", "error");
      });
  };

  return (
    <div className="container my-5">
      <h1 className="text-center text-primary mb-4">Blood Request History</h1>

      {loading ? (
        <div className="text-center">
          <Loader />
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : requests.length === 0 ? (
        <div className="alert alert-info text-center">
          No blood requests available at the moment.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Gender</th>
                <th>Blood Group</th>
                <th>Age</th>
                <th>Disease</th>
                <th>Units</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr
                  key={request.id}
                  className={
                    request.status === "accepted"
                      ? "table-success"
                      : request.status === "rejected"
                      ? "table-danger"
                      : ""
                  }
                >
                  <td>{request.id}</td>
                  <td>{request.name}</td>
                  <td>{request.mobile}</td>
                  <td>{request.gender}</td>
                  <td>{request.bloodGroup}</td>
                  <td>{request.age}</td>
                  <td>{request.disease}</td>
                  <td>{request.units}</td>
                  <td>
                    <span
                      className={`badge ${
                        request.status === "Approved"
                          ? "bg-success"
                          : request.status === "Rejected"
                          ? "bg-danger"
                          : "bg-warning"
                      }`}
                    >
                      {request.status === "false"
                        ? "Pending"
                        : request.status.charAt(0).toUpperCase() +
                          request.status.slice(1)}
                    </span>
                  </td>

                  <td>
                    <div className="d-flex gap-2">
                      {request.status === "Pending" ? (
                        <>
                          <IconButton
                            color="success"
                            onClick={() => handleAcceptStatus(request.id)}
                            aria-label="accept"
                          >
                            <CheckCircleIcon /> {/* Accept Icon */}
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleRejectStatus(request.id)}
                            aria-label="reject"
                          >
                            <CancelIcon /> {/* Reject Icon */}
                          </IconButton>
                        </>
                      ) : request.status === "Approved" ? (
                        <IconButton
                          color="error"
                          onClick={() => handleRejectStatus(request.id)}
                          aria-label="reject"
                        >
                          <CancelIcon /> {/* Reject Icon */}
                        </IconButton>
                      ) : request.status === "Rejected" ? (
                        <IconButton
                          color="success"
                          onClick={() => handleAcceptStatus(request.id)}
                          aria-label="accept"
                        >
                          <CheckCircleIcon /> {/* Accept Icon */}
                        </IconButton>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <SimpleToast
        open={toast.open}
        severity={toast.severity}
        message={toast.message}
        handleCloseToast={hideToast}
      />
    </div>
  );
}

export default BloodRequestHistory;
