import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import "../pageStyle/Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        withCredentials: true,
      });
      setCartItems(res.data.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setMessage("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${productId}`, {
        withCredentials: true,
      });
      setCartItems((prev) =>
        prev.filter((item) => item.productId._id !== productId)
      );
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const handleQuantityChange = async (productId, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;

    try {
      await axios.patch(
        `http://localhost:5000/api/cart/${productId}`,
        { quantity: newQty },
        { withCredentials: true }
      );
      // Update locally too
      setCartItems((prev) =>
        prev.map((item) =>
          item.productId._id === productId
            ? { ...item, quantity: newQty }
            : item
        )
      );
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <h2 className="cart-title"> Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty </p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item-card">
                  <img src={item.productId.image} alt={item.productId.name} />
                  <div className="cart-item-details">
                    <h4>{item.productId.name}</h4>
                    <div className="quantity-control">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.productId._id,
                            item.quantity,
                            -1
                          )
                        }
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.productId._id,
                            item.quantity,
                            1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <p>₹{item.productId.price * item.quantity}</p>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.productId._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Total: ₹{totalPrice}</h3>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
