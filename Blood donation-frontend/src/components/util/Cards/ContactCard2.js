import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import Swal from "sweetalert2";
import { styled } from '@mui/system';


// Styled Card with hover effects
const StyledCard2 = styled(Card)(({ theme }) => ({
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

const ContactCard2 = ({ contact, onDelete, onReply }) => {
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
    <StyledCard2>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {contact.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {contact.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Subject: {contact.subject}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Message: {contact.message}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Date: {new Date(contact.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onReply(contact)}>
          Reply
        </Button>
        <Button size="small" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </StyledCard2>
  );
};

export default ContactCard2;
