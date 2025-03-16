import React, { useEffect, useState } from 'react';
import axios from 'axios';
//'../styling/AdminProfile.css';

function AdminProfile() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  // Fetch all users and authors
  async function fetchUsers() {
    try {
      const res = await axios.get('http://localhost:3000/admin-api/users');
      if (res.data.message === 'users') {
        setUsers(res.data.payload);
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      setError('Failed to fetch users');
      console.error(error);
    }
  }

  // Toggle user activation status
  async function toggleUserStatus(userId, isActive) {
    try {
      await axios.patch(`http://localhost:3000/admin-api/user/${userId}`, { isActive: !isActive });
      setUsers(users.map(user => user.userId === userId ? { ...user, isActive: !isActive } : user));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='container mt-4'>
      <h2 className='text-center'>Admin Panel - Manage Users & Authors</h2>
      {error && <p className='alert alert-danger'>{error}</p>}
      <table className='table table-striped mt-3'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.userId}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.isActive ? 'Active' : 'Blocked'}</td>
                <td>
                  <button 
                    className={`btn ${user.isActive ? 'btn-danger' : 'btn-success'}`} 
                    onClick={() => toggleUserStatus(user.userId, user.isActive)}
                  >
                    {user.isActive ? 'Block' : 'Unblock'}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5' className='text-center'>No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProfile;
