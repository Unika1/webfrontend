import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/FaceCareRemedies.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

const FaceCareRemedies = () => {
  const [remedies, setRemedies] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const categoryId = 3;
  
  // Fetch remedies
  useEffect(() => {
    const fetchRemedies = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/remedies/category/${categoryId}`);
        setRemedies(response.data);
      } catch (error) {
        console.error("Failed to fetch remedies:", error);
        setError("Failed to fetch remedies");
      }
    };
    fetchRemedies();
  }, [categoryId]);

  // Check if user is admin
  const isAdmin = localStorage.getItem("role") === "admin"; 

  // Handle Edit Remedy
  const handleEdit = (id) => {
    navigate(`/edit-remedy/${id}`);
  };

  // Handle Delete Remedy
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/remedies/${id}`);
      setRemedies(remedies.filter((remedy) => remedy.id !== id));
    } catch (error) {
      console.error("Failed to delete remedy:", error);
    }
  };

  return (
    <div className="facecare-remedies">
      <Navbar />
      <h1>Face Care Remedies</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="remedy-list">
        {remedies.map((remedy) => (
          <div key={remedy.id} className="remedy-card">
            <img src={`http://localhost:5000/uploads/${remedy.image}`} alt={remedy.title} />
            <h3>{remedy.title}</h3>
            <p>{remedy.description}</p>
            
            {/* Clickable Remedy Box */}
            <button onClick={() => navigate(`/facecare/details/${remedy.id}`)}>View Details</button>

            {/* Show Edit & Delete Buttons Only for Admin */}
            {isAdmin && (
              <>
                <button onClick={() => handleEdit(remedy.id)}>Edit</button>
                <button onClick={() => handleDelete(remedy.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default FaceCareRemedies;
