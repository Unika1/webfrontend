import React from "react";
import Content from "./Content";
import "../style/Homepage.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Homepage = () => {
  return (
    <div className="homepage">
      <Navbar/>
      <Content />
      <Footer/>
    </div>
  );
};

export default Homepage;
