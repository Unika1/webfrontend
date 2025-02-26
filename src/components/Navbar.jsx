import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import "../components/style/Navbar.css";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const role = localStorage.getItem("userRole");
    setUserRole(role);
    setIsLoggedIn(!!token); // Convert token existence to boolean
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* ✅ Logo Section */}
        <Link to="/homepage" className="logo-container">
          <img src={logo} alt="Earthly Glow Logo" className="logo" />
          <h2 className="brand-name">Earthly Glow</h2>
        </Link>

        {/* ✅ Navigation Links */}
        <ul className="nav-links">
          {isLoggedIn ? (
            <>
              {userRole === "admin" ? (
                <li><Link to="/admin" className="nav-link">Admin Panel</Link></li>
              ) : (
                <li><Link to="/homepage" className="nav-link">Home</Link></li>
              )}
              <li><Link to="/face-care/remedies" className="nav-link">Remedies</Link></li>
              <li><Link to="/about" className="nav-link">About Us</Link></li>
              <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/about" className="nav-link">About Us</Link></li>
              <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
            </>
          )}
        </ul>

        {/* ✅ Account/Login Section */}
        <div className="account-section">
          {isLoggedIn ? (
            <div 
              className="account-dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setTimeout(() => setDropdownOpen(false), 200)}
            >
              <span className="account-name">Account ⬇</span>
              {dropdownOpen && (
                <div 
                  className="dropdown-menu"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                  <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-link login-btn">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
