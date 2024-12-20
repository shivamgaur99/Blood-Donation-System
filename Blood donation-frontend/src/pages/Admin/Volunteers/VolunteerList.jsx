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
} from "@mui/material";
import { Delete, Visibility, Info } from "@mui/icons-material";
import Loader from "../../../components/util/Loader";
import useToast from "../../../hooks/useToast";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const VolunteerList = (props) => {
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State for delete dialog
  const [volunteerToDelete, setVolunteerToDelete] = useState(null); // Volunteer to be deleted
  const { showToast, SnackbarToast } = useToast();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  let dark = props.theme;

  const getJwtToken = () => {
    return localStorage.getItem("jwtToken");
  };

  const fetchEvents = async () => {
    const token = getJwtToken();
    try {
      const response = await axios.get(`${END_POINT}/events/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(response.data);
    } catch (error) {
      showToast("Failed to fetch events. Please try again later.", "error");
    }
  };

  const fetchVolunteers = async () => {
    const token = getJwtToken();
    try {
      const response = await axios.get(
        `${END_POINT}/volunteers/all-with-event`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const volunteersWithEvent = response.data.map((volunteer) => ({
        ...volunteer,
        event: volunteer.event,
      }));
      setVolunteers(volunteersWithEvent);
      setFilteredVolunteers(volunteersWithEvent);
      showToast("Volunteer list loaded successfully", "success");
    } catch (error) {
      showToast("Failed to fetch volunteers. Please try again later.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const token = getJwtToken();
    try {
      await axios.delete(`${END_POINT}/volunteers/${volunteerToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVolunteers(volunteers.filter((volunteer) => volunteer.id !== volunteerToDelete.id));
      setFilteredVolunteers(filteredVolunteers.filter((volunteer) => volunteer.id !== volunteerToDelete.id));
      showToast("Volunteer deleted successfully.", "success");
    } catch (error) {
        showToast("Failed to delete volunteer.", "error", [
          { label: "Retry", onClick: () => handleDelete() },
        ]);
      }finally {
        setOpenDeleteDialog(false); // Close the dialog
      }
    
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (query) {
      setFilteredVolunteers(
        volunteers.filter(
          (volunteer) =>
            volunteer.firstName.toLowerCase().includes(query) ||
            volunteer.lastName.toLowerCase().includes(query) ||
            volunteer.email.toLowerCase().includes(query) ||
            volunteer.phone.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredVolunteers(volunteers);
    }
  };

  const filterVolunteersByEvent = (eventId) => {
    if (eventId) {
      setFilteredVolunteers(
        volunteers.filter((volunteer) => volunteer.event.id === eventId)
      );
    } else {
      setFilteredVolunteers(volunteers);
    }
  };

  const handleViewDetails = (volunteer) => {
    setSelectedVolunteer(volunteer);
  };

  const handleViewEventDetails = (eventId) => {
    const event = events.find((event) => event.id === eventId);
    setSelectedEvent(event);
  };

  const handleCloseDialog = () => {
    setSelectedVolunteer(null);
    setSelectedEvent(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openDeleteConfirmationDialog = (volunteer) => {
    setVolunteerToDelete(volunteer); // Set the volunteer to be deleted
    setOpenDeleteDialog(true); // Open the delete confirmation dialog
  };

  const closeDeleteConfirmationDialog = () => {
    setVolunteerToDelete(null); // Reset the volunteer to be deleted
    setOpenDeleteDialog(false); // Close the dialog
  };

  useEffect(() => {
    fetchEvents();
    fetchVolunteers();
  }, []);

  useEffect(() => {
    filterVolunteersByEvent(selectedEventId);
  }, [selectedEventId, volunteers]);

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
            Volunteer List
          </h2>

          {/* Search, Event Filter and View Mode Toggle in a Single Row */}
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
                  label="Search Volunteers"
                  variant="outlined"
                  fullWidth
                  value={searchQuery}
                  onChange={handleSearchChange}
                  size="medium"
                  // sx={{
                  //   maxWidth: 500,
                  //   "& .MuiInputBase-root": {
                  //     padding: "6px 12px",
                  //     fontSize: "0.875rem",
                  //   },
                  //   "& .MuiOutlinedInput-root": {
                  //     backgroundColor: dark ? "#333" : "#f5f5f5",
                  //   },
                  //   "& .MuiInputLabel-root": {
                  //     color: dark ? "#ccc" : "#000",
                  //   },
                  //   "& .MuiInputBase-input": {
                  //     color: dark ? "#fff" : "#000",
                  //   },
                  // }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl
                  fullWidth
                  // size="small"
                  // sx={{
                  //     maxWidth: 500,
                  //     "& .MuiInputBase-root": {
                  //       padding: "6px 12px",
                  //       fontSize: "0.875rem",
                  //     },
                  //     "& .MuiOutlinedInput-root": {
                  //       backgroundColor: dark ? "#333" : "#f5f5f5",
                  //     },
                  //     "& .MuiInputLabel-root": {
                  //       color: dark ? "#ccc" : "#000",
                  //     },
                  //     "& .MuiInputBase-input": {
                  //       color: dark ? "#fff" : "#000",
                  //     },
                  //   }}
                >
                  <InputLabel>Event</InputLabel>
                  <Select
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    label="Event"
                  >
                    <MenuItem value="">
                      <em>All Events</em>
                    </MenuItem>
                    {events.map((event) => (
                      <MenuItem key={event.id} value={event.id}>
                        {event.name}
                      </MenuItem>
                    ))}
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
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Event</TableCell> {/* Event column */}
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredVolunteers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((volunteer) => (
                      <TableRow key={volunteer.id}>
                        <TableCell>
                          {volunteer.firstName} {volunteer.lastName}
                        </TableCell>
                        <TableCell>{volunteer.email}</TableCell>
                        <TableCell>{volunteer.phone}</TableCell>
                        <TableCell>
                          {volunteer.event ? volunteer.event.name : "No Event"}
                        </TableCell>
                        <TableCell>
                          {/* <IconButton
                            color="primary"
                            onClick={() => handleViewDetails(volunteer)}
                          >
                            <Visibility />
                          </IconButton> */}
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleViewDetails(volunteer)}
                            aria-label="view-details"
                            sx={{
                              padding: "6px 12px",
                              textTransform: "none",
                            }}
                          >
                            View Details
                          </Button>
                          <IconButton
                            color="info"
                            onClick={() =>
                              handleViewEventDetails(volunteer.event.id)
                            }
                          >
                            <Info />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => openDeleteConfirmationDialog(volunteer)}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredVolunteers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          ) : (
            // Card View
            <Grid container spacing={2}>
              {filteredVolunteers.map((volunteer) => (
                <Grid item xs={12} sm={6} md={4} key={volunteer.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">
                        {volunteer.firstName} {volunteer.lastName}
                      </Typography>
                      <Typography variant="body2">
                        Email: {volunteer.email}
                      </Typography>
                      <Typography variant="body2">
                        Phone: {volunteer.phone}
                      </Typography>
                      <Typography variant="body2">
                        Event:{" "}
                        {volunteer.event ? volunteer.event.name : "No Event"}
                      </Typography>
                      <Box mt={2}>
                        <IconButton
                          color="primary"
                          onClick={() => handleViewDetails(volunteer)}
                        >
                          <Visibility />
                        </IconButton>
                        {/* <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleViewDetails(volunteer)}
                          aria-label="view-details"
                          sx={{
                            padding: "6px 12px",
                            textTransform: "none",
                          }}
                        >
                          View Details
                        </Button> */}
                        <IconButton
                          color="info"
                          onClick={() =>
                            handleViewEventDetails(volunteer.event.id)
                          }
                        >
                          <Info />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => openDeleteConfirmationDialog(volunteer)}
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

          {/* View Details Dialog */}
          {selectedVolunteer && (
            <Dialog
              open={Boolean(selectedVolunteer)}
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>Volunteer Details</DialogTitle>
              <DialogContent>
                <Typography variant="h6">
                  {selectedVolunteer.firstName} {selectedVolunteer.lastName}
                </Typography>
                <Typography variant="body2">
                  Date of Birth: {selectedVolunteer.dob}
                </Typography>
                <Typography variant="body2">
                  Gender: {selectedVolunteer.gender}
                </Typography>
                <Typography variant="body2">
                  Phone: {selectedVolunteer.phone}
                </Typography>
                <Typography variant="body2">
                  Email: {selectedVolunteer.email}
                </Typography>
                <Typography variant="body2">
                  Address: {selectedVolunteer.address}
                </Typography>
                <Typography variant="body2">
                  City: {selectedVolunteer.city}
                </Typography>
                <Typography variant="body2">
                  State: {selectedVolunteer.state}
                </Typography>
                <Typography variant="body2">
                  Zip Code: {selectedVolunteer.zipCode}
                </Typography>
                <Typography variant="body2">
                  Message: {selectedVolunteer.message}
                </Typography>
                <Typography variant="body2">
                  Event:{" "}
                  {selectedVolunteer.event
                    ? selectedVolunteer.event.name
                    : "No Event"}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Close</Button>
              </DialogActions>
            </Dialog>
          )}

          {/* Event Details Dialog */}
          {selectedEvent && (
            <Dialog
              open={Boolean(selectedEvent)}
              onClose={handleCloseDialog}
            >
              <DialogTitle>Event Details</DialogTitle>
              <DialogContent>
                <Typography variant="h6">{selectedEvent.name}</Typography>
                <Typography variant="body2">
                  Date: {selectedEvent.dateTime}
                </Typography>
                <Typography variant="body2">
                  Location: {selectedEvent.location}
                </Typography>
                <Typography variant="body2">
                  Description: {selectedEvent.description}
                </Typography>
                <Typography variant="body2">
                  Organizer: {selectedEvent.organizer}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Close</Button>
              </DialogActions>
            </Dialog>
          )}

           {/* Delete Confirmation Dialog */}
           <Dialog
            open={openDeleteDialog}
            onClose={closeDeleteConfirmationDialog}
          >
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <Typography variant="body1">
                Are you sure you want to delete this volunteer?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDeleteConfirmationDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
       {/* Snackbar Toast */}
       <SnackbarToast />
    </ThemeProvider>
  );
};

export default VolunteerList;
