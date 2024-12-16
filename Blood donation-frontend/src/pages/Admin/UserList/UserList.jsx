import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { END_POINT } from "../../../config/api";
import { SimpleToast } from "../../../components/util/Toast/Toast";
import { useToast } from "../../../services/toastService";
import Loader from "../../../components/util/Loader"; 
import Swal from 'sweetalert2';
import { IconButton } from '@mui/material';  
import DeleteIcon from '@mui/icons-material/Delete';  

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast, showToast, hideToast } = useToast(); 

  const fetchUsers = async () => {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      setError('No authentication token found.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${END_POINT}/admin/userlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      setLoading(false);
      showToast('User list fetched successfully!', 'success');
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 401) {
        setError('Authentication failed. Please login again.');
      } else if (error.response && error.response.status === 404) {
        setError('Endpoint not found. Please check the API URL.');
      } else {
        setError('Failed to fetch users. Please try again later.');
      }
      setLoading(false);
      showToast(error.message || 'Failed to fetch users.', 'error');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = (email) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      showToast('No authentication token found.', 'error');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${END_POINT}/user/${email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            setUsers(users.filter((user) => user.email !== email));
            showToast('User deleted successfully!', 'success');
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
            showToast('Failed to delete user.', 'error');
          });
      }
    });
  };

  return (
    <div className="container my-5">
      <h1 className="text-center text-primary mb-4">User List</h1>

      {loading ? (
        <div className="text-center">
          <Loader /> {/* Show Loader component */}
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : users.length === 0 ? (
        <div className="alert alert-info text-center">No users available.</div>
      ) : (
        <div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Blood Group</th>
                  <th>Gender</th>
                  <th>Mobile</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.email} className="table-row">
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>{user.bloodgroup}</td>
                    <td>{user.gender}</td>
                    <td>{user.mobile}</td>
                    <td>{user.role}</td>
                    <td>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteUser(user.email)}
                        aria-label="delete"
                      >
                        <DeleteIcon /> {/* Delete icon */}
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <SimpleToast
        open={toast.open}
        severity={toast.severity}
        message={toast.message}
        handleCloseToast={hideToast}
      />
    </div>
  );
}

export default UserList;
