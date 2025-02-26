import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/Signup.css';

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    
    const [error, setError] = useState(""); 
    const [successMessage, setSuccessMessage] = useState(""); 
    const [showPassword, setShowPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
    const [loading, setLoading] = useState(false);  // Added loading state
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        // Validation
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("All fields are required.");
            return;
        }
    
        if (!validateEmail(formData.email)) {
            setError("Invalid email format!");
            return;
        }
    
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long!");
            return;
        }
    
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
    
        setLoading(true); // Start loading state
        setError(""); // Clear previous errors
    
        try {
            const response = await axios.post("http://localhost:5000/api/auth/signup", {
                username: formData.name,
                email: formData.email,
                password: formData.password,
            });
    
            setSuccessMessage(response.data.message || "Signup successful!");
            setError("");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            console.error("Signup Error:", error.response || error);
            setError(error.response?.data?.message || "Signup failed. Try again.");
        } finally {
            setLoading(false); // Stop loading state once request is done
        }
    };

    return (
        <div className="signup-background">
            <h1>Create Account</h1>
            <h2>Sign up to Skincare Remedies</h2>
            <div className="signup-container">
                <form id="signup-form" onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>} 
                    {successMessage && <p className="success-message">{successMessage}</p>}  

                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="name" 
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email" 
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange} 
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password" 
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />
                        <div className="checkbox-container">
                            <input 
                                type="checkbox" 
                                checked={showPassword} 
                                onChange={() => setShowPassword(!showPassword)} 
                            />
                            <label>Show Password</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword" 
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            autoComplete="confirmPassword"
                        />
                        <div className="checkbox-container">
                            <input 
                                type="checkbox" 
                                checked={showConfirmPassword} 
                                onChange={() => setShowConfirmPassword(!showConfirmPassword)} 
                            />
                            <label>Show Password</label>
                        </div>
                    </div>

                    <button type="submit" id="signup-btn" disabled={loading}>
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                <p className="login-link">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
