import React, { useState } from "react";
import { Heart, ShoppingCart, User } from "lucide-react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      const term = searchQuery.trim();
      try {
        await axios.post(
          "http://localhost:5000/api/users/save-search",
          { searchTerm: term },
          { withCredentials: true }
        );
      } catch (error) {
        console.error("error saving search: ", error);
      }

      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="coffee-navbar">
      <div className="nav-left">
        <div className="logo">CampusKart ☕</div>
        <ul className="nav-links">
          <li>
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/sell" className="nav-link">
              Sell
            </Link>
          </li>
        </ul>
      </div>

      <div className="nav-search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <div className="nav-right">
        <Link to="/wishlist" className="nav-link">
          <Heart size={20} />
        </Link>
        <Link to="/cart" className="nav-link">
          <ShoppingCart size={20} />
        </Link>
        <Link to="/profile" className="nav-link">
          <User size={20} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
