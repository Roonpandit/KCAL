import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axios from "axios";
import "../Css/Front.css";
import card_1 from "../../assets/card-1.jpg";
import card_2 from "../../assets/card-2.webp";
import card_3 from "../../assets/card-3.webp";

import userLogo from "../../assets/logo-3.png";

const Front = () => {
  const [formType, setFormType] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [data, setData] = useState({});

  const [signupData, setSignupData] = useState({
    username: "",
    type: "",
    email: "",
    dob: "",
    gender: "",
    password: "",
    confirmpassword: "",
  });

  const [loginData, setLoginData] = useState({
    type: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchAuthData();
  }, []);

  const fetchAuthData = async () => {
    try {
      const response = await axios.get(
        "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/LogIn.json"
      );
      setData(response.data || {});
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async () => {
    const { username, type, email, dob, gender, password, confirmpassword } =
      signupData;

    if (
      !username ||
      !type ||
      !email ||
      !dob ||
      !gender ||
      !password ||
      !confirmpassword
    ) {
      alert("All fields are required!");
      return;
    }

    if (password !== confirmpassword) {
      alert("Passwords do not match!");
      return;
    }

    const today = new Date();
    const dobDate = new Date(dob); // Ensure dob is in a valid format (e.g., YYYY-MM-DD)

    // Calculate the exact age by comparing the full date
    const ageInMilliseconds = today - dobDate; // Difference in milliseconds
    const ageDate = new Date(ageInMilliseconds); // Convert to Date object

    const exactAge = Math.abs(ageDate.getUTCFullYear() - 1970); // Calculate age by subtracting from epoch year (1970)

    if (exactAge < 12) {
      alert("You must be at least 12 years old to sign up.");
      return;
    }

    if (Object.values(data).some((user) => user.email === email)) {
      alert("User already exists with this Email!");
      return;
    }

    try {
      await axios.post(
        "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/LogIn.json",
        { username, type, email, dob, gender, password }
      );

      alert("Account created successfully! Please login.");
      setSignupData({
        username: "",
        type: "",
        email: "",
        dob: "",
        gender: "",
        password: "",
        confirmpassword: "",
      });
      setFormType("login");
      fetchAuthData();
    } catch (error) {
      console.log("signup failed", error.response?.data || error.message);
    }
  };

  const handleLogin = () => {
    const { type, email, password } = loginData;

    if (!type || !email || !password) {
      alert("All fields are required!");
      return;
    }

    const user = Object.values(data).find(
      (user) =>
        user.email === email && user.password === password && user.type === type
    );

    if (user) {
      login(user);
      if (user.type === "admin") {
        // {only for owner}
        navigate("/Admin");
      } else if (user.type === "user") {
        // {for multiple users}
        navigate("/User");
      }
    } else {
      alert("Invalid Email or Password!");
      setLoginData({ email: "", password: "", type: "" });
    }
  };

  const cards = [
    {
      id: 1,
      title: "Accurate Calorie Tracking",
      description:
        "Our app provides precise calorie breakdowns for each dish, helping you make informed dietary decisions.",
      image: card_1, // Replace with actual image URL
    },
    {
      id: 2,
      title: "Secure Multi-User Login",
      description:
        "We provide a secure multi-user login system with private profiles where you can schedule and manage your preferences.",
      image: card_2, // Replace with actual image URL
    },
    {
      id: 3,
      title: "User-Friendly Interface",
      description:
        "A seamless and intuitive design makes it simple to scan QR codes and view details effortlessly.",
      image: card_3, // Replace with actual image URL
    },
  ];

  const handlescan = () => {
    navigate("/Scanner");
  };
  const handleComboClick = () => {
    navigate("/QrCode");
  };
  return (
    <div>
      <div className="fronts">
        <span>
          <Link to="/About">About Us</Link>
        </span>
        <span>
          <Link to="/Contact">Contact Us</Link>
        </span>

        <span className="profile-logo">
          <Link>
            <img src={userLogo} alt="" className="profile-image" />
          </Link>
        </span>
      </div>
      <div className="front-middle">
        <div className="text">
          <h1>Kcal Calculator</h1>
          <h2>"Count Calories, Create Confidence!"</h2>

          <div className="fronts-container">
            <h3>Schedule Your Diet 👉</h3>
            {formType === "" && (
              <div className="button-container">
                <button
                  onClick={() => setFormType("login")}
                  className="front-button"
                >
                  SignIn!
                </button>
              </div>
            )}
          </div>
          <div className="btn-d">
            <button onClick={handlescan}>Scan </button>
            <button onClick={handleComboClick}>Combo</button>
          </div>
        </div>

        <div className="front-content">
          <div className="front-container">
            {formType === "login" && (
              <div className="form-container">
                {/* Close Button */}
                <button
                  className="close-button"
                  onClick={() => setFormType("")} // Close the form
                  aria-label="Close Form"
                >
                  ✖
                </button>
                <h2>Login</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                    <label>Type:</label>
                    <select
                      value={loginData.type}
                      onChange={(e) =>
                        setLoginData({ ...loginData, type: e.target.value })
                      }
                    >
                      <option value="">Select Type</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          email: e.target.value.toLowerCase(),
                        })
                      }
                      type="email"
                      placeholder="Enter Email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password:</label>
                    <input
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      type="password"
                      placeholder="Enter Password"
                    />
                  </div>
                  <button onClick={handleLogin} className="form-button">
                    Login
                  </button>
                </form>
                <p>
                  Don't have an account?{" "}
                  <span
                    className="link-text"
                    onClick={() => setFormType("signup")}
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            )}

            {formType === "signup" && (
              <div className="form-container">
                {/* Close Button */}
                <button
                  className="close-button"
                  onClick={() => setFormType("")} // Close the form
                  aria-label="Close Form"
                >
                  ✖
                </button>
                <h2>Sign Up</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                    <label>Type:</label>
                    <select
                      value={signupData.type}
                      onChange={(e) =>
                        setSignupData({ ...signupData, type: e.target.value })
                      }
                    >
                      <option value="">Select Type</option>
                      <option value="user">User</option>
                      {/* <option value="admin">Admin</option> */}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Username:</label>
                    <input
                      value={signupData.username}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          username: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth:</label>
                    <input
                      value={signupData.dob}
                      onChange={(e) =>
                        setSignupData({ ...signupData, dob: e.target.value })
                      }
                      type="date"
                      max={new Date().toISOString().split("T")[0]} // Ensure DOB is not in the future
                    />
                  </div>
                  <div className="form-group">
                    <label>Gender:</label>
                    <select
                      value={signupData.gender}
                      onChange={(e) =>
                        setSignupData({ ...signupData, gender: e.target.value })
                      }
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      value={signupData.email}
                      onChange={(e) => {
                        const emailValue = e.target.value.toLowerCase();
                        setSignupData({ ...signupData, email: emailValue });
                      }}
                      onBlur={() => {
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
                        if (!emailPattern.test(signupData.email)) {
                          alert("Please enter a valid email address.");
                        }
                      }}
                      type="email"
                      placeholder="Enter Email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password:</label>
                    <input
                      value={signupData.password}
                      onChange={(e) => {
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        });
                      }}
                      onBlur={() => {
                        const passwordPattern =
                          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
                        if (!passwordPattern.test(signupData.password)) {
                          alert(
                            "Password must be at least 6 characters long, include one uppercase letter, one number, and one special character."
                          );
                        }
                      }}
                      type="password"
                      placeholder="Enter Password"
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password:</label>
                    <input
                      value={signupData.confirmpassword}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          confirmpassword: e.target.value,
                        })
                      }
                      type="password"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <button onClick={handleSignup} className="form-button">
                    Create Account
                  </button>
                </form>
                <p>
                  Already have an account?{" "}
                  <span
                    className="link-text"
                    onClick={() => setFormType("login")}
                  >
                    Login
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="main-box">
          <h1 className="headline">Why Choose Us</h1>
          <div className="cards-box">
            {cards.map((card) => (
              <div key={card.id} className="card">
                <img src={card.image} alt={card.title} className="card-image" />
                <h2 className="card-title">{card.title}</h2>
                <p className="card-description">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Front;
