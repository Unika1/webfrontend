import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../style/EditRemedy.css";

const EditRemedy = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [procedure, setProcedure] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRemedy = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/remedies/${id}`);
        const remedy = response.data;
        setTitle(remedy.title);
        setDescription(remedy.description);
        setProcedure(remedy.procedure);
        setCategoryId(remedy.categoryId);
        setExistingImage(remedy.image ? `http://localhost:5000/uploads/${remedy.image}` : null);
      } catch (error) {
        console.error("Failed to fetch remedy:", error);
        setError("Failed to load remedy details.");
      }
    };

    fetchRemedy();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      setExistingImage(URL.createObjectURL(file)); // Show preview of new image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("procedure", procedure);
    formData.append("categoryId", categoryId);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ No token found. Please log in again.");
      setError("Unauthorized: Please log in again.");
      setLoading(false);
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/remedies/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Remedy updated successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("❌ Error updating remedy:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Failed to update remedy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-remedy-wrapper">
      <div className="edit-remedy-container">
        <h2>Edit Remedy</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit} className="edit-remedy-form">
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Procedure</label>
            <textarea value={procedure} onChange={(e) => setProcedure(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Category ID</label>
            <input type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required />
          </div>

          <div className="form-group file-upload">
            <label>Upload New Image</label>
            <input type="file" onChange={handleImageChange} />
            {existingImage && (
              <div className="image-preview">
                <p>Image Preview:</p>
                <img src={existingImage} alt="Selected Preview" />
              </div>
            )}
          </div>

          <button type="submit" className="save-button" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRemedy;
