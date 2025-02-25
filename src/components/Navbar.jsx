import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import "../components/style/Navbar.css";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(null); // State to store user role
  const navigate = useNavigate(); 

  useEffect(() => {
    // Get user role from localStorage (or any auth state)
    const storedRole = localStorage.getItem("userRole");
    setUserRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole"); // Remove role on logout
    navigate("/login"); 
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="Earthly Glow Logo" />
      </div>
      <h2>Earthly Glow</h2>
      <div className="nav-description">
        <Link to="/homepage" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/contact" className="nav-link">Contact Us</Link>

        <div 
          className="profile"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <i className="fa-solid fa-user"></i>
          <div className="account">
            Account
            {dropdownOpen && (
              <div className="drop-down" onClick={(e) => e.stopPropagation()}>
                {/* Redirect based on user role */}
                {userRole === "admin" ? (
                  <Link to="/admin/dashboard">Admin Panel</Link>
                ) : (
                  <Link to="/user/profile">Profile</Link>
                )}
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
