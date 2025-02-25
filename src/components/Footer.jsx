import React from "react";
import "../components/style/Footer.css";  
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer1">
        <ul>
          <p>Quick Links</p>
          <li><a href="/about">About Us</a></li>
          <li><a href="/terms">Terms of Service</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>

        <ul>
          <p>Stay Connected</p>
          <a href="#">
            <FaFacebook /> Facebook
          </a>
          <a href="#">
            <FaInstagram /> Instagram
          </a>
          <a href="#">
            <FaYoutube /> YouTube
          </a>
        </ul>
      </div>

      <div className="footer2">Earthly Glow © 2025</div>
    </footer>
  );
};

export default Footer;
