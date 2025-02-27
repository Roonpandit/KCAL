# Calculate Calorie Web Application

[Visit the Live Site on Netlify](https://calculatecalorie.netlify.app/)

## Table of Contents

- [Project Overview](#project-overview)
- [Team Members](#team-members)
- [Features](#features)
  - [QR Code Scanning](#qr-code-scanning)
  - [Dynamic Calorie Calculation](#dynamic-calorie-calculation)
  - [Inventory Management APIs](#inventory-management-apis)
  - [Multi-User Login](#multi-user-login)
  - [User Profile Management](#user-profile-management)
  - [Personalized Diet Plans](#personalized-diet-plans)
  - [Frontend Features](#frontend-features)
- [Tech Stack](#tech-stack)
- [How It Works](#how-it-works)
  - [QR Code Structure](#qr-code-structure)
  - [Calorie Calculation Example](#calorie-calculation-example)
  - [Real-Time Updates](#real-time-updates)
- [Firebase Integration](#firebase-integration)
  - [Database Structure](#database-structure)
  - [CRUD Operations](#crud-operations)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

The **Calculate Calorie Web Application** is a React-based app designed to make calorie tracking for dishes simple and interactive. The app uses QR code scanning to retrieve dish details, calculates the total calorie count dynamically based on its ingredients, and allows users to modify the quantities of each ingredient to see updated calorie counts. This application is ideal for individuals looking to monitor their calorie intake and make informed dietary choices.

---

## Team Members

1. **Tarun Vashitsh** - Full Stack Developer
2. **Shivateja Keerthi** - Full Stack Developer
3. **Manish Ganesh Nagpure** - Full Stack Developer
4. **Vasanthkumar** - Full Stack Developer
---

## Features

### 1️⃣ QR Code Scanning
- Scan QR codes to fetch details of a dish, including its name and ingredients.
- Example QR Code Data:

  ```json
  {
    "dishName": "Idli Vada Combo",
    "items": [
      { "name": "Idli", "quantity": 2 },
      { "name": "Vada", "quantity": 1 },
      { "name": "Sambhar", "quantity": 1 },
      { "name": "Chutney", "quantity": 1 }
    ]
  }
  ```

### 2️⃣ Dynamic Calorie Calculation
- Retrieve calorie data for each ingredient from the Firebase database.
- Automatically calculate the total calorie count for the dish.
- Allow users to modify the quantity of ingredients, with real-time updates to the calorie count.

### 3️⃣ Inventory Management APIs
- Manage dishes and their calorie breakdown with CRUD operations:
  - Add new dishes.
  - Update existing dishes.
  - Delete dishes from the inventory.

### 4️⃣ Multi-User Login
- Secure authentication using Firebase Authentication
- Supports Google Login & Email/Password Login
- Each user has a separate database entry to track their personal calorie intake

### 5️⃣ User Profile Management
- Users can update their profile (Name, Age, Weight, Height, Dietary Preferences)
- Profile data stored securely in Firebase

### 6️⃣ Personalized Diet Plans
- Users can set daily calorie goals
- Based on their BMI & activity level, the app suggests diet recommendations

### 7️⃣ Frontend Features
- User-friendly interface for:
  - Scanning QR codes.
  - Viewing dish details with a calorie breakdown.
  - Modifying ingredient quantities.
  - Real-time updates to the total calorie count.

---

## Tech Stack

### Frontend
- **React.js**
  - State management for dynamic updates.
  - `react-qr-reader` library for QR code scanning.

### Database
- **Firebase**
  - Realtime Database for storing dishes and their calorie information.

---

## How It Works

### QR Code Structure
- The QR code contains information about the dish in JSON format, including its name and constituent ingredients.

  Example:
  ```json
  {
    "dishName": "Pasta",
    "items": [
      { "name": "Pasta", "quantity": 1 },
      { "name": "Sauce", "quantity": 1 },
      { "name": "Cheese", "quantity": 1 }
    ]
  }
  ```

### Calorie Calculation Example
- Dish: **Idli Vada Combo**
- Ingredients and their calorie values:

  ```text
  Idli (2): 100 cal each → 200 cal
  Vada (1): 200 cal → 200 cal
  Sambhar (1 serving): 120 cal → 120 cal
  Chutney (1 serving): 80 cal → 80 cal
  Total Calories: 600 cal
  ```

### Real-Time Updates
- Users can increment or decrement the quantity of any ingredient.
- Example Update:
  - User increases Idli to 3 and removes Sambhar.
  - Updated Calorie Breakdown:

    ```text
    Idli (3): 300 cal
    Vada (1): 200 cal
    Sambhar (0): 0 cal
    Chutney (1): 80 cal
    Updated Total Calories: 580 cal
    ```

---

## Firebase Integration

### Database Structure
- **Dishes Collection:**

  ```json
  {
    "dishId": {
      "name": "Dish Name",
      "items": [
        { "name": "Ingredient 1", "calories": 100 },
        { "name": "Ingredient 2", "calories": 200 }
      ]
    }
  }
  ```

### CRUD Operations
- **Create:** Add new dishes with their calorie breakdown.
- **Read:** Fetch dish details by scanning a QR code.
- **Update:** Modify the calorie values of ingredients or quantities.
- **Delete:** Remove dishes from the inventory.

---

## Contributing

We welcome contributions to improve this project! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.


---

## License

This project is licensed under the MIT License.
