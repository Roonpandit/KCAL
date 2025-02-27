import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Box/Code/AuthContext";
import "../Css/Nav_2.css";
import userLogo from "../../assets/user-logo.jpg";
import axios from "axios";

const Nav_2 = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [userName, setUserName] = useState("");

  const Handlelogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    if (user && user.email) {
      axios
        .get(
          "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/LogIn.json"
        )
        .then((response) => {
          const fetchedData = response.data || {};
          const usersArray = Object.keys(fetchedData).map((key) => ({
            id: key,
            ...fetchedData[key],
          }));

          const currentUser = usersArray.find(
            (u) => u.email.toLowerCase() === user.email.toLowerCase()
          );

          if (currentUser) {
            setUserName(currentUser.username);
          }
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, [user]);

  return (
    <div>
      <div className="Nav_2-middle">
        <div className="Nav_2">
          <span>
            <Link to="/User">Home</Link>
          </span>
          {isAuthenticated && (
            <>
              <div className="profile-logo">
                <Link to="/Diet">
                  <img src={userLogo} alt="Profile" className="profile-image" />
                  <span className="username">{userName}</span>
                </Link>
              </div>

              <button className="logout" onClick={Handlelogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav_2;
