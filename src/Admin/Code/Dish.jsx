import React, { useState } from "react";
import "../Css/Dish.css"; // Import the scoped CSS
import Nav_1 from "./Nav_1";
import { useNavigate } from "react-router-dom";

function Dish() {
  const navigate = useNavigate();
  const [foodItem, setFoodItem] = useState("");
  const [calories, setCalories] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      food_item: foodItem,
      calories: calories,
      category: category,
      type: type,
      quantity: quantity,
    };

    // Fetching data from the Firebase API and sending the form data
    fetch(
      "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/Dish.json",
      {
        method: "POST", // Use POST to add data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Reset form fields after successful submission
        setFoodItem("");
        setCalories("");
        setCategory("");
        setType("");
        setQuantity("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleClose = () => {
    navigate("/Admin");
  };
  return (
    <>
      <Nav_1 />
      <div className="dish-container">
        <button onClick={handleClose} className="close-button">
          &times;
        </button>
        <h2>Enter Dish Information</h2>
        <form className="dish-form" onSubmit={handleSubmit}>
          <div>
            <label>Food Item:</label>
            <input
              type="text"
              value={foodItem}
              onChange={(e) => setFoodItem(e.target.value)}
              placeholder="Enter food item"
              required
            />
          </div>
          <div>
            <label>Calories:</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Enter calories"
              required
            />
          </div>
          <div>
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Fruit">Fruit</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Non veg">Non veg</option>
              <option value="Dairy">Dairy</option>
              <option value="Nut">Nut</option>
              <option value="Seed">Seed</option>
              <option value="Grain">Grain</option>
              <option value="Desert">Desert</option>
              <option value="Snack">Snack</option>
              <option value="Drink">Drink</option>
            </select>
          </div>
          <div>
            <label>Type:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select Type</option>
              <option value="Liquid">Liquid</option>
              <option value="Cooked">Cooked</option>
              <option value="Raw">Raw</option>
            </select>
          </div>
          <div>
            <label>Quantity:</label>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Dish;
