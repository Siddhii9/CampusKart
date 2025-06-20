// import React from "react";
// import "../pageStyle/Marketplace.css";
// import ProductCard from "../components/ProductCard";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { useLocation } from "react-router-dom";

// const products = [
//   {
//     image:
//       "https://m.media-amazon.com/images/I/61v-yg+o2ZL._AC_UF1000,1000_QL80_.jpg",
//     name: "Classmate Notebook Set",
//     description: "Set of 5 ruled notebooks for class notes.",
//     price: 299,
//     category: "Stationaries",
//   },
//   {
//     image: "https://m.media-amazon.com/images/I/81pZjqWZ89L._SL1500_.jpg",
//     name: "Casio Scientific Calculator",
//     description: "Perfect for solving numerical problems.",
//     price: 849,
//     category: "Electronics",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1616627981385-8ed729b5f0f9?auto=format&fit=crop&w=500&q=80",
//     name: "Used Bicycle",
//     description: "Well-maintained geared cycle, perfect for campus.",
//     price: 4500,
//     category: "Cycle",
//   },
// ];

// const Marketplace = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const searchQuery = searchParams.get("search");
//   const categoryQuery = searchParams.get("category");

//   const filteredProducts = products.filter((product) => {
//     const matchesSearch = searchQuery
//       ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         product.category.toLowerCase().includes(searchQuery.toLowerCase())
//       : true;

//     const matchesCategory = categoryQuery
//       ? product.category.toLowerCase() === categoryQuery.toLowerCase()
//       : true;

//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <>
//       <Navbar />
//       <section className="marketplace-container">
//         <h2 className="marketplace-heading">☕ Explore Marketplace</h2>

//         {(searchQuery || categoryQuery) && (
//           <p style={{ textAlign: "center" }}>
//             Showing results for: <strong>{searchQuery || categoryQuery}</strong>
//           </p>
//         )}
//         <div className="product-grid">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((product, index) => (
//               <ProductCard product={product} key={index} />
//             ))
//           ) : (
//             <p style={{ textAlign: "center", marginTop: "2rem" }}>
//               No products found matching <strong>{searchQuery}</strong>
//             </p>
//           )}
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default Marketplace;

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

  useEffect(() => {
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
              <ProductCard product={product} key={product._id || index} />
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
