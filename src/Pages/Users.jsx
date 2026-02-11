import React, { useEffect, useState } from "react";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const emptyUser = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    image: ""
  };

  const [formData, setFormData] = useState(emptyUser);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleChange = e =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = e => {
    e.preventDefault();

    if (editId) {
      setUsers(prev =>
        prev.map(u => (u.id === editId ? { ...u, ...formData } : u))
      );
    } else {
      setUsers(prev => [{ id: Date.now(), ...formData }, ...prev]);
    }

    setFormData(emptyUser);
    setEditId(null);
    setShowModal(false);
  };

  const handleEdit = user => {
    setEditId(user.id);
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      company: user.company?.name || user.company || "",
      image: user.image || ""
    });
    setShowModal(true);
  };

  const handleDelete = id => {
    if (window.confirm("Delete this user?")) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>Users</h2>
        <button className="add-user-btn" onClick={() => setShowModal(true)}>
          + Add User
        </button>
      </div>

      <div className="users-grid">
        {users.map(user => (
          <div className="user-card" key={user.id}>
            <img
              src={
                user.image
                  ? user.image
                  : `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`
              }
              alt={user.firstName}
            />

            <div className="user-name">
              {user.firstName} {user.lastName}
            </div>

            <div className="user-email">{user.email}</div>
            <div className="user-phone">{user.phone}</div>

            <div className="user-actions">
              <button onClick={() => handleEdit(user)}>✏️</button>
              <button onClick={() => handleDelete(user.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>{editId ? "Edit User" : "Add User"}</h2>
            <form className="modal-form" onSubmit={handleSave}>
              <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
              <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
              <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
              <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} />
             
              <div className="modal-actions">
                <button className="save-btn">Save</button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowModal(false);
                    setEditId(null);
                    setFormData(emptyUser);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
