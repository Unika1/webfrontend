import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/BodyCare.css"; // Import your CSS file
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";

const BodyCare = () => {
  const [remedies, setRemedies] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [procedure, setProcedure] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setError("");
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setError("");
  };

  const handleProcedureChange = (e) => {
    setProcedure(e.target.value);
    setError("");
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate that all fields are filled
    if (!title.trim() || !description.trim() || !procedure.trim() || !imageFile) {
      setError("All fields (title, description, procedure, and image) are required.");
      return;
    }
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('procedure', procedure);
    formData.append('image', imageFile);
  
    try {
      const response = await axios.post('http://localhost:5000/api/remedies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,  // Send the token in the request header
        },
      });
      setError("");
      navigate("/body-care/remedies");
    } catch (error) {
      setError("Failed to add remedy. Please try again.");
    }
  };

  return (
    <div className="bodycare">
      <Navbar />
      <div className="bodycare-container">
        <h1>Add Body Care Remedy</h1>
        <form className="remedy-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}

          <label>Remedy Title:</label>
          <input
            type="text"
            placeholder="Enter remedy title"
            value={title}
            onChange={handleTitleChange}
          />

          <label>Remedy Description:</label>
          <textarea
            placeholder="Enter remedy description"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>

          <label>Procedure:</label>
          <textarea
            placeholder="Enter procedure details"
            value={procedure}
            onChange={handleProcedureChange}
          ></textarea>

          <label>Remedy Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          <button type="submit">Add Remedy</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default BodyCare;
