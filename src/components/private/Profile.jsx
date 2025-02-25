import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Profile.css"; // Import CSS file for styling

function Profile() {
  const [user, setUser ] = useState({
    username: "",
    email: "",
    bio: "",
    profile_pic: "",
  });

  const [selectedFile, setSelectedFile] = useState(null); // State to hold the selected file
  const navigate = useNavigate();

  // Fetch user details from API
  useEffect(() => {
    fetch(`http://localhost:5000/api/profile/${user.email}`)
      .then((res) => res.json())
      .then((data) => setUser (data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, [user.email]);

  // Handle input changes
  const handleChange = (e) => {
    setUser ({ ...user, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setSelectedFile(file); // Update the state with the selected file

    // Create a URL for the selected file to display it
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setUser ({ ...user, profile_pic: fileURL }); // Update the profile picture URL
    }
  };

  // Update profile
  const handleUpdate = () => {
    const formData = new FormData(); // Create a FormData object
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("bio", user.bio);
    if (selectedFile) {
      formData.append("profile_pic", selectedFile); // Append the selected file
    }

    fetch("http://localhost:5000/api/profile/update", {
      method: "PUT",
      body: formData, // Send the FormData object
    })
      .then((res) => res.json())
      .then(() => alert("Profile updated successfully!"))
      .catch((err) => console.error("Error updating profile:", err));
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-card">
        {/* Display the user's profile picture */}
        <img src={user.profile_pic || "https://via.placeholder.com/150"} alt="Profile" />
        
        {/* Input field for profile picture URL */}
        <input
          type="file"
          accept="image/*" // Accept only image files
          onChange={handleFileChange} // Handle file selection
        />
        
        {/* Input field for username */}
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          placeholder="Username"
        />
        
        {/* Textarea for bio */}
        <textarea
          name="bio"
          value={user.bio}
          onChange={handleChange}
          placeholder="Bio"
        ></textarea>
        
        {/* Button to update the profile */}
        <button onClick={handleUpdate}>Update Profile</button>
        
        {/* Button to navigate back to the homepage */}
        <button onClick={() => navigate("/homepage")}>Back to Home</button>
      </div>
    </div>
  );
}

export default Profile;