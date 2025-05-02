import React, { useEffect, useState } from 'react';
import './ComboList.css';

function ComboList() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [dishName, setDishName] = useState('');
  const [items, setItems] = useState([{ name: '', quantity: '', calories: '' }]);

  useEffect(() => {
    fetch('https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/DishData.json')
      .then(response => response.json())
      .then(data => {
        if (data) {
          setData(Object.values(data));
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filteredData = data.filter(dish =>
    dish.dishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dish.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddItem = () => {
    setItems([...items, { name: '', quantity: '', calories: '' }]);
  };

  const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDish = { dishName, items };
    setData([...data, newDish]);
    setShowPopup(false);
  };

  return (
    <div className="combo-container">
      <h2 className="combo-title">Combo List</h2>
      <input
        type="text"
        placeholder="Search combo or item..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="add-combo-button" onClick={() => setShowPopup(true)}>Add New Combo</button>

      <div className="combo-card-container">
        {filteredData.map((dish, index) => (
          <div key={index} className="combo-card">
            <h3 className="dish-name">{dish.dishName}</h3>
            <p className="ingredients-title">Ingredients</p>
            <ul className="dish-items">
              {dish.items.map((item, i) => (
                <li key={i} className="dish-item">
                  <span className="ingredient-title">Ingredient {i + 1}: {item.name}</span>
                  <span className="item-details">Quantity: {item.quantity} serving(s)</span>
                  <span className="item-details">Calories: {item.calories} calories</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowPopup(false)}>&times;</span>
            <h2>Add New Combo</h2>
            <form onSubmit={handleSubmit}>
              <label>Dish Name:</label>
              <input type="text" value={dishName} onChange={(e) => setDishName(e.target.value)} required />
              {items.map((item, index) => (
                <div key={index} className="popup-item">
                  <label>Item Name:</label>
                  <input type="text" name="name" value={item.name} onChange={(e) => handleItemChange(index, e)} required />
                  <label>Quantity:</label>
                  <input type="number" name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} required />
                  <label>Calories:</label>
                  <input type="number" name="calories" value={item.calories} onChange={(e) => handleItemChange(index, e)} required />
                </div>
              ))}
              <button type="button" onClick={handleAddItem}>Add More Item</button>
              <button type="submit">Save Combo</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComboList;
