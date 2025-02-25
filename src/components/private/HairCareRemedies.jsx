import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/HairCareRemedies.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";

const HairCareRemedies = () => {
  const [remedies, setRemedies] = useState([]);
  const [error, setError] = useState(null);

  const fetchRemedies = async () => {
    try {
      const response = await axios.get(`/api/hair-care/remedies/3`);
      console.log("Fetched Remedies:", response.data);

      if (Array.isArray(response.data)) {
        setRemedies(response.data);
      } else if (response.data && typeof response.data === "object") {
        setRemedies(Object.values(response.data));
      } else {
        setRemedies([]);
      }
    } catch (error) {
      console.error("Error fetching remedies:", error);
      setError("Failed to fetch remedies.");
      setRemedies([]);
    }
  };

  useEffect(() => {
    fetchRemedies();
  }, []);

  return (
    <div className="haircare-remedies">
      <Navbar />
      <h1>Hair Care Remedies</h1>

      {error ? (
        <p className="error-message">{error}</p>
      ) : remedies.length > 0 ? (
        <div className="remedy-grid">
          {remedies.map((remedy) => (
            <Link 
              key={remedy.id} 
              to={`/hair-care/remedies/${remedy.id}`} 
              className="remedy-card-link"
            >
              <div className="remedy-card">
                <img src={remedy.image} alt={remedy.title} className="remedy-image" />
                <h3 className="remedy-title">{remedy.title}</h3>
                <p className="remedy-description">{remedy.description}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="no-remedies">No remedies added yet.</p>
      )}

      <Footer />
    </div>
  );
};

export default HairCareRemedies;
