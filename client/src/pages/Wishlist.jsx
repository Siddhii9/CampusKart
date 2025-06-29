import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../pageStyle/Marketplace.css"; // reuse Marketplace styles

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/wishlist",
          {
            withCredentials: true,
          }
        );

        if (res.data.data.length > 0) {
          setWishlistItems(res.data.data);
        } else {
          setMessage("Your wishlist is empty.");
        }
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
        setMessage("Error loading wishlist.");
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/users/wishlist/${productId}`,
        { withCredentials: true }
      );
      setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
    } catch (err) {
      console.log(
        "error removing from wishlist:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <>
      <Navbar />
      <section className="marketplace-container">
        <h2 className="marketplace-heading"> Your Wishlist</h2>
        <div className="product-grid">
          {wishlistItems.length > 0 ? (
            wishlistItems.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                initialWishlisted={true}
                disableWishlist={true}
                onRemoveFromWishlist={handleRemove}
              />
            ))
          ) : (
            <p style={{ textAlign: "center", marginTop: "2rem" }}>{message}</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Wishlist;
