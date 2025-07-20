import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../pageStyle/Checkout.css";

const Checkout = () => {
  const { cartItemId } = useParams();
  const [item, setItem] = useState(null);
  const [message, setMessage] = useState("");

  const handleMarkAsPaid = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/orders/mark-paid/${cartItemId}`,
        {},
        { withCredentials: true }
      );
      setMessage(
        res.data.message || "Payment marked. Awaiting seller confirmation."
      );
    } catch (err) {
      console.error(err);
      setMessage("Error marking payment. Try again.");
    }
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/cart/item/${cartItemId}`,
          {
            withCredentials: true,
          }
        );
        console.log("Checkout item data:", res.data.data);
        setItem(res.data.data);
      } catch (err) {
        console.error(err);
        setMessage("Failed to load checkout details");
      }
    };

    fetchItem();
  }, [cartItemId]);

  if (!item) return <div>Loading checkout...</div>;

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <h2>Checkout</h2>
        <p>
          <strong>Product:</strong> {item.productId.name}
        </p>
        <p>
          <strong>Price:</strong> ₹{item.productId.price}
        </p>
        <p>
          <strong>Quantity:</strong> {item.quantity}
        </p>
        <p>
          <strong>Total:</strong> ₹{item.quantity * item.productId.price}
        </p>

        <div className="upi-info">
          <h3>Pay Seller Using UPI</h3>
          <p>
            <strong>Seller UPI ID:</strong>{" "}
            {item.productId.seller?.upi_id || "not provided"}
          </p>
          <p>
            <strong>Seller Phone:</strong>{" "}
            {item.productId.seller?.mobile || "not provided"}
          </p>
          <p>
            Use any UPI app to make the payment manually. Once paid, the seller
            will be notified to confirm.
          </p>
          <button className="checkout-confirm-btn" onClick={handleMarkAsPaid}>
            I've Paid the Seller
          </button>
        </div>

        {message && <p>{message}</p>}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
//generate this on backend with `upi://pay?pa=...&pn=...&am=...`
//<img src={`https://api.qrserver.com/v1/create-qr-code/?data=upi://pay?pa=${upiId}&pn=${sellerName}&am=${total}`} />
