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
  // useEffect(() => {
  //   const fetchRemedies = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/remedies/category/${categoryId}`);
  //       console.log(response.data)
  //       setRemedies(response.data[0]);
  //       console.log(remedies)
  //       debugger
  //     } catch (error) {
  //       console.error("Failed to fetch remedies:", error);
  //       setError("Failed to fetch remedies");
  //     }
  //   };
  //   fetchRemedies();
  // }, [categoryId,remedies]);


  useEffect(() => {
    console.log("Updated remedies:", remedies);
  }, [remedies]);
  useEffect(() => {
    const fetchRemedies = async () => {
    try {
    const response = await axios.get(`http://localhost:5000/api/remedies/category/${categoryId}`);
    console.log("Fetched data:", response.data); 
    
    setRemedies(response.data);
    console.log(remedies)
    
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
  
  const handleSinglePage = (id) => {
    navigate(`/edit-remedy/${id}`);
  };

  // Handle Delete Remedy
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
    <div className="facecare-remedies">
      <Navbar />
      <h1>Face Care Remedies</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="remedy-listf">
  
        {remedies.map((remedy) => (
          <div key={remedy.id} className="remedy-cardf">
          <img 
            src={`http://localhost:5000/uploads/${encodeURIComponent("1740477031140-Screenshot (7).png")}`} 
            alt="Image" 
            style={{ width: "200px", height: "200px", objectFit: "cover" }} 
          /><h3>{remedy.title}</h3>
            <p>{remedy.description}</p>
            
            {/* Clickable Remedy Box */}
            <button onClick={() => handleSinglePage(remedy.id)}>View Details</button>

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
