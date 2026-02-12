import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Auth.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(u => u.email === email && u.password === password);
    if (!validUser) {
      alert("Invalid credentials");
      return;
    }
    localStorage.setItem("auth", JSON.stringify(validUser));
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
