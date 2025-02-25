import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/AdminPanel.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-panel">
      <Navbar />
      <h1>Admin Panel - Manage Remedies</h1>

      {/* Category Navigation Buttons */}
      <div className="category-buttons">
        <button onClick={() => navigate("/facecare")}>Face Care</button>
        <button onClick={() => navigate("/haircare")}>Hair Care</button>
        <button onClick={() => navigate("/bodycare")}>Body Care</button>
      </div>

      <Footer />
    </div>
  );
};

export default AdminPanel;
