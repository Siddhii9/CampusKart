import React, { useEffect, useState } from "react";
import "./Banner.css";

import banner1 from "../assets/campuskartlogo.png";
import banner2 from "../assets/logo.png";
import banner3 from "../assets/image.png";

const bannerImages = [banner1, banner2, banner3];

const Banner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const slide = setInterval(() => {
      setIndex((prev) => (prev + 1) % bannerImages.length);
    }, 4000); // slide every 4 seconds
    return () => clearInterval(slide);
  }, []);

  return (
    <div className="banner-wrapper">
      {bannerImages.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`slide-${i}`}
          className={`banner-image ${i === index ? "active" : ""}`}
        />
      ))}
      <div className="banner-dots">
        {bannerImages.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
