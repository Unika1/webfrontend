import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../style/AdminEdit.css"; 
import Navbar from "../Navbar";
import Footer from "../Footer";

const AdminEdit = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instruction, setInstruction] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Get the remedy ID from URL

  useEffect(() => {
    // Fetch remedy details by ID
    const fetchRemedy = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/remedies/${id}`);
        const remedy = response.data;
        setTitle(remedy.title);
        setDescription(remedy.description);
        setInstruction(remedy.instruction);
      } catch (error) {
        console.error("Failed to fetch remedy:", error);
        setError("Failed to fetch remedy");
      }
    };
    fetchRemedy();
  }, [id]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (!title.trim() || !description.trim() || !instruction.trim()) {
      setError("All fields (title, description, instruction) are required.");
      return;
    }

    // Create form data for image upload (if new image is selected)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("instruction", instruction);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.put(`http://localhost:5000/api/remedies/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      // Redirect to admin panel after successful update
      navigate("/admin");
    } catch (error) {
      console.error("Failed to update remedy:", error);
      setError("Failed to update remedy");
    }
  };

  return (
    <div className="admin-edit">
      <Navbar />
      <h1>Edit Remedy</h1>
      <form onSubmit={handleSubmit} className="admin-edit-form">
        {error && <p className="error-message">{error}</p>}

        <label>Remedy Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Remedy Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Instruction:</label>
        <textarea
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
        ></textarea>

        <label>Remedy Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <button type="submit">Save Changes</button>
      </form>
      <Footer />
    </div>
  );
};

export default AdminEdit;
