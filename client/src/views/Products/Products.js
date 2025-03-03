import React, { useEffect, useState } from "react";
import { ShoppingCart, Star } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import "./Products.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {
  getCurrentUser,
  getJwtToken,
  getReadableTimestamp,
} from "../../utils/common";
import BlackRaisins from "../../Assets/Images/img3.jpg";
import GoldenRaisins from "../../Assets/Images/img8.jpg";
import YellowRaisins from "../../Assets/Images/img7.jpg";
import BrownRaisins from "../../Assets/Images/brown.jpg";
import FlavoredRaisins from "../../Assets/Images/flavoured.avif";
import RaisinBars from "../../Assets/Images/bars.jpg";
import FreshGrapes from "../../Assets/Images/img1.jpg";

const Products = () => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUser(user);
    } else {
      toast.error("Please login to access this page");
      setTimeout(() => {
        window.location.href = "/account";
      }, 2000);
    }
  }, []);

  useEffect(() => {
    if (user?._id) {
      loadUserOrders();
    }
  }, [user]);

  const loadUserOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/orders/user/${user._id}`,
        {
          headers: {
            Authorization: getJwtToken(),
          },
        }
      );
      setOrders(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const OrderViewDialog = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const {
      _id,
      products,
      totalBill,
      deliveryAddress,
      phone,
      paymentMode,
      status,
      createdAt,
    } = selectedOrder;
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={onClose}>Close</button>
          <h1>Order Details</h1>
          <p>Order ID: {_id}</p>
          <p>Ordered On: {getReadableTimestamp(createdAt)}</p>
          <p>Payment Mode: {paymentMode}</p>
          <p>Delivery Address: {deliveryAddress}</p>
          <p>Phone: {phone}</p>
          <p>Status: {status}</p>
          {products.map((product) => (
            <div className="order-item" key={product.productId._id}>
              <img src={product.productId.images[0]} alt={product.productId.name} className="order-img" />
              <div>
                <p>{product.productId.name}</p>
                <p>₹{product.price} x {product.quantity}</p>
              </div>
            </div>
          ))}
          <p className="total-bill">Bill Amount: ₹{totalBill}</p>
        </div>
      </div>
    );
  };

  const products = [
    { name: "Black Raisins", description: "Rich in flavor and packed with nutrients.", features: ["High in iron", "Rich in antioxidants", "Good source of fiber"], image: BlackRaisins, price: 250 },
    { name: "Golden Raisins", description: "Golden raisins are known for their plump texture.", features: ["Naturally sweet", "Rich in potassium", "Preservative-free"], image: GoldenRaisins, price: 270 },
    { name: "Yellow Raisins", description: "Naturally dried to retain their bright color.", features: ["Loaded with vitamins", "Mineral-rich", "Bright color"], image: YellowRaisins, price: 240 },
    { name: "Brown Raisins", description: "Traditional raisins known for their earthy flavor.", features: ["High in energy", "Naturally sweet", "Classic flavor"], image: BrownRaisins, price: 230 },
    { name: "Flavored Raisins", description: "Experience raisins like never before.", features: ["Natural flavor infusions", "Unique taste", "Variety of flavors"], image: FlavoredRaisins, price: 290 },
    { name: "Raisin Bars", description: "Wholesome and delicious snack.", features: ["Energy-packed", "Preservative-free", "Natural ingredients"], image: RaisinBars, price: 180 },
  ];

  return (
    <div>
      <Header />
      <div className="products-page">
        <h1>Our Products</h1>
        <p>Premium Quality Grapes and Raisins from Krushivrund Farm</p>
        <div className="products-grid">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p className="product-price">₹{product.price}</p>
              <button className="add-to-cart-btn">
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          ))}
        </div>
        <h2>My Orders</h2>
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card" onClick={() => { setSelectedOrder(order); setIsDialogOpen(true); }}>
              <p>Order ID: {order._id}</p>
              <p>Ordered On: {getReadableTimestamp(order.createdAt)}</p>
              <p>Total: ₹{order.totalBill}</p>
            </div>
          ))}
        </div>
        <OrderViewDialog isOpen={isDialogOpen} onClose={() => { setIsDialogOpen(false); setSelectedOrder({}); }} />
      </div>
      <Footer />
    </div>
  );
};

export default Products;
