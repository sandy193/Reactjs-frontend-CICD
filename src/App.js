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
     

      {/* Error message */}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* Form to add a new user */}
      <div className="table-design pt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-sm-12 col-12">
              <h1 className="text-center mb-4">User Management</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input type="text" class="form-control" value={name} onChange={e => setName(e.target.value)} id="floatingInput" placeholder="Enter Name" required />
                                <label for="floatingInput">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" class="form-control" value={email} onChange={e => setEmail(e.target.value)} id="floatingstartDate" placeholder="Enter Email" required />
                                <label for="floatingstartDate">Email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="number" class="form-control" id="floatingcompletionDate" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter Amount" required />
                                <label for="floatingcompletionDate">Amount</label>
                            </div>
                           <div className="form-group mb-3">
                                <button type="submit" className="btn btn-primary"> Submit </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

      {/* Display list of users */}
      <div className="container text-center pt-5">
        <h2>Users List</h2>
        <ul className="list-unstyled">
          {users.length === 0 ? (
            <p>No users found!</p>
          ) : (
            users.map((user) => (
              <li key={user.id} className="mb-2">
                {user.name} - {user.email}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
