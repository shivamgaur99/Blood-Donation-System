import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { END_POINT } from "../../../config/api";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  ThemeProvider,
  createTheme,
} from "@mui/material";

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

function AddDonors(props) {
  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [units, setUnits] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let dark = props.theme;

  const handleSubmit = (event) => {
    event.preventDefault();

    const donorData = {
      name,
      bloodGroup,
      units,
      mobile,
      gender,
      age,
      city,
      address,
      date,
    };

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "User is not authenticated. Please login again.",
      });
      return;
    }

    setIsLoading(true); // Start loading

    axios
      .post(`${END_POINT}/add`, donorData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setIsLoading(false); // Stop loading
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Donation data added successfully!",
        });
        resetForm();
      })
      .catch((error) => {
        setIsLoading(false); // Stop loading
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add donation data. Please try again later.",
        });
      });
  };

  const resetForm = () => {
    setName("");
    setBloodGroup("");
    setUnits("");
    setMobile("");
    setGender("");
    setAge("");
    setCity("");
    setAddress("");
    setDate("");
  };

  const isFormValid = () => {
    return (
      name &&
      bloodGroup &&
      units &&
      mobile &&
      gender &&
      age &&
      city &&
      address &&
      date
    );
  };

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        sx={{
          minHeight: "100vh",
          padding: 2,
          backgroundColor: dark ? "#121212" : "#ffffff", // solid background colors
        }}
      >
        <div style={{ width: "80%", maxWidth: 800 }}>
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
            Add Donor
          </Typography>

          <form onSubmit={handleSubmit} >
            <Grid container spacing={2}>
              {/* Name Field */}
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter donor's full name"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: dark ? "#333" : "#f5f5f5",
                    },
                    "& .MuiInputLabel-root": {
                      color: dark ? "#ccc" : "#000",
                    },
                    "& .MuiInputBase-input": {
                      color: dark ? "#fff" : "#000",
                    },
                  }}
                />
              </Grid>

              {/* Blood Group and Units */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required   sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: dark ? "#333" : "#f5f5f5",
    },
    "& .MuiInputLabel-root": {
      color: dark ? "#ccc" : "#000",
    },
    "& .MuiInputBase-input": {
      color: dark ? "#fff" : "#000",
    },
  }}>
                  <InputLabel>Blood Group</InputLabel>
                  <Select
                    label="Blood Group"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                  >
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Units"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  required
                  placeholder="Enter units of blood"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: dark ? "#333" : "#f5f5f5",
                    },
                    "& .MuiInputLabel-root": {
                      color: dark ? "#ccc" : "#000",
                    },
                    "& .MuiInputBase-input": {
                      color: dark ? "#fff" : "#000",
                    },
                  }}
                />
              </Grid>

              {/* Mobile and Gender */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mobile"
                  variant="outlined"
                  fullWidth
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  placeholder="Enter mobile number"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: dark ? "#333" : "#f5f5f5",
                    },
                    "& .MuiInputLabel-root": {
                      color: dark ? "#ccc" : "#000",
                    },
                    "& .MuiInputBase-input": {
                      color: dark ? "#fff" : "#000",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required   sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: dark ? "#333" : "#f5f5f5",
    },
    "& .MuiInputLabel-root": {
      color: dark ? "#ccc" : "#000",
    },
    "& .MuiInputBase-input": {
      color: dark ? "#fff" : "#000",
    },
  }}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    label="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Age, City and Address */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Age"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  placeholder="Enter age"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: dark ? "#333" : "#f5f5f5",
                    },
                    "& .MuiInputLabel-root": {
                      color: dark ? "#ccc" : "#000",
                    },
                    "& .MuiInputBase-input": {
                      color: dark ? "#fff" : "#000",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  variant="outlined"
                  fullWidth
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  placeholder="Enter city"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: dark ? "#333" : "#f5f5f5",
                    },
                    "& .MuiInputLabel-root": {
                      color: dark ? "#ccc" : "#000",
                    },
                    "& .MuiInputBase-input": {
                      color: dark ? "#fff" : "#000",
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  placeholder="Enter address"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: dark ? "#333" : "#f5f5f5",
                    },
                    "& .MuiInputLabel-root": {
                      color: dark ? "#ccc" : "#000",
                    },
                    "& .MuiInputBase-input": {
                      color: dark ? "#fff" : "#000",
                    },
                  }}
                />
              </Grid>

              {/* Date */}
              <Grid item xs={12}>
                <TextField
                  label="Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: dark ? "#333" : "#f5f5f5",
                    },
                    "& .MuiInputLabel-root": {
                      color: dark ? "#ccc" : "#000",
                    },
                    "& .MuiInputBase-input": {
                      color: dark ? "#fff" : "#000",
                    },
                  }}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12} textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isFormValid() || isLoading}
                  fullWidth
                >
                  {isLoading ? <CircularProgress size={24} /> : "Submit"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default AddDonors;
