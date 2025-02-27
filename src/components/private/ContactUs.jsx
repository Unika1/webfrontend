import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "../style/ContactUs.css"; // Ensure correct path

const ContactUs = () => {
  return (
    <>
      <Navbar /> {/* Navbar Added */}
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact <span>Earthly Glow</span></h1>
          <p>We’d love to hear from you! Get in touch with us.</p>
        </div>

        <div className="contact-content">
          {/* Contact Information */}
          <div className="contact-info">
            <h2>Our Contact Details</h2>
            <p><strong>Email:</strong> support@earthlyglow.com</p>
            <p><strong>Phone:</strong> +977 984111111</p>
            <p><strong>Address:</strong> Kathmandu</p>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h2>Send Us a Message</h2>
            <form>
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Your Name" required />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Your Email" required />
              </div>
              <div className="input-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" placeholder="Your Message" required></textarea>
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
      <Footer /> {/* Footer Added */}
    </>
  );
};

export default ContactUs;
