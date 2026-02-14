// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaBars,
//   FaTachometerAlt,
//   FaBox,
//   FaUsers,
//   FaShoppingCart,
//   FaMoon,
//   FaSun
// } from "react-icons/fa";
// import { ThemeContext } from "../Context/ThemeContext";
// import "./Sidebar.css";

// function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [logoutActive, setLogoutActive] = useState(true);
//   const navigate = useNavigate();

//   const { theme, toggleTheme } = useContext(ThemeContext);

//   const handleLogoutToggle = () => {
//     setLogoutActive(!logoutActive);

//     if (!logoutActive) {
//       localStorage.removeItem("auth");
//       navigate("/login");
//     }
//   };

//   return (
//     <div className={`sidebar ${isOpen ? "active" : ""}`}>
//       {/* Toggle Sidebar Button */}
//       <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
//         <FaBars />
//       </button>

//       <h2 className="logo">Admin</h2>

//       {/* Menu */}
//       <ul className="menu" style={{ flexGrow: 1 }}>
//         <li>
//           <Link to="/"><FaTachometerAlt /> Dashboard</Link>
//         </li>
//         <li>
//           <Link to="/products"><FaBox /> Products</Link>
//         </li>
//         <li>
//           <Link to="/users"><FaUsers /> Users</Link>
//         </li>
//         <li>
//           <Link to="/orders"><FaShoppingCart /> Orders</Link>
//         </li>
//       </ul>

//       {/* Theme Toggle */}
//       <div style={{ padding: "15px 0", textAlign: "center" }}>
//         <button
//           onClick={toggleTheme}
//           style={{
//             background: "transparent",
//             border: "none",
//             color: "var(--text-color)",
//             fontSize: "20px",
//             cursor: "pointer"
//           }}
//         >
//           {theme === "light" ? <FaMoon /> : <FaSun />}
//         </button>

//         <div
//           style={{
//             marginTop: "5px",
//             color: "var(--text-color)",
//             fontSize: "14px"
//           }}
//         >
//           {theme === "light" ? "Dark Mode" : "Light Mode"}
//         </div>
//       </div>

//       {/* Logout Toggle */}
//       <div
//         style={{
//           padding: "20px 0",
//           borderTop: "1px solid rgba(255,255,255,0.1)",
//           textAlign: "center"
//         }}
//       >
//         <div
//           onClick={handleLogoutToggle}
//           style={{
//             width: "50px",
//             height: "28px",
//             borderRadius: "14px",
//             backgroundColor: logoutActive ? "#5a6b83" : "#ccc",
//             position: "relative",
//             margin: "0 auto",
//             cursor: "pointer",
//             transition: "background-color 0.3s ease"
//           }}
//         >
//           <span
//             style={{
//               display: "block",
//               width: "24px",
//               height: "24px",
//               borderRadius: "50%",
//               background: "#fff",
//               position: "absolute",
//               top: "2px",
//               left: logoutActive ? "2px" : "calc(100% - 26px)",
//               transition: "left 0.3s ease"
//             }}
//           />
//         </div>

//         <div
//           style={{
//             marginTop: "8px",
//             color: "var(--text-color)",
//             fontWeight: "600",
//             fontSize: "14px",
//             userSelect: "none"
//           }}
//         >
//           Logout
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaMoon,
  FaSun
} from "react-icons/fa";
import { ThemeContext } from "../Context/ThemeContext";
import "./Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutActive, setLogoutActive] = useState(true);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

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
        <li><Link to="/"><FaTachometerAlt /> Dashboard</Link></li>
        <li><Link to="/products"><FaBox /> Products</Link></li>
        <li><Link to="/users"><FaUsers /> Users</Link></li>
        <li><Link to="/orders"><FaShoppingCart /> Orders</Link></li>
      </ul>

      {/* Theme Toggle */}
      <div style={{ textAlign: "center", padding: "15px 0" }}>
        <button
          onClick={toggleTheme}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-light)",
            fontSize: "20px",
            cursor: "pointer"
          }}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
        <div style={{ color: "var(--text-light)", fontSize: "14px" }}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </div>
      </div>

      {/* Logout Toggle */}
      <div style={{ padding: "20px 0", textAlign: "center" }}>
        <div
          onClick={handleLogoutToggle}
          style={{
            width: "50px",
            height: "28px",
            borderRadius: "14px",
            backgroundColor: logoutActive ? "#5a6b83" : "#ccc",
            position: "relative",
            margin: "0 auto",
            cursor: "pointer"
          }}
        >
          <span
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "#fff",
              position: "absolute",
              top: "2px",
              left: logoutActive ? "2px" : "calc(100% - 26px)",
              transition: "left 0.3s ease"
            }}
          />
        </div>
        <div style={{ marginTop: "8px", color: "var(--text-light)" }}>
          Logout
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

