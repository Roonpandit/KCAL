import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Box/Code/AuthContext";
import axios from "axios";
import "../Css/Admin.css";
import Nav_1 from "./Nav_1";

const Admin = () => {
  const { user } = useAuth(); 
  const [adminname, setAdminname] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.email) return;

    axios
      .get(
        "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/LogIn.json"
      )
      .then((response) => {
        const fetchedData = response.data || {};
        const adminInfo = Object.keys(fetchedData)
          .map((key) => ({
            id: key,
            ...fetchedData[key],
          }))
          .find((item) => item.email === user.email);

        if (adminInfo) {
          setAdminname(adminInfo.username || "Admin");
        } else {
          setError("Admin Name not found.");
        }
      })
      .catch(() => {
        setError("Failed to fetch Admin Name. Please try again.");
      });
  }, [user]);

  const handleIngredientsClick = () => navigate("/Add-dish");
  const handlecomboClick = () => navigate("/Add-Combo");

  return (
    <>
      <Nav_1 />
      <div className="Admin-container">
        <div className="text">
          <h1>Kcal Calculator</h1>
          <h2>"Count Calories, Create Confidence!"</h2>
          <p>Welcome, {adminname}!</p>
          {error && <p className="error">{error}</p>}
          <div className="btn-d">
            <button onClick={handleIngredientsClick}>Dish</button>
            <button onClick={handlecomboClick}>Combo</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;