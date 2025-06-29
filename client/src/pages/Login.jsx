import React, { useState } from "react";
import axios from "axios";
import "../pageStyle/Login.css";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/campuskartlogo.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        setMessage("Login successful!");
        // Redirect to home or dashboard
        setTimeout(() => navigate("/home"), 2000);
      } else {
        setMessage(res.data.message || "Login failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <img src={logo} alt="CampusKart Logo" className="logo" />
        <h2>Welcome Back!</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {message && <p className="login-message">{message}</p>}
        <p className="auth-toggle">
          New to CampusKart?{" "}
          <Link to="/register" style={{ color: "#a97453", fontWeight: "bold" }}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
