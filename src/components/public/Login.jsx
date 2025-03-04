import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex pattern
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: email,
        password: password,
      });

      console.log("Backend response:", response.data);

      if (response.data && response.data.data && response.data.data.access_token) {
        const token = response.data.data.access_token;
        const role = response.data.data.role;

        console.log("Extracted role:", role);

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        setEmail("");
        setPassword("");

        if (role === "admin") {
          navigate("/admin/dashboard"); // Navigate to the admin dashboard
        } else {
          navigate("/homepage"); // Navigate to the user homepage
        }
  
        setError("");
        // Navigate to the user dashboard after successful login

        console.log("Navigating to dashboard...");
        setError("");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-background">
      <h1>Welcome back</h1>
      <h2>Log in to Skincare Remedies</h2>
      <div className="login-container">
        {error && <p className="error-message">{error}</p>}
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button type="submit" id="login-btn">
            Login
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
