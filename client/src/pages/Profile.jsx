import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../pageStyle/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [uRes, pRes] = await Promise.all([
          axios.get("http://localhost:5000/api/users/user-details", {
            withCredentials: true,
          }),
          axios.get("http://localhost:5000/api/products/user", {
            withCredentials: true,
          }),
        ]);
        setUser(uRes.data.data);
        setMyProducts(pRes.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <section className="user-info">
          <h2>👤 Your Profile</h2>
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Mobile:</strong> {user?.mobile || "Not set"}
          </p>
        </section>

        <section className="user-listings">
          <h2>Your Listings</h2>
          {myProducts.length ? (
            <div className="grid">
              {myProducts.map((prod) => (
                <div key={prod._id} className="product-card-small">
                  <img src={prod.image} alt={prod.name} />
                  <div className="info">
                    <h4>{prod.name}</h4>
                    <p>₹{prod.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>You haven't listed anything yet.</p>
          )}
        </section>

        {/* Optional: future order history */}
        {/* <section className="order-history"> ... </section> */}
      </div>
      <Footer />
    </>
  );
};

export default Profile;
