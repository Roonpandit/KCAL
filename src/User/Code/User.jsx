import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Box/Code/AuthContext";
import "../Css/User.css";
import Nav_2 from "./Nav_2";

function User() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userData, setUserData] = useState([]);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.email) return;
    axios
      .get(
        "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/UserDiet-Data.json"
      )
      .then((response) => {
        const fetchedData = response.data || {};
        const userFilteredData = Object.keys(fetchedData)
          .map((key) => ({
            id: key,
            ...fetchedData[key],
          }))
          .filter((item) => item.email === user.email);
        if (userFilteredData.length > 0) {
          setUserData(userFilteredData);
        } else {
          setError("No matching user data found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      });
  }, [user]);
  

  useEffect(() => {
    if (!user || !user.email) return;
    axios
      .get(
        "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/LogIn.json"
      )
      .then((response) => {
        const fetchedData = response.data || {};
        const userInfo = Object.keys(fetchedData)
          .map((key) => ({
            id: key,
            ...fetchedData[key],
          }))
          .find((item) => item.email === user.email);
        if (userInfo) {
          setUsername(userInfo.username || "User");
        } else {
          setError("Username not found.");
        }
      })
      .catch(() => {
        setError("Failed to fetch username. Please try again.");
      });
  }, [user]);

  const handleClick = () => {
    navigate("/DishList");
  };
  const handleCloseButtonClick = () => {
    navigate("/User");
  };
  return (
    <>
      <Nav_2 />
      <div className="profile-box">
        <div className="text">
          <h1>Kcal Calculator</h1>
          <h2>"Count Calories, Create Confidence!"</h2>
          <p>Welcome, {username}!</p>
        </div>
        <div className="diet-container">
          <h1>Your Diet Plan</h1>
          <div className="button-container">
            <button className="DishList" onClick={handleClick}>
              Add More in Your Diet
            </button>
          </div>
          <div className="cards">
            {loading && <p className="loading-message">Loading user data...</p>}
            {error && <p className="error-message">{error}</p>}
            {userData.length > 0 ? (
              userData.map((item) => (
                <div key={item.id} className="user-data-container">
                  <h2>{item.food_item}</h2>
                  <p>
                    <strong>Calories:</strong> {item.calories}
                  </p>
                  <p>
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Selected Date:</strong> {item.selectedDate}
                  </p>
                </div>
              ))
            ) : (
              <p>No diet found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
