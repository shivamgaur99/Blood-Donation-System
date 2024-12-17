import React, { useEffect, useState } from "react";
import axios from "axios";
import { END_POINT } from "../../../config/api";
import { useToast } from "../../../services/toastService";
import { SimpleToast } from "../../../components/util/Toast/Toast";
import Loader from "../../../components/util/Loader";
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
  Button,
  TablePagination,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton
} from "@mui/material";
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

const DonorList = (props) => {
  const [donorList, setDonorList] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
  const [viewMode, setViewMode] = useState("table"); // Default view is table
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(""); // Blood group filter

  const { toast, showToast, hideToast } = useToast();
  let dark = props.theme;

  useEffect(() => {
    fetchDonorList();
  }, []);

  useEffect(() => {
    // Filter donor list based on search query and selected blood group
    let filtered = donorList;

    if (searchQuery) {
      filtered = filtered.filter((donor) =>
        donor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedBloodGroup) {
      filtered = filtered.filter((donor) => donor.bloodGroup === selectedBloodGroup);
    }

    setFilteredDonors(filtered);
  }, [searchQuery, selectedBloodGroup, donorList]);

  const fetchDonorList = () => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setError("User is not authenticated");
      setLoading(false);
      showToast("User is not authenticated", "error");
      return;
    }

    axios
      .get(`${END_POINT}/donorlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDonorList(response.data);
        setFilteredDonors(response.data); // Set filtered donors initially to all donors
        setLoading(false);
        showToast("Donor list loaded successfully", "success");
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to fetch donor list. Please try again later.");
        setLoading(false);
        showToast(
          error.message || "Failed to fetch donor list. Please try again later.",
          "error"
        );
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleBloodGroupChange = (event) => {
    setSelectedBloodGroup(event.target.value);
  };

  // Paginate the filteredDonors based on the current page and rows per page
  const paginatedDonors = filteredDonors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
            Available Blood Donors
          </Typography>

          {/* Search and Blood Group Filter Section */}
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginBottom: 2 }}>
            <TextField
              variant="outlined"
              label="Search Users"
              value={searchQuery}
              onChange={handleSearchChange}
              fullWidth
              sx={{ marginRight: 2 }}
            />
            <FormControl sx={{ minWidth: 200, marginRight: 2 }}>
              <InputLabel>Blood Group</InputLabel>
              <Select
                value={selectedBloodGroup}
                onChange={handleBloodGroupChange}
                label="Blood Group"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Toggle Button Group for View Mode */}
          <Box textAlign="center" sx={{ marginBottom: 2 }}>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(_, newViewMode) => setViewMode(newViewMode)}
            >
              <ToggleButton value="table">Table</ToggleButton>
              <ToggleButton value="card">Card</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Loading Spinner */}
          {loading && (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
              <Loader />
            </Box>
          )}

          {/* Error Message */}
          {error && (
            <Box textAlign="center" color="error.main">
              <Typography variant="h6">{error}</Typography>
            </Box>
          )}

          {/* Display Donations */}
          {!loading && !error && (
            <>
              {viewMode === "table" ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Blood Group</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell>Mobile</TableCell>
                        <TableCell>Units</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedDonors.length > 0 ? (
                        paginatedDonors.map((donor) => (
                          <TableRow key={donor.id}>
                            <TableCell>{donor.name}</TableCell>
                            <TableCell>{donor.age || "Not Available"}</TableCell>
                            <TableCell>{donor.gender || "Not Available"}</TableCell>
                            <TableCell>{donor.bloodGroup || "Not Available"}</TableCell>
                            <TableCell>{donor.city || "Not Available"}</TableCell>
                            <TableCell>{donor.mobile || "Not Available"}</TableCell>
                            <TableCell>{donor.units || "Not Available"}</TableCell>
                            <TableCell>{donor.date || "Not Available"}</TableCell>
                            <TableCell>
                              <Button variant="contained" color="secondary">
                                Contact Donor
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan="9" align="center">
                            No donors available at the moment.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredDonors.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableContainer>
              ) : (
                // Card View
                <Grid container spacing={3}>
                  {paginatedDonors.length > 0 ? (
                    paginatedDonors.map((donor) => (
                      <Grid item xs={12} sm={6} md={4} key={donor.id}>
                        <Card>
                          <CardHeader title={donor.name} />
                          <CardContent>
                            <Typography variant="body2">
                              Age: {donor.age || "Not Available"}
                            </Typography>
                            <Typography variant="body2">
                              Gender: {donor.gender || "Not Available"}
                            </Typography>
                            <Typography variant="body2">
                              Blood Group: {donor.bloodGroup || "Not Available"}
                            </Typography>
                            <Typography variant="body2">
                              City: {donor.city || "Not Available"}
                            </Typography>
                            <Typography variant="body2">
                              Mobile: {donor.mobile || "Not Available"}
                            </Typography>
                            <Typography variant="body2">
                              Units: {donor.units || "Not Available"}
                            </Typography>
                            <Typography variant="body2">
                              Date: {donor.date || "Not Available"}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button variant="contained" color="secondary">
                              Contact Donor
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Typography variant="body2" align="center" sx={{ width: "100%" }}>
                      No donors available at the moment.
                    </Typography>
                  )}
                </Grid>
              )}
            </>
          )}
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default DonorList;
