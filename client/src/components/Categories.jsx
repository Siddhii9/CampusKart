import React from "react";
import "./Categories.css";
import { Link } from "react-router-dom";

const categories = [
  { name: "Books/Notes" },
  { name: "Stationaries" },
  { name: "Cycle" },
  { name: "Sports" },
  { name: "Electronics" },
  { name: "Miscellaneous" },
];

const Categories = () => {
  return (
    <section className="categories-section">
      <h2 className="categories-heading">☕ Categories to Explore</h2>
      <div className="categories-container">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/marketplace?category=${encodeURIComponent(category.name)}`}
            className="category-card"
          >
            <span>{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
