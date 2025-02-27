import React from "react";
import userLogo from "../../assets/logo-3.png";
import { Link } from "react-router-dom";
import "../Css/Navbar.css";
function Navbar() {
  return (
    <div>
      <div className="Navbar">
        <span>
          <Link to="/">Home</Link>
        </span>
        <span className="profile-logo">
          <Link>
            <img src={userLogo} alt="" className="profile-image" />
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Navbar;
