// src/Footer.jsx
import React from "react";
import "./Footer.css"; // Import footer styles

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">
        Check out my{" "}
        <a
          href="https://github.com/DedSec2050/poke.git"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repo
        </a>
      </p>
    </footer>
  );
};

export default Footer;
