import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaShoppingCart
} from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutActive, setLogoutActive] = useState(true);
  const navigate = useNavigate();

  const handleLogoutToggle = () => {
    setLogoutActive(!logoutActive);

    if (!logoutActive) {
      localStorage.removeItem("auth");
      navigate("/login");
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "active" : ""}`}>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </button>

      <h2 className="logo">Admin</h2>

      <ul className="menu" style={{ flexGrow: 1 }}>
        <li>
          <Link to="/"><FaTachometerAlt /> Dashboard</Link>
        </li>
        <li>
          <Link to="/products"><FaBox /> Products</Link>
        </li>
        <li>
          <Link to="/users"><FaUsers /> Users</Link>
        </li>
        <li>
          <Link to="/orders"><FaShoppingCart /> Orders</Link>
        </li>
      </ul>

      {/* Logout toggle container at the bottom */}
      <div 
        style={{ 
          padding: "20px 0", 
          borderTop: "1px solid rgba(255,255,255,0.1)", 
          textAlign: "center" 
        }}
      >
        <div
          onClick={handleLogoutToggle}
          style={{
            width: "50px",
            height: "28px",
            borderRadius: "14px",
            backgroundColor: logoutActive ? "#5a6b83" : "#ccc",
            position: "relative",
            margin: "0 auto",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          <span
            style={{
              display: "block",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "#fff",
              position: "absolute",
              top: "2px",
              left: logoutActive ? "2px" : "calc(100% - 26px)",
              transition: "left 0.3s ease",
            }}
          />
        </div>

        <div
          style={{
            marginTop: "8px",
            color: "#fff",
            fontWeight: "600",
            fontSize: "14px",
            userSelect: "none",
          }}
        >
          Logout
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

