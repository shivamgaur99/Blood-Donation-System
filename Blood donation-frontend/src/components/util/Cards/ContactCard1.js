import React from "react";
import { Card, CardContent, Typography, CardActions, IconButton } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";
import Swal from "sweetalert2";

// Styled Card with hover effects
const StyledCard1 = styled(Card)(({ theme }) => ({
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

const ContactCard1 = ({ contact, onDelete }) => {
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
    <StyledCard1>
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
        <IconButton size="small" color="primary">
          <ReplyIcon />
        </IconButton>
        <IconButton size="small" color="error" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </StyledCard1>
  );
};

export default ContactCard1;
