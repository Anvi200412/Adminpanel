import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Auth.css';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered successfully!");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input type="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
