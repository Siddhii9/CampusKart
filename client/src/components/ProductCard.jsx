import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import "./ProductCard.css"; // for custom styling

const ProductCard = ({ product }) => {
  return (
    <div className="shadow product-card">
      <img src={product.image} className="product-image" alt={product.name} />
      <div className="product-details">
        <h5 className="product-title">{product.name}</h5>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">₹{product.price}</span>
          <div className="product-actions">
            <button className="icon-btn heart">
              <Heart size={20} />
            </button>
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
