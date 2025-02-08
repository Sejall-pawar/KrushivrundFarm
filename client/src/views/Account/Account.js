import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiEdit, FiShoppingCart, FiHeart, FiBox, FiCreditCard, FiBell, FiLogOut } from 'react-icons/fi';
import './Account.css';
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"


const Account = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <Header/>
            <div className="account-container">
                <div className="sidebar">
                    <div className="profile-info">
                        <FaUserCircle className="profile-icon" />
                        <h2>Sejal Pawar</h2>
                        <p>sejalpawar463@gmail.com</p>
                    </div>
                    <nav className="anav-links">
                        <a
                            href="#"
                            className={`anav-link ${activeTab === 'profile' ? 'active' : ''}`}
                            onClick={() => handleTabClick('profile')}
                        >
                            <FiEdit className="icon" />
                            Profile
                        </a>
                        <a
                            href="#"
                            className={`anav-link ${activeTab === 'orders' ? 'active' : ''}`}
                            onClick={() => handleTabClick('orders')}
                        >
                            <FiShoppingCart className="icon" />
                            Orders
                        </a>
                        <a
                            href="#"
                            className={`anav-link ${activeTab === 'wishlist' ? 'active' : ''}`}
                            onClick={() => handleTabClick('wishlist')}
                        >
                            <FiHeart className="icon" />
                            Wishlist
                        </a>
                        <a
                            href="#"
                            className={`anav-link ${activeTab === 'current-orders' ? 'active' : ''}`}
                            onClick={() => handleTabClick('current-orders')}
                        >
                            <FiBox className="icon" />
                            Current Orders
                        </a>
                        <a
                            href="#"
                            className={`anav-link ${activeTab === 'payment' ? 'active' : ''}`}
                            onClick={() => handleTabClick('payment')}
                        >
                            <FiCreditCard className="icon" />
                            Payment
                        </a>
                        <a
                            href="#"
                            className={`anav-link ${activeTab === 'notifications' ? 'active' : ''}`}
                            onClick={() => handleTabClick('notifications')}
                        >
                            <FiBell className="icon" />
                            Notifications
                        </a>
                        <a href="#" className="anav-link logout">
                            <FiLogOut className="icon" />
                            Logout
                        </a>
                    </nav>
                </div>

                <div className="content">
                    {activeTab === 'profile' && (
                        <div className="profile-tab">
                            <h1>Profile</h1>
                            <div className="profile-details">
                                <div className="detail-row">
                                    <label>Name:</label>
                                    <span>Sejal Pawar</span>
                                </div>
                                <div className="detail-row">
                                    <label>Email:</label>
                                    <span>sejalpawar463@gmail.com</span>
                                </div>
                                <div className="detail-row">
                                    <label>Phone:</label>
                                    <span>+91 1234567890</span>
                                </div>
                                <div className="detail-row">
                                    <label>Address:</label>
                                    <span>123 Main Street, Nashik</span>
                                </div>
                                <button className="edit-btn">
                                    <FiEdit className="icon" />
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    )}
                    {activeTab === 'orders' && (
                        <div className="orders-tab">
                            <h1>Orders</h1>
                        </div>
                    )}
                    {activeTab === 'wishlist' && (
                        <div className="wishlist-tab">
                            <h1>Wishlist</h1>
                        </div>
                    )}
                    {activeTab === 'current-orders' && (
                        <div className="current-orders-tab">
                            <h1>Current Orders</h1>
                        </div>
                    )}
                    {activeTab === 'payment' && (
                        <div className="payment-tab">
                            <h1>Payment</h1>
                        </div>
                    )}
                    {activeTab === 'notifications' && (
                        <div className="notifications-tab">
                            <h1>Notifications</h1>
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Account;