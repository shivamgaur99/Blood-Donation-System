import React, { useState, useEffect } from "react";
import axios from "axios";
import { END_POINT } from "../../../config/api";
import { SimpleToast } from "../../../components/util/Toast/Toast";
import { useToast } from "../../../services/toastService";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Grid, Card, CardContent, Typography, CardActions, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";  // Import SweetAlert2
import Loader from "../../../components/util/Loader"; // Import your Loader component

// Styled Card with Glassmorphism and hover effects
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  margin: "auto",
  borderRadius: "20px",
  background: theme.palette.mode === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(15px)",
  border: theme.palette.mode === 'dark' ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(0, 0, 0, 0.2)",
  boxShadow: theme.palette.mode === 'dark' ? "0 4px 15px rgba(0, 0, 0, 0.1)" : "0 4px 15px rgba(255, 255, 255, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
    background: theme.palette.mode === 'dark' ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
  },
  padding: "20px",
}));

const ContactCard = ({ contact, onDelete }) => {
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete the contact from ${contact.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(contact.id);
      }
    });
  };

  return (
    <StyledCard>
      <CardContent sx={{ paddingBottom: "20px" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
          {contact.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "10px" }}>
          <strong>Email:</strong> {contact.email}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "10px" }}>
          <strong>Subject:</strong> {contact.subject}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "10px" }}>
          <strong>Message:</strong> {contact.message}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          <strong>Date:</strong> {new Date(contact.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          size="small"
          color="primary"
          sx={{
            backgroundColor: "#fff",
            borderRadius: "50%",
            padding: "8px",
            "&:hover": {
              backgroundColor: "",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <ReplyIcon />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          sx={{
            backgroundColor: "#fff",
            borderRadius: "50%",
            padding: "8px",
            "&:hover": {
              backgroundColor: "",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            },
          }}
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </StyledCard>
  );
};

const AllContacts = ({ theme }) => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast, showToast, hideToast } = useToast();
  const navigate = useNavigate();

  const fetchContacts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        throw new Error("User is not authenticated");
      }

      const response = await axios.get(`${END_POINT}/admin/contact-us/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContacts(response.data);
      showToast("Contact list loaded successfully", "success");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Authentication failed. Please login again.");
        navigate("/login");
      } else if (error.response && error.response.status === 404) {
        setError("Endpoint not found. Please check the API URL.");
      } else {
        setError("Failed to fetch contact list. Please try again later.");
      }
      showToast(error.message || "Failed to fetch contact list.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      Swal.fire('Error', 'No authorization token found!', 'error');
      return;
    }

    try {
      const response = await axios.delete(`${END_POINT}/admin/contact-us/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      showToast(response.data, "success");
      setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
    } catch (error) {
      Swal.fire('Error', 'Failed to delete contact.', 'error');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const muiTheme = createTheme({
    palette: {
      mode: theme ? "dark" : "light",
      primary: {
        main: theme ? "#90caf9" : "#1976d2",
      },
      background: {
        default: theme ? "#121212" : "#fff",
        paper: theme ? "#1e1e1e" : "#f5f5f5",
      },
      text: {
        primary: theme ? "#fff" : "#000",
      },
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <div style={{ backgroundColor: theme ? "#121212" : "#fff", padding: "20px" }}>
        <Typography variant="h4" gutterBottom color="primary" sx={{ textAlign: 'center', padding: '20px 0' }}>
          All Contacts
        </Typography>

        {isLoading ? (
          <Loader /> // Display Loader component when loading
        ) : error ? (
          <Typography variant="body1" color="error" sx={{ textAlign: 'center', padding: '100px 0' }}>
            {error}
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {contacts.length > 0 ? (
              contacts.map((contact, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <ContactCard contact={contact} onDelete={handleDelete} />
                </Grid>
              ))
            ) : (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', padding: '100px 0' }}>
                No contacts found.
              </Typography>
            )}
          </Grid>
        )}

        <SimpleToast
          open={toast.open}
          severity={toast.severity}
          message={toast.message}
          handleCloseToast={hideToast}
        />
      </div>
    </ThemeProvider>
  );
};

export default AllContacts;
