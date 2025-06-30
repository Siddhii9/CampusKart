import ProductCard from "./ProductCard";
import "./Recommendations.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Recommendations = () => {
  const [recommended, setRecommended] = useState([]);
  const [wishlistIds, setwishlistIds] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/recommendations",
          { withCredentials: true }
        );
        setRecommended(res.data.data);
      } catch (error) {
        console.log("error fetching recommendations: ", error);
      }
    };

    const fetchWishlist = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/wishlist",
          { withCredentials: true }
        );
        const ids = res.data.data.map((item) => item._id);
        setwishlistIds(ids);
      } catch (err) {
        console.log("error fetching wishlist:,", err);
      }
    };
    fetchRecommendations();
    fetchWishlist();
  }, []);

  if (!recommended.length) return null;

  return (
    <section className="recommendations-section">
      <h2 className="recommendations-heading">Recommended for You</h2>
      <div className="product-grid">
        {recommended.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            initialWishlisted={wishlistIds.includes(product._id)}
          />
        ))}
      </div>
    </section>
  );
};

export default Recommendations;
