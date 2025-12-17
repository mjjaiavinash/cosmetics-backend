import { useState, useEffect } from 'react';
import { adminAuth } from '../../api/adminAuth';
import AdminLayout from '../../components/admin/AdminLayout';

function ManageAdmin() {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const result = await adminAuth.getAdmins();
      if (result.success) {
        setAdmins(result.admins);
      }
    } catch (error) {
      console.error('Failed to fetch admins:', error);
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (!newAdmin.username || !newAdmin.password) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const result = await adminAuth.addAdmin(newAdmin);
      if (result.success) {
        alert('Admin added successfully!');
        setNewAdmin({ username: '', password: '' });
        fetchAdmins();
      } else {
        alert(result.message || 'Failed to add admin');
      }
    } catch (error) {
      console.error('Add admin error:', error);
      alert(error.message || 'Network error - make sure backend is running');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (id) => {
    if (!confirm('Are you sure you want to delete this admin?')) return;
    
    try {
      const result = await adminAuth.deleteAdmin(id);
      if (result.success) {
        alert('Admin deleted successfully!');
        fetchAdmins();
      }
    } catch (error) {
      alert(error.message || 'Failed to delete admin');
    }
  };

  return (
    <AdminLayout>
      <div className="manage-admin">
        <h1>Manage Admins</h1>
        
        <div className="add-admin-section">
          <h2>Add New Admin</h2>
          <form onSubmit={handleAddAdmin} className="admin-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={newAdmin.username}
                onChange={(e) => setNewAdmin({...newAdmin, username: e.target.value})}
                placeholder="Enter username"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                placeholder="Enter password"
                required
              />
            </div>
            
            <button type="submit" disabled={loading} className="add-btn">
              {loading ? 'Adding...' : 'Add Admin'}
            </button>
          </form>
        </div>

        <div className="admins-list-section">
          <h2>Existing Admins</h2>
          <div className="admins-table">
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map(admin => (
                  <tr key={admin._id}>
                    <td>{admin.username}</td>
                    <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button 
                        onClick={() => handleDeleteAdmin(admin._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ManageAdmin;