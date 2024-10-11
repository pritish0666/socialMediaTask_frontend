import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 
const UserSubmissionForm = () => {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImages([...e.target.files]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("handle", handle);
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post(
        "https://socialmediatask-backend.onrender.com/api/users",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("User data submitted successfully!");
      console.log(response.data);
      navigate("/admin");
    } catch (err) {
      console.error(
        "Submission error:",
        err.response ? err.response.data : err.message
      );
      alert("Submission failed.");
    }

  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h3 className="card-title">User Submission Form</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={handle}
              placeholder="Enter social media handle"
              onChange={(e) => setHandle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              multiple
              onChange={handleImageChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <button
          onClick={() => navigate("/admin")}
          className="btn btn-success mt-3"
        >
          Go to Admin Page
        </button>
      </div>
    </div>
  );
};

export default UserSubmissionForm;
