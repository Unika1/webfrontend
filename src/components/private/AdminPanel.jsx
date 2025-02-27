import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/AdminPanel.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import DeleteRemedy from "../private/DeleteRemedy";

const AdminPanel = () => {
  const [remedies, setRemedies] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");

    if (role !== "admin") {
      navigate("/homepage"); // Redirect non-admin users
    } else {
      fetchRemedies();
    }
  }, [navigate]);

  const fetchRemedies = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:5000/api/remedies");
      setRemedies(response.data);
    } catch (error) {
      console.error("Failed to fetch remedies:", error);
      setError("Failed to load remedies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddRemedy = () => {
    navigate("/facecare");
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  const handleDeleteSuccess = (deletedId) => {
    setRemedies((prev) => prev.filter((remedy) => remedy.id !== deletedId));
  };

  return (
    <div className="admin-panel">
      <Navbar />
      <div className="admin-container">
        <h1>Admin Panel - Manage Remedies</h1>
        <button className="add-remedy-btn" onClick={handleAddRemedy}>
          ➕ Add Facecare Remedy
        </button>

        <h2>Existing Remedies</h2>

        {loading ? (
          <p className="loading-text">Loading remedies...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : remedies.length > 0 ? (
          <div className="remedy-grid">
            {remedies.map((remedy) => (
              <div key={remedy.id} className="remedy-card">
                <img
                  src={remedy.image ? `http://localhost:5000/uploads/${remedy.image}` : "/default-image.jpg"}
                  alt={remedy.title}
                  className="remedy-image"
                />
                <div className="remedy-content">
                  <h3>{remedy.title}</h3>
                  <p>{remedy.description}</p>
                  <div className="remedy-actions">
                    <button className="edit-btn" onClick={() => handleEdit(remedy.id)}>
                      ✏ Edit
                    </button>
                    <DeleteRemedy remedyId={remedy.id} onDeleteSuccess={handleDeleteSuccess} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-remedies">No remedies found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;
