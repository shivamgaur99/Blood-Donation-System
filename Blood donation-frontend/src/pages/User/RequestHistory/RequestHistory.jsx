import React, { useEffect, useState } from "react";
import axios from "axios";
import { END_POINT } from "../../../config/api";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TablePagination,
} from "@mui/material";
import { useToast } from "../../../services/toastService";
import { SimpleToast } from "../../../components/util/Toast/Toast";
import Loader from "../../../components/util/Loader";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Define themes for light and dark modes
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#fff",
      paper: "#f5f5f5",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
});

const RequestHistory = (props) => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  const { toast, showToast, hideToast } = useToast(); 
  const dark = props.theme; 

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      fetchRequestHistory(email);
    } else {
      setError("No user logged in");
      setLoading(false);
    }
  }, []);

  const fetchRequestHistory = (email) => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setError("User is not authenticated");
      setLoading(false);
      return;
    }

    setLoading(true); // Show loader before fetching data
    axios
      .get(`${END_POINT}/user-blood-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRequests(response.data);
        setLoading(false);
        showToast("Request history fetched successfully!", "success"); // Success toast
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching request history:", error);
        if (error.response && error.response.status === 401) {
          setError("Authentication failed. Please login again.");
        } else {
          setError(
            "Failed to fetch the request history. Please try again later."
          );
        }
        showToast(
          error.message || "Failed to fetch request history. Please try again.",
          "error"
        ); // Error toast
      });
  };

  const handleDeleteRequest = (requestId) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setError("User is not authenticated");
      return;
    }

    setLoading(true);
    axios
      .delete(`${END_POINT}/blood-requests/${requestId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setLoading(false);
        setRequests(requests.filter((request) => request.id !== requestId)); // Remove from the state
        setOpenDeleteConfirm(false);
        showToast("Request deleted successfully!", "success");
      })
      .catch((error) => {
        setLoading(false);
        setOpenDeleteConfirm(false);
        showToast("Failed to delete request. Please try again.", "error");
      });
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setOpenDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setSelectedRequest(null); // Clear selected request when modal closes
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  // Paginate the requests based on the current page and rows per page
  const paginatedRequests = requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        sx={{
          minHeight: "100vh",
          padding: 2,
          backgroundColor: dark ? "#121212" : "#fff",
        }}
      >
        <div style={{ width: "90%" }}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: "bold",
              color: dark ? "#90caf9" : "#1976d2",
              margin: "20px",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Request History
          </Typography>

          {/* Loading Spinner */}
          {loading && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100vh"
            >
              <Loader /> {/* Custom Loader component */}
            </Box>
          )}

          {/* Error Message */}
          {error && (
            <Box textAlign="center" color="error.main">
              <Typography variant="h6">{error}</Typography>
            </Box>
          )}

          {/* Request History Table */}
          {!loading && !error && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Blood Group</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Disease</TableCell>
                    <TableCell>Units</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedRequests.length > 0 ? (
                    paginatedRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.id}</TableCell>
                        <TableCell>{request.name}</TableCell>
                        <TableCell>{request.mobile}</TableCell>
                        <TableCell>{request.gender}</TableCell>
                        <TableCell>{request.bloodGroup}</TableCell>
                        <TableCell>{request.age}</TableCell>
                        <TableCell>{request.disease}</TableCell>
                        <TableCell>{request.units}</TableCell>
                        <TableCell>
                          <Badge
                            color={
                              request.status === "Approved"
                                ? "success"
                                : request.status === "Rejected"
                                ? "error"
                                : "warning"
                            }
                            variant="dot"
                          >
                            {request.status.charAt(0).toUpperCase() +
                              request.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {/* "View Details" Button */}
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleViewDetails(request)}
                          >
                            View Details
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                              setRequestToDelete(request);
                              setOpenDeleteConfirm(true);
                            }}
                            sx={{ marginLeft: 1 }}
                            disabled
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan="10" align="center">
                        You have not made any requests yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {/* Pagination Controls */}
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={requests.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          )}

          {/* Toast Notification */}
          {toast.open && (
            <SimpleToast
              open={toast.open}
              severity={toast.severity}
              message={toast.message}
              handleCloseToast={hideToast}
            />
          )}

          {/* View Details Modal */}
          {selectedRequest && (
            <Dialog open={openDetailsModal} onClose={handleCloseDetailsModal} fullWidth maxWidth="xs">
              <DialogTitle>Request Details</DialogTitle>
              <DialogContent>
                <Typography variant="h6">Name: {selectedRequest.name}</Typography>
                <Typography variant="body2">Email: {selectedRequest.email}</Typography>
                <Typography variant="body2">Blood Group: {selectedRequest.bloodGroup}</Typography>
                <Typography variant="body2">Contact: {selectedRequest.mobile}</Typography>
                <Typography variant="body2">Age: {selectedRequest.age}</Typography>
                <Typography variant="body2">Gender: {selectedRequest.gender}</Typography>
                <Typography variant="body2">Disease: {selectedRequest.disease}</Typography>
                <Typography variant="body2">Units: {selectedRequest.units}</Typography>
                <Typography variant="body2">
                  Status: {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDetailsModal} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          )}

          {/* Confirmation Dialog for Deletion */}
          <Dialog open={openDeleteConfirm} onClose={() => setOpenDeleteConfirm(false)}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to delete this request?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDeleteConfirm(false)} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteRequest(requestToDelete.id)}
                color="error"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default RequestHistory;
