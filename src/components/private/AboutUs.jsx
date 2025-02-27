import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "../style/AboutUs.css"; // Ensure correct path

const AboutUs = () => {
  return (
    <>
      <Navbar /> {/* Navbar Added */}
      <div className="about-container">
        <div className="about-header">
          <h1>About <span>Earthly Glow</span></h1>
          <p>Your go-to destination for natural beauty and wellness.</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h2>Our Mission</h2>
            <p>
              At Earthly Glow, we believe in harnessing the power of nature to provide 
              effective, sustainable, and safe remedies for skincare, haircare, and body care. 
              Our mission is to make natural beauty accessible to everyone.
            </p>

            <h2>Why Choose Us?</h2>
            <ul>
              <li>🌿 100% Natural Remedies</li>
              <li>🌍 Eco-Friendly & Sustainable</li>
              <li>❤️ Trusted by Thousands</li>
              <li>📚 Backed by Research & Tradition</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer /> {/* Footer Added */}
    </>
  );
};

export default AboutUs;
