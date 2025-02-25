import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/BodyCareRemedies.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";

const BodyCareRemedies = () => {
  const [remedies, setRemedies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRemedies = async () => {
      try {
        const response = await axios.get(`/api/body-care/remedies/2`);
        console.log("Fetched Remedies:", response.data);

        // Ensure `remedies` is always an array
        if (Array.isArray(response.data)) {
          setRemedies(response.data);
        } else if (response.data && typeof response.data === "object") {
          setRemedies(Object.values(response.data));
        } else {
          setRemedies([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching remedies:", error);
        setError("Failed to load body care remedies.");
        setRemedies([]); // Ensure remedies is an array even on error
      }
    };
    fetchRemedies();
  }, []);

  return (
    <div className="bodycare-remedies">
      <Navbar />
      <h1>Body Care Remedies</h1>
      {error && <p className="error-message">{error}</p>}
      {remedies.length > 0 ? (
        <div className="remedy-grid">
          {remedies.map((remedy) => (
            <Link
              key={remedy.id}
              to={`/body-care/remedies/${remedy.id}`}
              className="remedy-card-link"
            >
              <div className="remedy-card">
                <img
                  src={`http://localhost:5000/uploads/${remedy.imageUrl}`}
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
        <p className="no-remedies">No body care remedies added yet.</p>
      )}
      <Footer />
    </div>
  );
};

export default BodyCareRemedies;
