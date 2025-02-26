import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style/FaceCareRemedies.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

const FaceCareRemedies = () => {
  const [remedies, setRemedies] = useState([]);

  useEffect(() => {
    const fetchRemedies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/remedies");
        console.log("🔵 API Response:", response.data);
        setRemedies(response.data);
      } catch (error) {
        console.error("❌ Error fetching remedies:", error);
      }
    };
    fetchRemedies();
  }, []);

  return (
    <div className="facecare-remedies">
      <Navbar />
      <div className="remedies-container">
        <h1 className="page-title">Face Care Remedies</h1>
        
        {remedies.length > 0 ? (
          <div className="remedy-grid">
            {remedies.map((remedy) => (
              <div key={remedy.id} className="remedy-card">
                <img
                  src={`http://localhost:5000/uploads/${remedy.image}`} 
                  alt={remedy.title} 
                  className="remedy-image"
                />
                <div className="remedy-info">
                  <h3 className="remedy-title">{remedy.title}</h3>
                  <p className="remedy-description">{remedy.description}</p>
                  {/* ✅ Added View button */}
                  <Link to={`/face-care/remedies/${remedy.id}`} className="view-btn">
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-remedies">No remedies added yet.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FaceCareRemedies;
