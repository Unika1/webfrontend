import React from "react";
import "../style/FrontSection.css";
import frontImage from "../../assets/images/frontSection.jpg";

const FrontSection = () => {
  return (
    <div className="front-section">
      <img src={frontImage} alt="Front Section" className="front-image" />
    </div>
  );
};

export default FrontSection;
