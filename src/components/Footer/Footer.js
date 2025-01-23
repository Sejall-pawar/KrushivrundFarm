import React from 'react';
import { Link } from 'react-router-dom'; 
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">© 2025 My React App. All rights reserved.</p>
      <nav className="footer-nav">
        <Link to="/" className="footer-link">Home</Link>
        <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
        <Link to="/terms" className="footer-link">Terms of Service</Link>
      </nav>
    </footer>
  );
};

export default Footer;
