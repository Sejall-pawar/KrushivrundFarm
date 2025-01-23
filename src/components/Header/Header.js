import React from 'react'
import {Link} from 'react-router-dom'
import Logo from "../../Assets/Images/foodmartlogo.png"
import "./Header.css"

function Header() {
  return (
    <header className="header">
      <h1 className="title"><img className='logo' src={Logo}/></h1>
      <nav className="nav">
        <Link to="/" className="link">Home</Link>
        <Link to="/about" className="link">About</Link>
        <Link to="/products" className="link">Products</Link>
        <Link to="/contact" className="link">Contact</Link>
      </nav>
    </header>
  )
}

export default Header