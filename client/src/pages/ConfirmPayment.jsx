import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ConfirmPayment = () => {
  const { orderId } = useParams();
  const [message, setMessage] = useState("Confirming...");

  useEffect(() => {
    const confirm = async () => {
      try {
        const res = await axios.post(
          `/api/order/seller/confirm/${orderId}`,
          {},
          { withCredentials: true }
        );
        setMessage(res.data.message || "Payment confirmed.");
      } catch (err) {
        setMessage(err?.response?.data?.message || "Something went wrong");
      }
    };
    confirm();
  }, [orderId]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>{message}</h2>
    </div>
  );
};

export default ConfirmPayment;
