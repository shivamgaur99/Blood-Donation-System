import React, { useEffect, useState, useCallback } from "react";
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
  ToggleButton,
  ToggleButtonGroup, // Import the necessary components
} from "@mui/material";
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

const Donations = (props) => {
  const [donorList, setDonorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [viewMode, setViewMode] = useState("table");

  const { toast, showToast, hideToast } = useToast();
  const dark = props.theme;

  const fetchDonationHistory = useCallback(() => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      setError("User is not authenticated");
      setLoading(false);
      showToast("User is not authenticated", "error");
      return;
    }

    axios
      .get(`${END_POINT}/user-donors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDonorList(response.data);
        setLoading(false);
        showToast("Donation history loaded successfully", "success");
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to fetch donation history. Please try again later.");
        setLoading(false);
        showToast(
          error.message ||
            "Failed to fetch donation history. Please try again later.",
          "error"
        );
      });
  }, [showToast]);

  useEffect(() => {
    fetchDonationHistory();
  }, [fetchDonationHistory]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedDonors = donorList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
            Donation History
          </Typography>   

          <Box textAlign="center" sx={{ marginBottom: 2 }}>
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
          </Box>

          {/* Loading Spinner */}
          {loading && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="80vh"
            >
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
                            <TableCell>
                              {donor.age || "Not Available"}
                            </TableCell>
                            <TableCell>
                              {donor.gender || "Not Available"}
                            </TableCell>
                            <TableCell>
                              {donor.bloodGroup || "Not Available"}
                            </TableCell>
                            <TableCell>
                              {donor.city || "Not Available"}
                            </TableCell>
                            <TableCell>
                              {donor.mobile || "Not Available"}
                            </TableCell>
                            <TableCell>
                              {donor.units || "Not Available"}
                            </TableCell>
                            <TableCell>
                              {donor.date || "Not Available"}
                            </TableCell>
                            <TableCell>
                              <Button variant="contained" color="primary">
                                View Event
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
                    count={donorList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableContainer>
              ) : (
                <Grid container spacing={3}>
                  {donorList.length > 0 ? (
                    donorList.map((donor) => (
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
                            <Button variant="contained" color="primary">
                              View Event
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Typography variant="h6" align="center">
                      No donors available at the moment.
                    </Typography>
                  )}
                </Grid>
              )}
            </>
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
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default Donations;
