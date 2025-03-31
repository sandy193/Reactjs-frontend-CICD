import React, { useState, useEffect } from "react";
import axios from "axios";

// Main App Component
function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Fetch the list of users from the backend on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/users/");
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Function to handle form submission and send data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission (page reload)

    if (!name || !email) {
      setError("Both name and email are required.");
      return;
    }

    try {
      // Send the data to the FastAPI backend (POST request)
      await axios.post("http://127.0.0.1:8000/users/", {
        name,
        email,
        amount,
      });
      
      // Clear form and fetch updated user list
      setName("");
      setEmail("");
      setAmount("")
      fetchUsers();
    } catch (err) {
      setError("Error submitting form: " + err.response?.data?.detail || err.message);
    }
  };

  return (
    <div className="App">
      <h1>User Management</h1>

      {/* Error message */}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* Form to add a new user */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <button type="submit">Add User</button>
      </form>

      {/* Display list of users */}
      <h2>Users List</h2>
      <ul>
        {users.length === 0 ? (
          <p>No users found!</p>
        ) : (
          users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
