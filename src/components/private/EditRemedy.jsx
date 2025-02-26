import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../style/EditRemedy.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

const EditRemedy = () => {
  const { id } = useParams(); // Retrieve the ID from the URL
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [procedure, setProcedure] = useState("");  // Make sure this is used consistently
  const [existingImage, setExistingImage] = useState(""); 
  const [selectedFile, setSelectedFile] = useState(null); 
  const [error, setError] = useState("");

  
  // Fetch existing remedy details
  useEffect(() => {
    const fetchRemedy = async () => {
      console.log("ID from URL:", id); 
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        const response = await axios.get(`http://localhost:5000/api/remedies/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the Authorization header
          }
        });
        console.log("Fetched remedy data:", response.data);
        const { title, description, procedure, image } = response.data;
        setTitle(title);
        setDescription(description);
        setProcedure(procedure);  // Correctly set procedure here
        setExistingImage(image); // Use existingImage state correctly
      } catch (error) {
        console.error("Error updating remedy:", error.response?.data || error.message);
        setError("Failed to fetch remedy details.");
      }
    };
    fetchRemedy();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !procedure.trim()) {
      setError("All fields (title, description, procedure) are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("procedure", procedure);
    
    if (selectedFile) {
      formData.append("image", selectedFile);
    } else {
      formData.append("existingImage", existingImage); // Pass the existing image if no new file is selected
    }

    console.log("Sending data:", Object.fromEntries(formData.entries())); // Debugging
    // Log FormData for debugging
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const response = await axios.put(`http://localhost:5000/api/remedies/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Form data type
          Authorization: `Bearer ${token}`, // Send token in the Authorization header
        },
      });
      console.log("Update response:", response.data);
      const updatedCategoryId = response.data.categoryId; // Assuming the categoryId is in the response data
      
      // Redirect based on the categoryId
      if (updatedCategoryId === 1) {
        navigate("/body-care/remedies");
      } else if (updatedCategoryId === 2) {
        navigate("/hair-care/remedies");
      } else if (updatedCategoryId === 3) {
        navigate("/face-care/remedies");
      } else {
        navigate("/homepage"); // Fallback, in case of no matching category
      }
    } catch (error) {
      console.error("Error updating remedy:", error);
      setError("Failed to update remedy.");
    }
  };

  return (
    <div className="edit-remedy">
      <Navbar />
      <h1>Edit Remedy</h1>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="edit-remedy-form">
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Procedure:</label>
        <textarea value={procedure} onChange={(e) => setProcedure(e.target.value)} />

        <label>Current Image:</label>
        <img src={`http://localhost:5000/uploads/${existingImage}`} alt="Current Remedy" className="current-image" />

        <label>Upload New Image (Optional):</label>
        <input type="file" name="image" onChange={(e) => setSelectedFile(e.target.files[0])} />

        <button type="submit">Update Remedy</button>
      </form>

      <Footer />
    </div>
  );
};

export default EditRemedy;
