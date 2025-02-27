import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import "../Css/QrCode.css";
import Navbar from "./Navbar";
const QrCode = () => {
  const [dishes, setDishes] = useState([]);
  const [visibleQR, setVisibleQR] = useState({});

  useEffect(() => {
    fetch(
      "https://projects-b8a50-default-rtdb.asia-southeast1.firebasedatabase.app/DishScanner/DishData.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const dishesList = [];
        for (let key in data) {
          dishesList.push({ id: key, ...data[key] });
        }
        setDishes(dishesList);
      })
      .catch((error) => console.error("Error fetching dishes:", error));
  }, []);

  const toggleQR = (id) => {
    setVisibleQR((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Navbar />
      <div className="QrCode-overlay">
        <div className="QrCode">
          <h1>Dish QR Codes</h1>
          <div className="QrCode-box">
            {dishes.length === 0 ? (
              <div>No dishes available at the moment.</div> // Placeholder when no dishes are loaded
            ) : (
              dishes.map((dish) => {
                const qrData = `https://calculatecalorie.netlify.app/${dish.id}`; // Full URL to dish details

                return (
                  <div key={dish.id} className="QrCode-container">
                    <h3>{dish.dishName}</h3>
                    <button onClick={() => toggleQR(dish.id)}>
                      {visibleQR[dish.id] ? "Hide QR" : "Show QR"}
                    </button>
                    <div
                      className={`QrCode-code-wrapper ${
                        visibleQR[dish.id] ? "show" : ""
                      }`}
                    >
                      {/* Use QRCodeCanvas here instead of QRCode */}
                      <QRCodeCanvas value={qrData} size={256} />
                      <Link to={`/${dish.id}`} className="tooltip">
                        See Details
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QrCode;
