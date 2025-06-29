import React from "react";
import { Heart, ShoppingCart, X } from "lucide-react";
import "./ProductCard.css"; // for custom styling
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const ProductCard = ({
  product,
  initialWishlisted = false,
  disableWishlist = false,
  onRemoveFromWishlist,
}) => {
  const [wishlisted, setwishlisted] = useState(initialWishlisted);

  useEffect(() => {
    setwishlisted(initialWishlisted);
  }, [initialWishlisted]);

  const handleWishlistClick = async () => {
    try {
      if (wishlisted) {
        await axios.delete(
          `http://localhost:5000/api/users/wishlist/${product._id}`,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          `http://localhost:5000/api/users/wishlist`,
          { productId: product._id },
          { withCredentials: true }
        );
      }

      setwishlisted(!wishlisted);
    } catch (err) {
      console.error(
        "Error updating wishlist:",
        err.response?.data || err.message
      );
    }
  };
  const handleRemoveClick = () => {
    if (onRemoveFromWishlist) {
      onRemoveFromWishlist(product._id);
    }
  };
  return (
    <div className="shadow product-card">
      <img src={product.image} className="product-image" alt={product.name} />
      <div className="product-details">
        <h5 className="product-title">{product.name}</h5>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">₹{product.price}</span>
          <div className="product-actions">
            {!disableWishlist ? (
              <button
                className="icon-btn heart"
                onClick={handleWishlistClick}
                style={{ color: wishlisted ? "red" : "#f7e9dc" }}
                title={wishlisted ? "remove from wishlist" : "add to wishlist"}
              >
                <Heart fill={wishlisted ? "red" : "none"} size={20} />
              </button>
            ) : (
              <button
                className="icon-btn heart"
                onClick={handleRemoveClick}
                style={{ color: "darkred" }}
                title="Remove from wishlist"
              >
                <X size={20} />
              </button>
            )}

            <button className="icon-btn cart">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
