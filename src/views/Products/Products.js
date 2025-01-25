import React, { useState } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import './Products.css';
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"

// Product images (you'll need to replace these with actual image paths)
import BlackRaisins from '../../Assets/Images/img3.jpg';
import GoldenRaisins from '../../Assets/Images/img8.jpg';
import YellowRaisins from '../../Assets/Images/img7.jpg';
import BrownRaisins from '../../Assets/Images/brown.jpg';
import FlavoredRaisins from '../../Assets/Images/flavoured.avif';
import RaisinBars from '../../Assets/Images/bars.jpg';
import FreshGrapes from '../../Assets/Images/img1.jpg';

const ProductCard = ({ name, description, features, uses, image, price }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />
        <div className="product-badge">New</div>
      </div>
      <div className="product-details">
        <h2 className="product-name">{name}</h2>
        <p className="product-description">{description}</p>

        <div className="product-features">
          <h3>Features</h3>
          <ul>
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>


        <div className="product-purchase">
          <span className="product-price">₹{price}</span>
          <div className="quantity-control">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <button className="add-to-cart-btn">
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const products = [
    {
      name: "Black Raisins",
      description: "Rich in flavor and packed with nutrients, our black raisins are sun-dried and naturally sweet.",
      features: ["High in iron", "Rich in antioxidants", "Good source of fiber"],
      image: BlackRaisins,
      price: 250
    },
    {
      name: "Golden Raisins",
      description: "Golden raisins are known for their plump texture and sweet, tangy flavor.",
      features: ["Naturally sweet", "Rich in potassium", "Preservative-free"],
      image: GoldenRaisins,
      price: 270
    },
    {
      name: "Yellow Raisins",
      description: "Naturally dried to retain their bright color and delicate sweetness.",
      features: ["Loaded with vitamins", "Mineral-rich", "Bright color"],
      image: YellowRaisins,
      price: 240
    },
    {
      name: "Brown Raisins",
      description: "Traditional raisins known for their earthy flavor and versatility.",
      features: ["High in energy", "Naturally sweet", "Classic flavor"],
      image: BrownRaisins,
      price: 230
    },
    {
      name: "Flavored Raisins",
      description: "Experience raisins like never before with our range of flavored options.",
      features: ["Natural flavor infusions", "Unique taste", "Variety of flavors"],
      image: FlavoredRaisins,
      price: 290
    },
    {
      name: "Raisin Bars",
      description: "Wholesome and delicious snack combining the goodness of raisins.",
      features: ["Energy-packed", "Preservative-free", "Natural ingredients"],
      image: RaisinBars,
      price: 180
    },
  ];

  return (
    <div>
      <Header/>
      <div className="products-page">
        <div className="products-hero">
          <h1>Our Products</h1>
          <p>Premium Quality Grapes and Raisins from Krushivrund Farm</p>
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

        <div className="why-choose-section">
          <h2>Why Choose Krushivrund Farm?</h2>
          <div className="choose-reasons">
            <div className="reason">
              <Star className="reason-icon" />
              <h3>Farm Fresh</h3>
              <p>Straight from our farm to your home</p>
            </div>
            <div className="reason">
              <Star className="reason-icon" />
              <h3>100% Natural</h3>
              <p>Free from artificial additives</p>
            </div>
            <div className="reason">
              <Star className="reason-icon" />
              <h3>Sustainably Grown</h3>
              <p>Eco-friendly organic farming</p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Enjoy Farm-Fresh Goodness?</h2>
          <p>Browse, select, and get farm-fresh products delivered to your doorstep</p>
          <button className="start-shopping-btn">Start Shopping Now</button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Products;