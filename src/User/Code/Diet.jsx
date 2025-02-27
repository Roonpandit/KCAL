import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Css/Diet.css";
import Nav_2 from "./Nav_2";
import { useAuth } from "../../Box/Code/AuthContext";

const Diet = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isChangePasswordMode, setIsChangePasswordMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    username: "",
    dob: "",
    gender: "",
    weight: "", // Added weight
    height: "", // Added height
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!user || !user.email) {
      setLoading(false);
      return;
    }

    axios
      .get(
        "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/LogIn.json"
      )
      .then((response) => {
        const fetchedData = response.data || {};
        const usersArray = Object.keys(fetchedData).map((key) => ({
          id: key,
          ...fetchedData[key],
        }));

        const currentUser = usersArray.find(
          (u) => u.email.toLowerCase() === user.email.toLowerCase()
        );

        if (currentUser) {
          setUserData(currentUser);
          setUpdatedData({
            username: currentUser.username,
            dob: currentUser.dob,
            gender: currentUser.gender,
            weight: currentUser.weight || "", // Use stored value or empty string
            height: currentUser.height || "", // Use stored value or empty string
          });
        } else {
          setError("No matching user found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      });
  }, [user]);

  const calculateAge = (dob) => {
    const today = new Date();
    const dobDate = new Date(dob);
    const ageInMilliseconds = today - dobDate;
    const ageDate = new Date(ageInMilliseconds);
    const exactAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    return exactAge;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    const age = calculateAge(updatedData.dob);
    if (age < 12) {
      alert("You must be at least 12 years old to update your profile.");
      return;
    }

    if (!userData) return;

    const updatedUser = {
      ...userData,
      ...updatedData,
    };

    axios
      .put(
        `https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/LogIn/${userData.id}.json`,
        updatedUser
      )
      .then(() => {
        setUserData(updatedUser);
        setIsEditMode(false);
        alert("Profile Updated successfully!");
      })
      .catch(() => {
        setError("Failed to update data. Please try again.");
      });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    if (passwordData.oldPassword === passwordData.newPassword) {
      alert("New password cannot be the same as the old password.");
      return;
    }
    if (passwordData.oldPassword !== userData.password) {
      alert("Old password is incorrect.");
      return;
    }

    const updatedUser = {
      ...userData,
      password: passwordData.newPassword,
    };

    axios
      .put(
        `https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/LogIn/${userData.id}.json`,
        updatedUser
      )
      .then(() => {
        setUserData(updatedUser);
        setIsChangePasswordMode(false);
        alert("Password updated successfully!");

        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      })
      .catch(() => {
        setError("Failed to update password. Please try again.");
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  
  return (
    <>
      <Nav_2 />
      <div className="User-container">
        {userData && !isEditMode && !isChangePasswordMode && (
          <div className="user-profile">
            <h3>Your Profile</h3>
            <div className="profile-details">
              <ul className="profile-left">
                <li>
                  <strong>Name:</strong> {userData.username}
                </li>
                <li>
                  <strong>Age:</strong> {calculateAge(userData.dob)} Years
                </li>
                <li>
                  <strong>Email:</strong> {userData.email}
                </li>
              </ul>
              <ul className="profile-right">
                <li>
                  <strong>Gender:</strong> {userData.gender}
                </li>
                <li>
                  <strong>Weight:</strong> {userData.weight || "0"} kg
                </li>
                <li>
                  <strong>Height:</strong> {userData.height || "0"} cm
                </li>
              </ul>
            </div>
            <div className="bttns">
              <button
                className="update-btn"
                onClick={() => setIsEditMode(true)}
              >
                Update Profile
              </button>
              <button
                className="password-btn"
                onClick={() => setIsChangePasswordMode(true)}
              >
                Change Password
              </button>
            </div>
          </div>
        )}

        {isEditMode && (
          <div className="edit-profile">
            <h3>Edit Profile</h3>
            <form onSubmit={handleUpdateSubmit}>
              <div className="form-group-container">
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="username"
                    value={updatedData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Date of Birth:</label>
                  <input
                    type="date"
                    name="dob"
                    value={updatedData.dob}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Gender:</label>
                  <select
                    name="gender"
                    value={updatedData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group-container">
                <div className="form-group">
                  <label>Weight (kg):</label>
                  <input
                    type="number"
                    name="weight"
                    value={updatedData.weight}
                    onChange={handleInputChange}
                    required
                    max="200" 
                  />
                </div>
                <div className="form-group">
                  <label>Height (cm):</label>
                  <input
                    type="number"
                    name="height"
                    value={updatedData.height}
                    onChange={handleInputChange}
                    required
                    max="200" 
                  />
                </div>
              </div>
              <div className="form-buttons">
                <button className="btn-1" type="submit">
                  Update
                </button>
                <button
                  className="btn-2"
                  type="button"
                  onClick={() => setIsEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {isChangePasswordMode && (
          <div className="change-password">
            <h3>Change Password</h3>
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label>Old Password:</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>New Password:</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm Password:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="btns">
                <button className="btn-1" type="submit">
                  Change Password
                </button>
                <button
                  className="btn-2"
                  type="button"
                  onClick={() => setIsChangePasswordMode(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Diet;
