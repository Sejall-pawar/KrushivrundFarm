import React, { useState } from "react";
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import './Offers.css';
import {Link} from 'react-router-dom'

const ProductCard = ({ image, title, price, onIncrement, onDecrement, quantity }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" />
        <div className="product-badge">New</div>
      </div>
      <div className="product-details">
        <h2 className="product-title">{title}</h2>
        <div className="product-price-section">
          <span className="product-price">₹{price * quantity}</span>
          <div className="quantity-control">
            <button 
              className="quantity-btn" 
              onClick={onDecrement}
              disabled={quantity <= 1}
            >
              <Minus size={18} />
            </button>
            <span className="quantity-value">{quantity}</span>
            <button 
              className="quantity-btn" 
              onClick={onIncrement}
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
        <button className="add-to-cart-btn">
          <ShoppingCart size={20} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const Offers = () => {
  const [quantities, setQuantities] = useState({
    grapes: 1,
    raisins: 1,
    raisinBars: 1
  });

  const products = [
    {
      id: 'grapes',
      image: require('../../Assets/Images/greps.jpg'),
      title: 'Fresh, Juicy Grapes',
      basePrice: 200
    },
    {
      id: 'raisins',
      image: require('../../Assets/Images/raisin.avif'),
      title: 'Natural Raisins',
      basePrice: 200
    },
    {
      id: 'raisinBars',
      image: require('../../Assets/Images/bar.avif'),
      title: 'Raisin Bars',
      basePrice: 200
    }
  ];

  const handleIncrement = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: prev[productId] + 1
    }));
  };

  const handleDecrement = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, prev[productId] - 1)
    }));
  };

  return (
    <div className="offerings-container">
      <h1 className="section-title">Our Special Offerings</h1>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.basePrice}
            quantity={quantities[product.id]}
            onIncrement={() => handleIncrement(product.id)}
            onDecrement={() => handleDecrement(product.id)}
          />
        ))}
      </div>
      <div className="view-all-container">
        <Link to='./products'>
        <button className="view-all-btn">
          View All Products
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Offers;