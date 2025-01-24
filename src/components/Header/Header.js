import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, User, LogIn, Settings, LogOut } from 'lucide-react'
import Logo from "../../Assets/Images/foodmartlogo.png"
import "./Header.css"

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/products', label: 'Products' },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-container">
          <img 
            src={Logo} 
            alt="Krushivrund Farm Logo" 
            className="logo" 
          />
        </Link>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.to} 
              to={link.to} 
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <div className="user-account-container">
            <button 
              className="user-account-btn" 
              onClick={toggleAccountDropdown}
            >
              <User size={24} />
            </button>
            {isAccountDropdownOpen && (
              <div className="account-dropdown">
                <Link to="/login" className="dropdown-item">
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
                <Link to="/profile" className="dropdown-item">
                  <Settings size={18} />
                  <span>Profile</span>
                </Link>
                <button className="dropdown-item logout-btn">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
          <button 
            className="mobile-menu-toggle" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header