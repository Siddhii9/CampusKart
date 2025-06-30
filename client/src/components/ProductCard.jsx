import React from "react";
import { Heart, ShoppingCart, X, Check } from "lucide-react";
import "./ProductCard.css"; // for custom styling
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({
  product,
  initialWishlisted = false,
  disableWishlist = false,
  onRemoveFromWishlist,
}) => {
  const [wishlisted, setwishlisted] = useState(initialWishlisted);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setwishlisted(initialWishlisted);

    const checkCart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cart", {
          withCredentials: true,
        });

        const alreadyInCart = res.data.data.some(
          (item) => item.productId?._id?.toString() === product._id.toString()
        );

        setInCart(alreadyInCart);
      } catch (err) {
        console.err("error checking cart: ", err.response?.data || err.message);
      }
    };
    checkCart();
  }, [initialWishlisted, product._id]);

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

  const handleAddToCart = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart",
        { productId: product._id },
        { withCredentials: true }
      );
      setInCart(true);
      console.log("added to cart:", res.data.message);
    } catch (err) {
      console.err("error adding to cart: ", err.response?.data || err.message);
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
            {inCart ? (
              <Link
                to="/cart"
                className="icon-btn cart in-cart"
                title="Go to Cart"
              >
                <Check size={20} />
              </Link>
            ) : (
              <button
                className="icon-btn cart"
                onClick={handleAddToCart}
                title="Add to Cart"
              >
                <ShoppingCart size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
