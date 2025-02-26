import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/FaceCare.css";
import Footer from "../Footer";
import Navbar from "../Navbar";
import axios from "axios";

const FaceCare = () => {
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

    const token = localStorage.getItem('token');  // Assuming the token is stored in localStorage

    if (!token) {
      setError("You must be logged in to add a remedy.");
      return;
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('procedure', procedure);
    formData.append('image', imageFile);


    console.log([...formData]);
    console.log("Token: ", token);

    try {
      const response = await axios.post('http://localhost:5000/api/remedies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,  // Include the token in the header
        },
      });
      console.log('API Response:', response.data);
      setError("");
      navigate("/admin");
    } catch (error) {
      console.error("Error:", error.response || error.message);
      setError("Failed to add remedy. You must be admin to add.");
    }
  };

  return (
    <div className="facecare">
      <Navbar/>
      <div className="facecare-container">
        <h1>Add Face Care Remedy</h1>
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
      <Footer/>
    </div>
  );
};

export default FaceCare;
