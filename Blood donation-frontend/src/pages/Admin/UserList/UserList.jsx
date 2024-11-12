import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user list from the server
    axios
      .get('http://localhost:8181/userlist')
      .then((response) => {
        // Set the users state with the fetched data
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Age</th>
            <th>Blood Group</th>
            <th>Gender</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.bloodgroup}</td>
              <td>{user.gender}</td>
              <td>{user.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
