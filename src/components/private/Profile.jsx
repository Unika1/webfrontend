import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Profile.css"; // Import CSS file for styling

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    role: "",
  });

  const navigate = useNavigate();

  // Fetch user details from API
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedEmail = localStorage.getItem("userEmail"); // Get email from localStorage
        if (!storedEmail) {
          navigate("/login"); // Redirect if not logged in
          return;
        }

        const response = await fetch(`http://localhost:5000/api/auth/profile/${storedEmail}`);
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Redirect based on role
  const handleNavigation = () => {
    if (user.role === "admin") {
      navigate("/adminpanel");
    } else {
      navigate("/homepage");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">User Profile</h2>

        <div className="profile-info">
          <p><strong>Username:</strong> {user.username || "Loading..."}</p>
          <p><strong>Email:</strong> {user.email || "Loading..."}</p>
          <p><strong>Role:</strong> {user.role || "Loading..."}</p>
        </div>

        <button className="home-button" onClick={handleNavigation}>
          {user.role === "admin" ? "Go to Admin Panel" : "Back to Home"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
