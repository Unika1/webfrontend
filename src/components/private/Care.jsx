import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../style/Care.css";
import Footer from "../Footer";
import Navbar from "../Navbar";

const Care = ({ category }) => {
  const [remedies, setRemedies] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [procedure, setProcedure] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchRemedies = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/remedies?category=${category}`);
        setRemedies(response.data);
      } catch (error) {
        console.error("Failed to fetch remedies:", error);
      }
    };
    fetchRemedies();
    
    const userRole = localStorage.getItem("role"); // Assuming role is stored in localStorage
    setIsAdmin(userRole === "admin");
  }, [category]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !procedure.trim() || !imageFile) {
      setError("All fields are required.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to add a remedy.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("procedure", procedure);
    formData.append("image", imageFile);
    formData.append("category", category);

    try {
      await axios.post("http://localhost:5000/api/remedies", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setError("");
      navigate(`/${category}-care/remedies`);
    } catch (error) {
      console.error("Error:", error.response || error.message);
      setError("Failed to add remedy. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/remedies/${id}`);
      setRemedies(remedies.filter((remedy) => remedy.id !== id));
    } catch (error) {
      console.error("Failed to delete remedy:", error);
    }
  };

  return (
    <div className="care">
      <Navbar />
      <div className="care-container">
        {isAdmin && (
          <>
            <h1>Add {category} Care Remedy</h1>
            <form className="remedy-form" onSubmit={handleSubmit}>
              {error && <p className="error-message">{error}</p>}
              <label>Remedy Title:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              <label>Remedy Description:</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
              <label>Procedure:</label>
              <textarea value={procedure} onChange={(e) => setProcedure(e.target.value)} />
              <label>Remedy Image:</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <button type="submit">Add Remedy</button>
            </form>
          </>
        )}
        <h2>{category} Care Remedies</h2>
        <div className="remedy-list">
          {remedies.map((remedy) => (
            <div key={remedy.id} className="remedy-card" onClick={() => navigate(`/${category}-care/details/${remedy.id}`)}>
              <img src={`http://localhost:5000/uploads/${remedy.image}`} alt={remedy.title} />
              <h3>{remedy.title}</h3>
              <p>{remedy.description}</p>
              {isAdmin && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); navigate(`/admin/edit/${remedy.id}`); }}>Edit</button>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(remedy.id); }}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Care;
