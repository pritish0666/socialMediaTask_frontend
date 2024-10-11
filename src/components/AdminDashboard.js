import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      {users.length > 0 ? (
        <div className="list-group">
          {users.map((user) => (
            <div key={user._id} className="list-group-item">
              <h5 className="mb-1">{user.name}</h5>
              <p className="mb-1">
                <strong>Handle:</strong> {user.handle}
              </p>
              <div className="d-flex flex-wrap">
                {user.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Uploaded by ${user.name}`}
                    className="img-thumbnail mr-2 mb-2"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No users found.</p>
      )}
      <button onClick={() => navigate("/")} className="btn btn-primary mt-3">
        Go to Upload Data Page
      </button>
    </div>
  );
};

export default AdminDashboard;
