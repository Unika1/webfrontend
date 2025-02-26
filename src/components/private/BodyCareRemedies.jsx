import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/BodyCareRemedies.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

const BodyCareRemedies = () => {
  const [remedies, setRemedies] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const categoryId = 2;

  useEffect(() => {
    const fetchRemedies = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/remedies/category/${categoryId}`);
        console.log("Fetched data:", response.data);
        setRemedies(response.data);
      } catch (error) {
        console.error("Failed to fetch remedies:", error);
        setError("Failed to fetch remedies");
      }
    };
    fetchRemedies();
  }, [categoryId]);

  const isAdmin = localStorage.getItem("role") === "admin";

  const handleEdit = (id) => {
    navigate(`/edit-remedy/${id}`);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/remedies/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
      },
    });
    setRemedies((prevRemedies) => prevRemedies.filter((remedy) => remedy.id !== id));
    } catch (error) {
      console.error("Failed to delete remedy:", error);
    }
  };

  return (
    <div className="bodycare-remedies">
      <Navbar />
      <h1>Body Care Remedies</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="remedy-listb">
        {remedies.map((remedy) => (
          <div key={remedy.id} className="remedy-cardb">
            <img 
              src={`http://localhost:5000/uploads/${remedy.image}`} 
              alt={remedy.title} 
              style={{ width: "200px", height: "200px", objectFit: "cover" }} 
            />
            <h3>{remedy.title}</h3>
            <p>{remedy.description}</p>
            <button onClick={() => navigate(`/body-care/details/${remedy.id}`)}>View Details</button>
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

export default BodyCareRemedies;