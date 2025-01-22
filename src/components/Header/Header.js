import React from 'react'
import {Link} from 'react-router-dom'
import Logo from "../../Assets/Images/foodmartlogo.png"

function Header() {
  return (
    <header className="header">
      <h1 className="title"><img src={Logo}/></h1>
      <nav className="nav">
        <Link to="/" className="link">Home</Link>
        <Link to="/about" className="link">About</Link>
        <Link to="/contact" className="link">Contact</Link>
      </nav>
    </header>
  )
}

export default Header