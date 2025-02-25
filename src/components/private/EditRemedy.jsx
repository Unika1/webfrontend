import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../style/EditRemedy.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

const EditRemedy = () => {
  const { id } = useParams(); // Get remedy ID from URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [procedure, setProcedure] = useState("");
  const [image, setImage] = useState(""); // Existing image
  const [newImage, setNewImage] = useState(null); // New uploaded image
  const [error, setError] = useState("");

  // Fetch existing remedy details
  useEffect(() => {
    const fetchRemedy = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/remedies/${id}`);
        const { title, description, procedure, image } = response.data;
        setTitle(title);
        setDescription(description);
        setProcedure(procedure);
        setImage(image); // Set existing image
      } catch (error) {
        console.error("Failed to fetch remedy:", error);
        setError("Failed to fetch remedy details.");
      }
    };
    fetchRemedy();
  }, [id]);

  // Handle image change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]); // Store new image
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !procedure.trim()) {
      setError("All fields (title, description, instruction) are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("instruction", procedure);

    if (newImage) {
      formData.append("image", newImage); // Upload new image if selected
    } else {
      formData.append("existingImage", image); // Keep old image
    }

    try {
      await axios.put(`http://localhost:5000/api/remedies/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/facecare"); // Redirect back to FaceCareRemedies
    } catch (error) {
      console.error("Failed to update remedy:", error);
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

        <label>Instruction:</label>
        <textarea value={instruction} onChange={(e) => setInstruction(e.target.value)} />

        <label>Current Image:</label>
        <img src={`http://localhost:5000/uploads/${image}`} alt="Current Remedy" className="current-image" />

        <label>Upload New Image (Optional):</label>
        <input type="file" onChange={handleImageChange} />

        <button type="submit">Update Remedy</button>
      </form>

      <Footer />
    </div>
  );
};

export default EditRemedy;
