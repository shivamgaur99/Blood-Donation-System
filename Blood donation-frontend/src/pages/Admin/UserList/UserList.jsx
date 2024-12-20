import React, { useState, useEffect } from "react";
import axios from "axios";
import { END_POINT } from "../../../config/api";
import useToast from "../../../hooks/useToast";
import Loader from "../../../components/util/Loader";
import {
  IconButton,
  TextField,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // For Update role icon

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

function UserList(props) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
  const [viewMode, setViewMode] = useState("table"); // Default view is table
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(""); // Blood group filter
  const [openDialog, setOpenDialog] = useState(false); // For dialog open/close
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // User whose role is being updated
  const [newRole, setNewRole] = useState(""); // New selected role
  const { showToast, SnackbarToast } = useToast();

  let dark = props.theme;

  const fetchUsers = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setError("No authentication token found.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${END_POINT}/admin/userlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
      setFilteredUsers(response.data); // Initialize filtered users
      setLoading(false);
      showToast("User list fetched successfully!", "success");
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 401) {
        setError("Authentication failed. Please login again.");
      } else {
        setError("Failed to fetch users. Please try again later.");
      }
      setLoading(false);
      showToast(error.message || "Failed to fetch users.", "error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter users based on the search query
    const filtered = users.filter(
      (user) =>
        (user.username.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)) &&
        (selectedBloodGroup ? user.bloodgroup === selectedBloodGroup : true)
    );
    setFilteredUsers(filtered);
  };

  const handleBloodGroupChange = (event) => {
    const selectedGroup = event.target.value;
    setSelectedBloodGroup(selectedGroup);

    // Filter users based on the selected blood group and search query
    const filtered = users.filter(
      (user) =>
        (user.username.toLowerCase().includes(searchQuery) ||
          user.email.toLowerCase().includes(searchQuery)) &&
        (selectedGroup ? user.bloodgroup === selectedGroup : true)
    );
    setFilteredUsers(filtered);
  };

  const handleDeleteDialogOpen = (user) => {
    if (user) {
      setSelectedUser(user);
      setOpenDeleteDialog(true);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedUser(null);  // Reset selected user
  };

  const handleDeleteUser = () => {
    if (!selectedUser) {
      showToast("No user selected for deletion.", "error");
      return;
    }

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      showToast("No authentication token found.", "error");
      return;
    }

    axios
      .delete(`${END_POINT}/user/${selectedUser.email}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setUsers(users.filter((user) => user.email !== selectedUser.email));
        setFilteredUsers(
          filteredUsers.filter((user) => user.email !== selectedUser.email)
        ); // Update filtered users as well
        showToast("User deleted successfully!", "success");
        setOpenDeleteDialog(false);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        showToast("Failed to delete user.", "error");
      });
  };

  const handleOpenRoleDialog = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setOpenDialog(true);
  };

  const handleCloseRoleDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setNewRole("");
  };

  const handleUpdateRole = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      showToast("No authentication token found.", "error");
      return;
    }

    if (!newRole) {
      showToast("Please select a role to update.", "error");
      return;
    }

    axios
      .put(
        `${END_POINT}/admin/updateRole/${selectedUser.email}?newRole=${newRole}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        showToast("User role updated successfully!", "success");
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === selectedUser.email
              ? { ...user, role: newRole }
              : user
          )
        );
        setFilteredUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === selectedUser.email
              ? { ...user, role: newRole }
              : user
          )
        );
        handleCloseRoleDialog();
      })
      .catch((error) => {
        console.error("Error updating role:", error);
        showToast("Failed to update user role.", "error");
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Paginate the filtered users list based on the current page and rows per page
  const paginatedUsers = filteredUsers.slice(
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
          backgroundColor: dark
            ? darkTheme.palette.background.default
            : lightTheme.palette.background.default,
        }}
      >
        <div style={{ width: "90%" }}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: "bold",
              color: dark
                ? darkTheme.palette.primary.main
                : lightTheme.palette.primary.main,
              margin: "20px",
            }}
          >
            User List
          </Typography>

          {/* Search and Blood Group Filter Section */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ marginBottom: 2 }}
          >
            <TextField
              variant="outlined"
              label="Search Users"
              value={searchQuery}
              onChange={handleSearch}
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
          {loading && <Loader />}

          {/* Error Message */}
          {error && (
            <Typography variant="h6" align="center" color="error">
              {error}
            </Typography>
          )}

          {/* Display Users */}
          {!loading && !error && (
            <>
              {viewMode === "table" ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Blood Group</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Mobile</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedUsers.map((user) => (
                        <TableRow key={user.email}>
                          <TableCell>{user.username}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.age}</TableCell>
                          <TableCell>{user.bloodgroup}</TableCell>
                          <TableCell>{user.gender}</TableCell>
                          <TableCell>{user.mobile}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <IconButton
                              color="primary"
                              onClick={() => handleOpenRoleDialog(user)}
                              aria-label="edit role"
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleDeleteDialogOpen(user)}
                              aria-label="delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableContainer>
              ) : (
                // Card View
                <Grid container spacing={3}>
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user) => (
                      <Grid item xs={12} sm={6} md={4} key={user.email}>
                        <Card>
                          <CardHeader title={user.username} />
                          <CardContent>
                            <Typography variant="body2">
                              Email: {user.email}
                            </Typography>
                            <Typography variant="body2">
                              Age: {user.age}
                            </Typography>
                            <Typography variant="body2">
                              Blood Group: {user.bloodgroup}
                            </Typography>
                            <Typography variant="body2">
                              Gender: {user.gender}
                            </Typography>
                            <Typography variant="body2">
                              Mobile: {user.mobile}
                            </Typography>
                            <Typography variant="body2">
                              Role: {user.role}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <IconButton
                              color="primary"
                              onClick={() => handleOpenRoleDialog(user)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleDeleteDialogOpen(user)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Typography variant="h6" align="center">
                      No users available.
                    </Typography>
                  )}
                </Grid>
              )}
            </>
          )}

          {/* Dialog for Role Update */}
          <Dialog open={openDialog} onClose={handleCloseRoleDialog}>
            <DialogTitle>Update User Role</DialogTitle>
            <DialogContent>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  label="Role"
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="volunteer">Volunteer</MenuItem>
                  <MenuItem value="moderator">Moderator</MenuItem>
                  {/* Add more roles as needed */}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseRoleDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleUpdateRole} color="secondary">
                Update
              </Button>
            </DialogActions>
          </Dialog>

           {/* Delete Confirmation Dialog */}
           <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
            <DialogTitle>Delete User</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to delete this user?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDeleteUser} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>

           {/* Snackbar Toast */}
           <SnackbarToast />
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default UserList;
