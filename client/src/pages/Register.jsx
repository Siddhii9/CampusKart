import React, { useState } from "react";
import axios from "axios";
import "../pageStyle/Login.css"; // reuse same style for coffee-theme consistency
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/campuskartlogo.png";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    upi_id: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        setMessage("Registered successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(res.data.message || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <img src={logo} alt="CampusKart Logo" className="logo" />
        <h2>Create Your Account</h2>

        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          placeholder="Mobile Number"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="UPI ID"
          name="upi_id"
          value={formData.upi_id}
          onChange={handleChange}
        />

        <button type="submit">Register</button>

        {message && <p className="login-message">{message}</p>}

        <p className="auth-toggle">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#a97453", fontWeight: "bold" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
