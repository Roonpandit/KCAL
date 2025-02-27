import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Admin.css';
import Nav_1 from './Nav_1';

const Admin = () => {
  const navigate = useNavigate();

  const handleComboClick = () => {
    navigate('/Add-dish');
  };

  const handleAddDish = () => {
    navigate('/Add-Combo');
  };

  return (
    <>
      <Nav_1 />
      <div className="Admin-container">
        <div className="text">
          <h1>Kcal Calculator</h1>
          <h2>"Count Calories, Create Confidence!"</h2>
          <div className="btn-d">
            <button onClick={handleComboClick}>Dish</button>
            <button onClick={handleAddDish}>Combo</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Admin;