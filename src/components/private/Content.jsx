import React from "react";
import {useNavigate} from "react-router-dom";
import '../style/Content.css';
import faceCare from '../../assets/images/facemask.jpg'; 
import hairCare from '../../assets/images/hairCare.jpg'; 
import bodyCare from '../../assets/images/bodyCare.jpg'; 

// import remedyIcon from '../../assets/images/remedyIcon.jpg'; 

const Content = () => {
  const navigate = useNavigate();
  return (
    <div className="content">
      <h1>Welcome to Earthly Glow</h1>
      <p>Your ultimate guide to natural skincare remedies crafted with love and care</p>
      <div className="shop-section">
        {/* Face Care Box */}
        <div className="box"onClick={() => navigate("/face-care/remedies")}>
          <div className="box-content">
            <h2>Face Care</h2>
            <div className="box-image" style={{ backgroundImage: `url(${faceCare})` }}></div>
            <p>See more remedies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
