// import Login from "./components/Login";

// function App() {
//   return <Login />;
// }

// export default App;
import React from "react";
import ProductCard from "./components/ProductCard";

const product = {
  image:
    "https://i.etsystatic.com/9923905/r/il/d55887/5438458013/il_1588xN.5438458013_ir76.jpg",
  name: "Campus Coffee Mug",
  description: "A cozy ceramic mug perfect for those early morning lectures.",
  price: 199,
};

const App = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(to bottom, #f4ebe2, #e6d3b3)",
      }}
    >
      <ProductCard product={product} />
    </div>
  );
};

export default App;
