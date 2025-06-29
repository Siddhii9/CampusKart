// import Login from "./components/Login";

// function App() {
//   return <Login />;
// }

// export default App;
// import React from "react";
// import ProductCard from "./components/ProductCard";

// const product = {
//   image:
//     "https://i.etsystatic.com/9923905/r/il/d55887/5438458013/il_1588xN.5438458013_ir76.jpg",
//   name: "Campus Coffee Mug",
//   description: "A cozy ceramic mug perfect for those early morning lectures.",
//   price: 199,
// };

// const App = () => {
//   return (
//     <div
//       className="d-flex justify-content-center align-items-center min-vh-100"
//       style={{
//         background: "linear-gradient(to bottom, #f4ebe2, #e6d3b3)",
//       }}
//     >
//       <ProductCard product={product} />
//     </div>
//   );
// };

// export default App;

// import React from "react";
// import Home from "./pages/Home";

// function App() {
//   return <Home />;
// }

// export default App;

// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sell from "./pages/Sell";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Marketplace from "./pages/MarketPlace";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </Router>
  );
}

export default App;
