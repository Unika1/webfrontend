import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/HairCareRemedies.css"; 
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";

const HairCareRemedies = () => {
  const [remedies, setRemedies] = useState([]);

  useEffect(() => {
    useEffect(() => {
      const fetchRemedies = async () => {
        try {
          const response = await axios.get('/api/remedies/hair-care');
          setRemedies(response.data);
        } catch (error) {
          console.error("Error fetching remedies:", error);
        }
      };
      fetchRemedies();
    }, []);
  }, []);

  return (
    <div className="haircare-remedies">
      <Navbar />
      <h1>Hair Care Remedies</h1>
      {remedies.length > 0 ? (
        <div className="remedy-grid">
          {remedies.map((remedy, index) => (
            <Link
              key={index}
              to={`/hair-care/remedies/${index}`}
              className="remedy-card-link"
            >
              <div className="remedy-card">
                <img
                  src={remedy.image}
                  alt={remedy.title}
                  className="remedy-image"
                />
                <h3 className="remedy-title">{remedy.title}</h3>
                <p className="remedy-description">{remedy.description}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="no-remedies">No haircare remedies added yet.</p>
      )}
      <Footer />
    </div>
  );
};

export default HairCareRemedies;
