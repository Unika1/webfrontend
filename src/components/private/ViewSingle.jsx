import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../style/ViewRemedy.css"; // New styling for view-only page
import Navbar from "../Navbar";
import Footer from "../Footer";

const ViewSingle = () => {
  const { id } = useParams(); // Retrieve the ID from the URL
  
  const [remedy, setRemedy] = useState(null); // Store fetched remedy data
  const [error, setError] = useState(""); // Error state

  // Fetch remedy details when component mounts
  useEffect(() => {
    const fetchRemedy = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        const response = await axios.get(`http://localhost:5000/api/remedies/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the Authorization header
          },
        });
        setRemedy(response.data); // Set fetched remedy data
      } catch (error) {
        console.error("Error fetching remedy:", error.response?.data || error.message);
        setError("Failed to fetch remedy details.");
      }
    };
    fetchRemedy();
  }, [id]);

  // If remedy is not found, display an error message
  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  // If remedy is still loading, show a loading message
  if (!remedy) {
    return <p>Loading remedy details...</p>;
  }

  return (
    <div className="view-remedy">
      <Navbar />
      <h1>{remedy.title}</h1>
      <p><strong>Description:</strong> {remedy.description}</p>
      <p><strong>Procedure:</strong> {remedy.procedure}</p>

      {remedy.image && (
        <div className="remedy-image">
          <img src={`http://localhost:5000/uploads/${remedy.image}`} alt="Remedy" />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ViewSingle;
