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
} from "@mui/material";
import { Delete, Reply } from "@mui/icons-material";
import Loader from "../../../components/util/Loader";
import useToast from "../../../hooks/useToast";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2"; // Import SweetAlert2

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
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'card' view
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const { showToast, SnackbarToast } = useToast();

  let dark = props.theme;

  const getJwtToken = () => {
    return localStorage.getItem("jwtToken");
  };

  const fetchVolunteers = async () => {
    const token = getJwtToken();
    try {
      const response = await axios.get(`${END_POINT}/volunteers/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVolunteers(response.data);
      setFilteredVolunteers(response.data); // Initialize filtered volunteers
      showToast("Volunteer list loaded successfully", "success");
    } catch (error) {
      showToast("Failed to fetch volunteers. Please try again later.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // SweetAlert2 confirmation dialog
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
        await axios.delete(`${END_POINT}/volunteers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVolunteers(volunteers.filter((volunteer) => volunteer.id !== id));
        setFilteredVolunteers(filteredVolunteers.filter((volunteer) => volunteer.id !== id));
        showToast("Volunteer deleted successfully.", "success");
        // Swal.fire("Deleted!", "The volunteer has been deleted.", "success");
      } catch (error) {
        showToast("Failed to delete volunteer.", "error", [
          { label: "Retry", onClick: () => handleDelete(id) },
        ]);
        // Swal.fire("Error", "Failed to delete the volunteer.", "error");
      }
    }
  };

  // Search filter function
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

  useEffect(() => {
    fetchVolunteers();
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
          backgroundColor: dark ? "#121212" : "#fff", // Set background color dynamically
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

          {/* Search and View Mode Toggle in a Single Row */}
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
                  size="small" // Set to small initially
                  sx={{
                    maxWidth: 500,
                    "& .MuiInputBase-root": {
                      padding: "6px 12px", // Custom padding
                      fontSize: "0.875rem", // Custom font size
                    },
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: dark ? "#333" : "#f5f5f5", // Ensure background contrast
                    },
                    "& .MuiInputLabel-root": {
                      color: dark ? "#ccc" : "#000", // Adjust label color for dark mode
                    },
                    "& .MuiInputBase-input": {
                      color: dark ? "#fff" : "#000", // Adjust input text color for dark mode
                    },
                  }}
                />
              </Grid>
              <Grid item>
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(_, newViewMode) => setViewMode(newViewMode)}
                  sx={{
                    "& .MuiToggleButton-root": {
                      backgroundColor: dark ? "#444" : "#e0e0e0", // Toggle button background
                      color: dark ? "#fff" : "#000", // Button text color
                      "&.Mui-selected": {
                        backgroundColor: dark ? "#90caf9" : "#1976d2", // Selected state color
                        color: "#fff",
                      },
                      "&:hover": {
                        backgroundColor: dark ? "#555" : "#ccc", // Hover effect (adjust for visibility)
                      },
                    },
                  }}
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
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredVolunteers.map((volunteer) => (
                    <TableRow key={volunteer.id}>
                      <TableCell>
                        {volunteer.firstName} {volunteer.lastName}
                      </TableCell>
                      <TableCell>{volunteer.email}</TableCell>
                      <TableCell>{volunteer.phone}</TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(volunteer.id)} // Call handleDelete with volunteer ID
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() =>
                            console.log("Reply to:", volunteer.firstName)
                          }
                        >
                          <Reply />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            // Card View
            <Grid container spacing={2}>
              {filteredVolunteers.map((volunteer) => (
                <Grid item xs={12} sm={6} md={4} key={volunteer.id}>
                  <Card
                    sx={{
                      backgroundColor: dark ? "#1e1e1e" : "#fff", // Card background
                      boxShadow: dark ? "none" : 3, // Shadow for light mode
                    }}
                  >
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
                      <Box mt={2}>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(volunteer.id)} // Call handleDelete with volunteer ID
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() =>
                            console.log("Reply to:", volunteer.firstName)
                          }
                        >
                          <Reply />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Toast notification */}
          <SnackbarToast />
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default VolunteerList;
