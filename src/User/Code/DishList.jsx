import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Box/Code/AuthContext";
import "../Css/DishList.css";

function DishList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dishData, setDishData] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  const dishApiUrl =
    "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/Dish.json";
  const userDishApiUrl =
    "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/UserDiet-Data.json";

  useEffect(() => {
    if (!user || !user.email) {
      alert("No user found or user is not logged in.");
      return;
    }

    setLoading(true);

    axios
      .get(dishApiUrl)
      .then((response) => {
        const fetchedData = Object.values(response.data || []);
        fetchedData.sort((a, b) => a.food_item.localeCompare(b.food_item));
        setDishData(fetchedData);
        setFilteredIngredients(fetchedData); // Show all dishes initially
      })
      .catch(() => setError("Failed to fetch data"))
      .finally(() => setLoading(false));
  }, [user]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    filterData(event.target.value, selectedType);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    filterData(selectedCategory, event.target.value);
  };

  const filterData = (category, type) => {
    let filteredData = Array.isArray(dishData) ? [...dishData] : [];

    if (category) {
      filteredData = filteredData.filter((dish) => dish.category === category);
    }
    if (type) {
      filteredData = filteredData.filter((dish) => dish.type === type);
    }

    setFilteredIngredients(filteredData);
    setCurrentPage(1);
  };

  const handleAddButtonClick = (dish) => {
    setSelectedDish(dish);
    setShowCalendar(true);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = () => {
    if (!user || !user.email) {
      alert("User is not logged in. Please log in again.");
      return;
    }

    if (selectedDate && selectedDish) {
      const newUserDish = {
        ...selectedDish,
        selectedDate,
        email: user.email,
      };

      axios
        .post(userDishApiUrl, newUserDish)
        .then(() => {
          alert("Ingredient added to your diet!");
          setShowCalendar(false);
          setSelectedDate("");
          setSelectedDish(null);
        })
        .catch(() => alert("Failed to add Ingredient to your diet."));
    } else {
      alert("Please select a date to start your Diet.");
    }
  };

  const handleCloseButtonClick = () => {
    navigate("/User");
  };

  const ingredientsPerPage = 10;
  const totalPages = Math.ceil((filteredIngredients?.length || 0) / ingredientsPerPage);
  const displayedIngredients = filteredIngredients.slice(
    (currentPage - 1) * ingredientsPerPage,
    currentPage * ingredientsPerPage
  );

  return (
    <div className="dish-list-container">
      <button onClick={handleCloseButtonClick} className="close-button">
        &times;
      </button>
      <h1>Ingredients List</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="filters">
        <select value={selectedCategory} onChange={handleCategoryChange}>
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

        <select value={selectedType} onChange={handleTypeChange}>
          <option value="">Select Type</option>
          <option value="Liquid">Liquid</option>
          <option value="Cooked">Cooked</option>
          <option value="Raw">Raw</option>
        </select>
      </div>

      <table className="dish-table">
        <thead>
          <tr>
            <th>Food Item</th>
            <th>Cal</th>
            <th>Category</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          {displayedIngredients.map((dish, index) => (
            <tr key={index}>
              <td>{dish.food_item}</td>
              <td>{dish.calories}</td>
              <td>{dish.category}</td>
              <td>{dish.type}</td>
              <td>{dish.quantity}</td>
              <td>
                <button className="btns" onClick={() => handleAddButtonClick(dish)}>
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showCalendar && (
        <div className="calendar-popup">
          <h2>Select Date to start Your Diet</h2>
          <input type="date" value={selectedDate} onChange={handleDateChange} />
          <div className="button-container">
            <button className="cancel-button" onClick={() => setShowCalendar(false)}>
              Cancel
            </button>
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}

      <div className="pagination">
        <button className="bttns"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button className="bttns"
          disabled={currentPage >= totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DishList;