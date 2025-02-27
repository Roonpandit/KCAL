import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Css/Dish.css";

function Ingredients() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingIngredient, setEditingIngredient] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    food_item: "",
    calories: "",
    category: "",
    type: "",
    quantity: "",
  });

  const ingredientsApiUrl =
    "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/Dish.json";

  useEffect(() => {
    setLoading(true);
    axios
      .get(ingredientsApiUrl)
      .then((response) => {
        if (response.data) {
          const fetchedData = Object.entries(response.data);
          setIngredients(fetchedData);
        } else {
          setIngredients([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch ingredients");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = ingredients;
    if (selectedCategory) {
      filtered = filtered.filter(
        ([, ingredient]) => ingredient.category === selectedCategory
      );
    }
    if (selectedType) {
      filtered = filtered.filter(
        ([, ingredient]) => ingredient.type === selectedType
      );
    }
    filtered.sort((a, b) =>
      a[1].food_item.localeCompare(b[1].food_item)
    );
    setFilteredIngredients(filtered);
    setCurrentPage(1);
  }, [ingredients, selectedCategory, selectedType]);

  const handleEditClick = (id, ingredient) => {
    setEditingIngredient(id);
    setFormData({ ...ingredient });
    setIsPopupOpen(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/Dish/${id}.json`
      )
      .then(() => {
        setIngredients(ingredients.filter(([key]) => key !== id));
        alert("Ingredient deleted successfully!")
      })
      .catch(() => alert("Failed to delete ingredient"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIngredient) {
      axios
        .patch(
          `https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/Dish/${editingIngredient}.json`,
          formData
        )
        .then(() => {
          setIngredients(
            ingredients.map(([key, value]) =>
              key === editingIngredient ? [key, formData] : [key, value]
            )
          );
          setEditingIngredient(null);
          setFormData({
            food_item: "",
            calories: "",
            category: "",
            type: "",
            quantity: "",
          });
          setIsPopupOpen(false);
          alert("Ingredient updated successfully!")
        })
        .catch(() => alert("Failed to update ingredient"));
    } else {
      axios
        .post(ingredientsApiUrl, formData)
        .then((response) => {
          setIngredients([...ingredients, [response.data.name, formData]]);
          setFormData({
            food_item: "",
            calories: "",
            category: "",
            type: "",
            quantity: "",
          });
          setIsPopupOpen(false);
          alert("Ingredient added successfully!")
        })
        .catch(() => alert("Failed to add ingredient"));
    }
  };

  const ingredientsPerPage = 10;
  const totalPages = Math.ceil(filteredIngredients.length / ingredientsPerPage);
  const displayedIngredients = filteredIngredients.slice(
    (currentPage - 1) * ingredientsPerPage,
    currentPage * ingredientsPerPage
  );

  return (
    <div className="ingredient-list-container">
      <h1>Admin - Ingredients List</h1>



      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <button className="close-button"
      onClick={() => navigate("/Admin")}>&times;</button>

      <div className="filters">
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
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

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="Liquid">Liquid</option>
          <option value="Cooked">Cooked</option>
          <option value="Raw">Raw</option>
        </select>

        <button
        className="btns"
        onClick={() => {
          setEditingIngredient(null);
          setFormData({
            food_item: "",
            calories: "",
            category: "",
            type: "",
            quantity: "",
          });
          setIsPopupOpen(true);
        }}
      >
        Add new ingredient
      </button>
      </div>

      <table className="dish-table">
        <thead>
          <tr>
            <th>Food Item</th>
            <th>Calories</th>
            <th>Category</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {displayedIngredients.map(([id, ingredient]) => (
            <tr key={id}>
              <td>{ingredient.food_item}</td>
              <td>{ingredient.calories}</td>
              <td>{ingredient.category}</td>
              <td>{ingredient.type}</td>
              <td>{ingredient.quantity}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => handleEditClick(id, ingredient)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button className="btn-delete" onClick={() => handleDelete(id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>{editingIngredient ? "Edit Ingredient" : "Add Ingredient"}</h2>
            <form onSubmit={handleSubmit}>
              <label>Food Item:</label>
              <input
                type="text"
                value={formData.food_item}
                onChange={(e) =>
                  setFormData({ ...formData, food_item: e.target.value })
                }
                required
              />
              <label>Calories:</label>
              <input
                type="number"
                value={formData.calories}
                onChange={(e) =>
                  setFormData({ ...formData, calories: e.target.value })
                }
                required
              />
              <label>Category:</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
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

              <label>Type:</label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                required
              >
                <option value="">Select Type</option>
                <option value="Liquid">Liquid</option>
                <option value="Cooked">Cooked</option>
                <option value="Raw">Raw</option>
              </select>
              <label>Quantity:</label>
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                required
              />
              <div className="popup-btn">
              <button 
              onClick={() => setIsPopupOpen(false)}
              className="cancle-button"
              >
              Cancle</button>
              <button type="submit">
                {editingIngredient ? "Update" : "Add"}
              </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ingredients;
