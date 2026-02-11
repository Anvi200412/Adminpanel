
import React, { useState } from "react";
import { Link } from "react-router-dom";
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

  return (
    <>
     
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </button>

      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <h2 className="logo">Admin</h2>

        <ul className="menu">
          <li>
            <Link to="/">
              <FaTachometerAlt className="icon" />
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link to="/products">
              <FaBox className="icon" />
              <span>Products</span>
            </Link>
          </li>

          <li>
            <Link to="/users">
              <FaUsers className="icon" />
              <span>Users</span>
            </Link>
          </li>

          <li>
            <Link to="/orders">
              <FaShoppingCart className="icon" />
              <span>Orders</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;

