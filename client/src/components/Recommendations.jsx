import React from "react";
import ProductCard from "./ProductCard";
import "./Recommendations.css";

const sampleProducts = [
  {
    id: 1,
    name: "Coffee Notebook",
    description: "Lined, eco-friendly notebook with coffee-themed cover.",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Campus Bicycle",
    description: "Reliable used cycle for on-campus commuting.",
    price: 2799,
    image:
      "https://images.unsplash.com/photo-1608219677720-a43cf84eb3ce?fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Second-Hand Textbooks",
    description: "Engineering books in good condition.",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Scientific Calculator",
    description: "Perfect for exams and assignments.",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1593642634367-d91a135587b5?fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Stationery Kit",
    description: "Pens, markers, and more in a bundle.",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1588776814546-b51308c5d78e?fit=crop&w=600&q=80",
  },
];

const Recommendations = () => {
  return (
    <section className="recommendations-section">
      <h2 className="recommendations-heading">Recommended for You</h2>
      <div className="product-grid">
        {sampleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Recommendations;
