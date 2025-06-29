import React, { useState } from "react";
import "../pageStyle/SellProduct.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const Sell = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Books/Notes");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validCategories = [
        "Books/Notes",
        "Stationaries",
        "Cycle",
        "Sports",
        "Electronics",
        "Miscellaneous",
      ];
      const productData = {
        name: title,
        price: parseFloat(price),
        category: validCategories.includes(category)
          ? category
          : "Miscellaneous",
        description,
        image: preview || "",
      };
      const res = await axios.post(
        "http://localhost:5000/api/products/add",
        productData,
        { withCredentials: true }
      );

      if (res.status === 201) {
        setMessage("product listed successfully!");
        setTimeout(() => {
          setTitle("");
          setPrice("");
          setCategory("books");
          setDescription("");
          setImage(null);
          setPreview(null);
        }, 3000);
      } else {
        setMessage("something went wrong, Try again");
      }
    } catch (error) {
      console.error(
        "Error submitting product:",
        error.response?.data || error.message
      );
      setMessage("Error submitting product");
    }

    // Reset
    setTitle("");
    setPrice("");
    setCategory("books");
    setDescription("");
    setImage(null);
    setPreview(null);
  };

  return (
    <>
      <Navbar />
      <div className="sell-page">
        <h2>Post Your Product</h2>
        <form className="sell-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Books/Notes">Books/Notes</option>
            <option value="Stationaries">Stationaries</option>
            <option value="Cycle">Cycle</option>
            <option value="Sports">Sports</option>
            <option value="Electronics">Electronics</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
          <textarea
            placeholder="Description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <label className="upload-label">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>

          {preview && (
            <img src={preview} alt="Preview" className="preview-image" />
          )}

          <button type="submit">Submit</button>
        </form>
        {message && (
          <p style={{ marginTop: "1rem", textAlign: "center" }}>{message}</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Sell;
