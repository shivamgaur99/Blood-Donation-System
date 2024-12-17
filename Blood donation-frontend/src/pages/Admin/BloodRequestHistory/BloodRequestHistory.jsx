import React, { useState, useEffect } from "react";
import axios from "axios";
import { END_POINT } from "../../../config/api";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TablePagination,
  Badge,
} from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import Loader from "../../../components/util/Loader";
import useToast from "../../../hooks/useToast";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

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

const BloodRequestHistory = (props) => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { showToast, SnackbarToast } = useToast();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");

  let dark = props.theme;

  const getJwtToken = () => {
    return localStorage.getItem("jwtToken");
  };

  const fetchRequests = async () => {
    const token = getJwtToken();
    try {
      const response = await axios.get(`${END_POINT}/blood-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequests(response.data);
      setFilteredRequests(response.data);
    } catch (error) {
      showToast(
        "Failed to fetch blood requests. Please try again later.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptStatus = (id) => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
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
        fetchRequests();
        showToast("Request approved successfully!", "success");
      })
      .catch((error) => {
        console.error("Error updating status to accepted:", error);
        showToast("Failed to update status", "error");
      });
  };

  // Handle Reject Status (Reject request)
  const handleRejectStatus = (id) => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
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
        fetchRequests();
        showToast("Request rejected successfully!", "success");
      })
      .catch((error) => {
        showToast("Failed to update status", "error");
      });
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (query) {
      setFilteredRequests(
        requests.filter(
          (request) =>
            request.name.toLowerCase().includes(query) ||
            request.bloodGroup.toLowerCase().includes(query) ||
            request.mobile.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredRequests(requests);
    }
  };

  const handleStatusFilterChange = (event) => {
    const selectedStatus = event.target.value;
    setStatusFilter(selectedStatus);
    if (selectedStatus) {
      setFilteredRequests(
        requests.filter((request) => request.status === selectedStatus)
      );
    } else {
      setFilteredRequests(requests);
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const token = getJwtToken();
      try {
        await axios.delete(`${END_POINT}/blood-requests/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(requests.filter((request) => request.id !== id));
        setFilteredRequests(
          filteredRequests.filter((request) => request.id !== id)
        );
        showToast("Request deleted successfully.", "success");
      } catch (error) {
        showToast("Failed to delete request.", "error", [
          { label: "Retry", onClick: () => handleDelete(id) },
        ]);
      }
    }
  };

  const handleCloseDialog = () => {
    setSelectedRequest(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Loader />
      </Box>
    );
  }

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
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: dark ? "#90caf9" : "#1976d2",
              margin: "20px",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Blood Request History
          </h2>

          {/* Search and Filter Section */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} sm={6} md={8}>
                <TextField
                  label="Search Requests"
                  variant="outlined"
                  fullWidth
                  value={searchQuery}
                  onChange={handleSearchChange}
                  size="medium"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                    label="Status"
                  >
                    <MenuItem value="">
                      <em>All Status</em>
                    </MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item>
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(_, newViewMode) => setViewMode(newViewMode)}
                >
                  <ToggleButton value="table">Table</ToggleButton>
                  <ToggleButton value="card">Card</ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Box>

          {/* Table View */}
          {viewMode === "table" ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Patient Name</TableCell>
                    <TableCell>Blood Group</TableCell>
                    <TableCell>Disease</TableCell>
                    <TableCell>Units</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRequests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No requests found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRequests
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>{request.name}</TableCell>
                          <TableCell>{request.bloodGroup}</TableCell>
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
                            <IconButton
                              color="success"
                              onClick={() =>
                                handleAcceptStatus(request.id, "approve")
                              }
                            >
                              <CheckCircleIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() =>
                                handleRejectStatus(request.id, "reject")
                              }
                            >
                              <CancelIcon />
                            </IconButton>
                            <IconButton
                              color="primary"
                              onClick={() => handleViewDetails(request)}
                            >
                              <Visibility />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              onClick={() => handleDelete(request.id)}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredRequests.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          ) : (
            /* Card View */
            <Grid container spacing={3}>
              {filteredRequests.map((request) => (
                <Grid item xs={12} sm={6} md={4} key={request.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{request.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Blood Group: {request.bloodGroup}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Disease: {request.disease}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Units: {request.units}
                      </Typography>
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
                      <Box mt={2} display="flex" justifyContent="space-between">
                        <IconButton
                          color="success"
                          onClick={() =>
                            handleAcceptStatus(request.id, "approve")
                          }
                        >
                          <CheckCircleIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() =>
                            handleRejectStatus(request.id, "reject")
                          }
                        >
                          <CancelIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() => handleViewDetails(request)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => handleDelete(request.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          <Dialog
            open={Boolean(selectedRequest)}
            onClose={handleCloseDialog}
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle>Request Details</DialogTitle>
            <DialogContent>
              {selectedRequest && (
                <>
                  <Typography variant="h6">{selectedRequest.name}</Typography>
                  <Typography variant="body2">
                    Age: {selectedRequest.age}
                  </Typography>
                  <Typography variant="body2">
                    Blood Group: {selectedRequest.bloodGroup}
                  </Typography>
                  <Typography variant="body2">
                    Units: {selectedRequest.units}
                  </Typography>
                  <Typography variant="body2">
                    Disease: {selectedRequest.disease}
                  </Typography>
                  <Typography variant="body2">
                    Mobile: {selectedRequest.mobile}
                  </Typography>
                  <Typography variant="body2">
                    Gender: {selectedRequest.gender}
                  </Typography>
                  <Typography variant="body2">
                    Email: {selectedRequest.email}
                  </Typography>
                  <Typography variant="body2">
                    Contact: {selectedRequest.mobile}
                  </Typography>
                  <Typography variant="body2">
                    Status: {selectedRequest.status}
                  </Typography>
                  <Typography variant="body2">
                    Message: {selectedRequest.message}
                  </Typography>
                  <Typography variant="body2">
                    Created At:{" "}
                    {new Date(selectedRequest.createdAt).toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    Last Updated:{" "}
                    {new Date(selectedRequest.updatedAt).toLocaleString()}
                  </Typography>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
           {/* Snackbar Toast */}
           <SnackbarToast />
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default BloodRequestHistory;
