import React from "react";
import { useNavigate } from "react-router-dom";
import "../Css/About.css";
import Navbar from "./Navbar";

function About() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  
  return (
    <>
      <Navbar />
      <div>
        <div className="about-container">
          <button onClick={handleClose} className="close-button">
            &times;
          </button>
          <h1 className="about-title">About Calculate Calorie</h1>
          <p className="about-description">
            Welcome to <strong>Calculate Calorie</strong>, an innovative web
            application designed to help users easily calculate and manage the
            calorie content of their favorite food dishes. Whether you're trying
            to make healthier food choices, tracking your calorie intake, or
            simply curious about the nutritional value of your meals, we’ve got
            you covered. Our application leverages the power of QR code scanning
            to provide an intuitive, real-time experience that dynamically
            updates calorie counts based on the dish constituents.
          </p>

          <h2 className="about-section-title">Our Mission</h2>
          <p className="about-text">
            At <strong>Calculate Calorie</strong>, we are passionate about
            empowering users with the information they need to take charge of
            their health. The app allows users to scan a QR code embedded with
            food dish information and instantly access the calorie breakdown of
            all the individual ingredients. With this feature, users can modify
            the quantities of the ingredients and see the updated calorie count
            in real-time, providing a seamless, interactive experience.
          </p>

          <h2 className="about-section-title">Key Features</h2>
          <ul className="about-list">
            <li>
              <strong>QR Code Scanning:</strong> The ability to scan a QR code
              containing detailed information about a dish, including the name
              of the dish and the ingredients. Once scanned, users can view the
              nutritional breakdown of the dish and each individual ingredient's
              calorie content.
            </li>
            <li>
              <strong>Dynamic Calorie Calculation:</strong> After scanning the
              dish, the application calculates and displays the total calorie
              count based on the ingredients' quantities. Users can easily
              modify the quantities, and the calorie count will automatically
              update in real-time.
            </li>
            <li>
              <strong>Inventory Management:</strong> For dishes and individual
              ingredients, our system allows for seamless management of food
              items through a CRUD (Create, Read, Update, Delete) interface.
              Admins can add, update, or remove dishes and constituent
              ingredients, ensuring that the calorie data is always up-to-date.
            </li>
            <li>
              <strong>Real-Time Updates:</strong> Users can interact with the
              application by adjusting the quantities of ingredients in the
              scanned dish. The app dynamically adjusts the calorie totals,
              providing instant feedback to users.
            </li>
            <li>
              <strong>Comprehensive Dish Details:</strong> Each scanned dish
              comes with a detailed breakdown of the individual items that make
              up the dish. For example, if you scan a dish like the "Idli Vada
              Combo," the app will show the exact calorie count for each
              ingredient, such as Idli, Vada, Sambhar, and Chutney.
            </li>
          </ul>

          <h2 className="about-section-title">Our Team</h2>
          <p className="about-text">
            Our team of <strong>Full Stack Developers</strong>—Tarun Vashitsh,
            Shivateja Keerthi, Manish Ganesh Nagpure, and Vasanthkumar—has
            worked diligently to create an app that is both functional and
            user-friendly. Our combined expertise has helped us develop a
            cutting-edge platform that is fast, reliable, and easy to use. We
            have worked extensively with technologies such as React.js to
            provide a seamless frontend experience, while Firebase serves as our
            powerful backend, allowing us to store and manage all the necessary
            data efficiently.
          </p>

          <h2 className="about-section-title">Our Vision</h2>
          <p className="about-text">
            We understand the importance of accuracy when it comes to calorie
            counting, and that’s why we ensure our database is regularly updated
            with the latest nutritional information. Our mission is to make
            calorie tracking as effortless and informative as possible, so users
            can make well-informed decisions about what they eat.
          </p>

          <p className="about-text">
            Whether you're trying to manage your weight, maintain a healthy
            lifestyle, or simply gain more knowledge about the food you consume,{" "}
            <strong>Calculate Calorie</strong> is here to help. Our platform's
            focus on simplicity, real-time data updates, and user interactivity
            makes it a unique and valuable tool for anyone looking to monitor
            and manage their calorie intake effectively.
          </p>

          <p className="about-text">
            Thank you for choosing <strong>Calculate Calorie</strong>—where your
            health and nutritional goals are our top priority. We are constantly
            improving and evolving the platform to meet your needs, and we are
            excited for you to explore all the possibilities our application has
            to offer.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
