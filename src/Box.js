import React from "react";
//import Viplogo from './img/img33.jpg'
const Banner = () => {
  return (
    <div
      className="container mt-5"
      style={{
        maxWidth: "800px", // Limits the overall width
        backgroundColor: "#2a2036", // Dark purple background
        borderRadius: "10px",
        padding: "20px 25px", // Adjusted padding for compact height
        color: "#f5d7ac",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        margin: "0 auto", // Centers the box
      }}
    >
      {/* Left Section */}
      <div style={{ flex: 2 }}>
        <h2
          style={{
            fontSize: "1.8rem", // Reduced font size for better alignment
            fontWeight: "bold",
            lineHeight: "1.2",
            margin: "0",
            color: "#D2B17C",
            fontFamily: "Roboto serif, serif",
          }}
        >
          Exclusive & Personalised Matchmaking
        </h2>
        <h3
          style={{
            fontSize: "1.8rem", // Reduced font size for better alignment
            fontWeight: "bold",
            marginTop: "5px",
            color: "#D2B17C",
            fontFamily: "Roboto serif, serif",
          }}
        >
          by Shaadi.com
        </h3>
        <p
          style={{
            fontSize: "0.9rem", // Slightly smaller text size
            marginTop: "10px",
            color: "#ffffff",
            fontWeight: "500",
            fontFamily: "Roboto serif, serif",
          }}
        >
          Top Rated Consultants | 5 times higher success rates | 100% Privacy
        </p>
      </div>

      {/* Middle Section with Divider */}
      <div
        className="d-none d-md-block"
        style={{
          textAlign: "center",
          borderLeft: "1px solid #D2B17C",
          height: "120px", // Adjusted height of the divider
          margin: "0 20px", // Keeps minimal space around divider
        }}
      ></div>

      {/* Right Section */}
      <div className="d-grid align-items-center">
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#D2B17C" }}>
          VIPSHAADI.COM
        </h2>
        <a
          href="#"
          style={{
            backgroundColor: "#D2B17C",
            color: "#2a1849",
            fontWeight: "bold",
            padding: "8px 15px", // Reduced padding for compact button size
            border: "none",
            borderRadius: "5px",
            textDecoration: "none",
            fontSize: "1rem", // Smaller button text
            display: "inline-block",
            marginTop: "10px",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#f5d7ac";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#D2B17C";
          }}
        >
          Get Invited →
        </a>
      </div>
    </div>
  );
};

export default Banner;
