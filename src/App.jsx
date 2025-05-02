import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './Box/Code/AuthContext.jsx';
import Front from './Box/Code/Front.jsx';
import Scanner from './Box/Code/Scanner.jsx';
import QrCode from "./Box/Code/QrCode.jsx"
import DishDetail from './Box/Code/DishDetail.jsx';
import About from './Box/Code/About.jsx';
import Contact from "./Box/Code/Contact"

import Admin from './Admin/Code/Admin.jsx';
import Combo from "./Admin/Code/Combo.jsx"
import ComboList from "./Admin/Code/ComboList.jsx"
import Ingredients from './Admin/Code/Ingredients.jsx';

import User from './User/Code/User.jsx';
import Profile from './User/Code/Profile.jsx';
import AddIngredients from './User/Code/Add-Ingredients.jsx';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth(); 
  return isAuthenticated ? children : <Navigate to="/" />;  
}


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/Scanner" element={<Scanner/>} />
        <Route path="/QrCode" element={<QrCode/>}/>
        <Route path="/:id" element={<DishDetail/>} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />

                      {/* Admin Pages */}
        <Route path="/Admin" element={<ProtectedRoute><Admin/></ProtectedRoute>} />
        <Route path="/Combo" element={<ProtectedRoute><Combo/></ProtectedRoute>} />
        <Route path="/Ingredients" element={<ProtectedRoute><Ingredients/></ProtectedRoute>} />
        <Route path="/ComboList" element={<ComboList/>} />

                      {/* User Pages */}
        <Route path="/User" element={<ProtectedRoute><User/></ProtectedRoute>} />
        <Route path="/Profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path="/Add-Ingredients" element={<ProtectedRoute><AddIngredients/></ProtectedRoute>} />

      </Routes>
    </>


  );
}

export default App;
