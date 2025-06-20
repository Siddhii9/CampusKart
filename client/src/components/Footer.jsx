import React, { useState, useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h4>CampusKart</h4>
          <p>One campus endless deal ☕📚</p>
        </div>

        <div className="footer-contact">
          <h5>Contact Us</h5>
          <p>Email: support@campuskart.in</p>
          <p>Instagram: @campuskart</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} CampusKart. All rights reserved.
        </p>
      </div>

      {showTopBtn && (
        <button className="back-to-top" onClick={scrollToTop}>
          ↑ Top
        </button>
      )}
    </footer>
  );
};

export default Footer;
