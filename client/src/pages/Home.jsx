import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Recommendations from "../components/Recommendations";
const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Categories />
      <Recommendations />
      <Footer />
    </>
  );
};

export default Home;
