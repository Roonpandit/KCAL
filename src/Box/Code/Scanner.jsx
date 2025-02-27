import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import "../Css/Scanner.css"; // Import the CSS file
import Navbar from "./Navbar";
const Scanner = () => {
  const navigate = useNavigate();
  const scannerRef = useRef(null);
  const [decodedText, setDecodedText] = useState("");
  const [error, setError] = useState("");
  const [scannerActive, setScannerActive] = useState(true); // State to control scanner visibility

  // Function to start the scanner
  const startScanner = () => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    scanner.render(
      (text) => {
        setDecodedText(text);
        setError(""); // Clear error when scan is successful
        setScannerActive(false); // Deactivate the scanner after scanning
        scanner.clear(); // Clear scanner to stop continuous scanning
      },
      (scanError) => {
        setDecodedText(""); // Clear the decoded text if error occurs
        setError(`Scanning error: Scan a valid code`);
      }
    );

    scannerRef.current = scanner;
  };

  // Initialize scanner when the component mounts or scannerActive changes
  useEffect(() => {
    if (scannerActive) {
      startScanner(); // Start the scanner
    }

    return () => {
      scannerRef.current
        .clear()
        .catch((clearError) => console.error(clearError));
    };
  }, [scannerActive]); // Re-run effect when scannerActive state changes

  // Handle the "Scan Again" button click
  const handleScanAgain = () => {
    setDecodedText(""); // Clear decoded text
    setError(""); // Clear any error messages
    setScannerActive(true); // Re-activate the scanner
  };
  const handleClose = () => {
    navigate("/");
  };
  return (
    <>
      <Navbar />
      <div className="scanner-container">
        <button onClick={handleClose} className="close-button">
          &times;
        </button>
        <h1 className="scanner-title">QR Code Scanner</h1>
        {decodedText && (
          <p className="decoded-text">
            Decoded URL:{" "}
            <a href={decodedText} target="_blank" rel="noopener noreferrer">
              {decodedText}
            </a>
          </p>
        )}
        {!scannerActive && decodedText && (
          <button onClick={handleScanAgain} className="scan-again-button">
            Scan Again
          </button>
        )}
        <div id="reader"></div>

        {error && <p className="error-text">{error}</p>}
      </div>
    </>
  );
};

export default Scanner;
