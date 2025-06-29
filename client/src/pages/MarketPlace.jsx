import React, { useEffect, useState } from "react";
import "../pageStyle/Marketplace.css";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Marketplace = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");
  const categoryQuery = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [wishlist, setwishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users/wishlist",
          {
            withCredentials: true,
          }
        );

        setwishlist(res.data.data.map((item) => item._id));
      } catch (err) {
        console.error("error fetching wishlist:", err);
      }
    };
    const fetchProducts = async () => {
      console.log("Marketplace query params:", {
        category: categoryQuery,
        search: searchQuery,
      });
      try {
        let url = "http://localhost:5000/api/products/filter";

        if (categoryQuery) {
          url += `?category=${categoryQuery}`;
        } else if (searchQuery) {
          url += `?search=${searchQuery}`;
        }

        const res = await axios.get(url);

        if (res.data.length > 0) {
          setProducts(res.data);
          setMessage("");
        } else {
          setProducts([]);
          setMessage("No products found.");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setMessage("Error fetching products.");
      }
    };

    fetchProducts();
    fetchWishlist();
  }, [categoryQuery, searchQuery]);

  return (
    <>
      <Navbar />
      <section className="marketplace-container">
        <h2 className="marketplace-heading">☕ Explore Marketplace</h2>

        {(searchQuery || categoryQuery) && (
          <p style={{ textAlign: "center" }}>
            Showing results for: <strong>{searchQuery || categoryQuery}</strong>
          </p>
        )}

        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard
                product={product}
                key={product._id || index}
                initialWishlisted={wishlist.includes(product._id)}
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

export default Marketplace;
