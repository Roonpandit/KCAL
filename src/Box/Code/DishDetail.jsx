import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // For URL params and navigation
import "../Css/DishDetail.css"; // Import the professional CSS file
import Navbar from "./Navbar";

const DishDetail = () => {
  const { id } = useParams(); // Extract dish ID from URL parameters
  const [dishData, setDishData] = useState(null);
  const [error, setError] = useState(null);
  const [totalCalories, setTotalCalories] = useState(null); // For storing total calories
  const [isEditing, setIsEditing] = useState(false); // For tracking if we are editing
  const [quantities, setQuantities] = useState([]); // For storing updated quantities
  const navigate = useNavigate(); // For programmatic navigation

  // Fetch dish details from the database
  useEffect(() => {
    setError(null); // Reset any previous errors

    fetch(
      `https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/DishData/${id}.json`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setDishData(data);
          setQuantities(data.items.map((item) => item.quantity)); // Initialize quantities array
        } else {
          setError("Dish not found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching dish details:", error);
        setError("An error occurred while fetching dish details.");
      });
  }, [id]);

  // Handle error state
  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => navigate("/")}>Go back to home</button>
      </div>
    );
  }

  if (!dishData) {
    return null; // Don't show anything until dishData is available
  }

  // Calculate the total calories by summing up the calories of each ingredient (with quantity)
  const calculateTotalCalories = () => {
    if (dishData.items && dishData.items.length > 0) {
      const total = dishData.items.reduce((sum, item, index) => {
        // Ensure calories exists and is a number
        const calories = parseInt(item.calories, 10);
        const quantity = parseInt(quantities[index], 10); // Use the updated quantity
        if (calories && quantity) {
          return sum + calories * quantity; // Multiply calories by quantity
        }
        return sum;
      }, 0);
      setTotalCalories(total);
    }
  };

  // Handle the quantity change
  const handleQuantityChange = (index, event) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = event.target.value;
    setQuantities(updatedQuantities);
  };

  // Handle "Edit Quantities" button click
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const handleCloseButtonClick = () => {
    navigate("/QrCode");
  };
  return (
    <>
      <Navbar />
      <div className="dish-detail">
        <button onClick={handleCloseButtonClick} className="close-button">
          &times;
        </button>
        <div className="note">
          <h1>{dishData.dishName}</h1>
          <p>
            Enjoy this delicious dish, prepared with the finest ingredients!
          </p>
        </div>
        <p>{dishData.description}</p>

        {/* Show all ingredients in one unified box */}
        {dishData.items && dishData.items.length > 0 ? (
          <>
            <div className="ingredient-box">
              <h2>Ingredients</h2>
              <div>
                {dishData.items.map((item, index) => (
                  <div className="ingredient-item" key={index}>
                    <strong>Ingredient {index + 1}: </strong>
                    {item.name} <br />
                    <strong>Quantity: </strong>
                    {isEditing ? (
                      <input
                        type="number"
                        value={quantities[index]}
                        onChange={(e) => handleQuantityChange(index, e)}
                        min="1"
                      />
                    ) : (
                      `${quantities[index]} serving(s)`
                    )}
                    <br />
                    <strong>Calories: </strong>
                    {item.calories} calories <br />
                    <hr />
                  </div>
                ))}
              </div>

              {totalCalories !== null && (
                <div className="total-calories">
                  <p>Total Calories: {totalCalories} calories</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <p>No ingredients available for this dish.</p>
        )}
        <div className="bttns">
          <button onClick={calculateTotalCalories}>
            Calculate Total Calories
          </button>
          <button onClick={toggleEdit}>
            {isEditing ? "Save Quantities" : "Edit Quantities"}
          </button>
        </div>
      </div>
    </>
  );
};

export default DishDetail;
