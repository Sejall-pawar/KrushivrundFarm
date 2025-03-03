import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiEdit, FiShoppingCart, FiHeart, FiBox, FiCreditCard, FiBell, FiLogOut } from 'react-icons/fi';
import './Account.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from 'axios'; // Make sure to install axios: npm install axios

// API base URL
const API_BASE_URL = 'http://localhost:5002';

const Account = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: '',
        address: ''
    });
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [errors, setErrors] = useState({});

    // Check if user is logged in on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserData(token);
        }
    }, []);

    // Reset form data
    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
            address: ''
        });
        setErrors({});
    };

    // Fetch user data using the stored token
    const fetchUserData = async (token) => {
        try {
            // You'll need to implement this endpoint in your backend
            const response = await axios.get(`${API_BASE_URL}/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.data) {
                setUserData(response.data);
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            // If token is invalid, clear it
            localStorage.removeItem('token');
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const toggleAuthMode = () => {
        setAuthMode(authMode === 'login' ? 'signup' : 'login');
        setErrors({});
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (authMode === 'signup') {
            if (!formData.name.trim()) newErrors.name = 'Name is required';
            if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
            if (!formData.address.trim()) newErrors.address = 'Address is required';
            if (formData.password !== formData.rePassword) {
                newErrors.rePassword = 'Passwords do not match';
            }
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setIsLoading(true);
        
        try {
            if (authMode === 'signup') {
                // Call signup API with full URL
                const signupData = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    rePassword: formData.rePassword,
                    phone: formData.phone,
                    address: formData.address
                };
                
                const response = await axios.post(`${API_BASE_URL}/signup`, signupData);
                
                if (response.data && response.data.token) {
                    // Store the signup data temporarily
                    const tempUserData = {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        address: formData.address
                    };
                    
                    // Clear the form and switch to login mode
                    resetForm();
                    setAuthMode('login');
                    
                    // Show success message
                    alert('Signup successful! Please login with your credentials.');
                }
            } else {
                // Call login API with full URL
                const loginData = {
                    email: formData.email,
                    password: formData.password
                };
                
                const response = await axios.post(`${API_BASE_URL}/login`, loginData);
                
                if (response.data && response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    // Fetch user data after successful login
                    await fetchUserData(response.data.token);
                    // Reset form after successful login
                    resetForm();
                }
            }
        } catch (error) {
            console.error('Authentication error:', error);
            
            // Handle API errors
            if (error.response) {
                if (error.response.status === 401) {
                    setErrors({ auth: 'Invalid email or password' });
                } else if (error.response.data && error.response.data.message) {
                    setErrors({ auth: error.response.data.message });
                } else if (error.response.data && error.response.data.code === 11000) {
                    // Handle MongoDB duplicate key error
                    if (error.response.data.keyPattern && error.response.data.keyPattern.phone) {
                        setErrors({ phone: 'This phone number is already registered with an account' });
                    } else if (error.response.data.keyPattern && error.response.data.keyPattern.email) {
                        setErrors({ email: 'This email is already registered with an account' });
                    } else {
                        setErrors({ auth: 'A user with this information already exists' });
                    }
                } else {
                    setErrors({ auth: 'Authentication failed. Please try again.' });
                }
            } else {
                setErrors({ auth: 'Network error. Please check your connection.' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            
            // Optional: Call logout API to invalidate token on server
            await axios.post(`${API_BASE_URL}/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear token and reset state
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            setActiveTab('profile');
            resetForm();
        }
    };

    // Render authentication forms when not logged in
    if (!isLoggedIn) {
        return (
            <div>
                <Header />
                <div className="auth-container">
                    <div className="auth-form-container">
                        <h1>{authMode === 'login' ? 'Login' : 'Sign Up'}</h1>
                        
                        {errors.auth && <div className="auth-error">{errors.auth}</div>}
                        
                        <form onSubmit={handleSubmit} className="auth-form">
                            {authMode === 'signup' && (
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full name"
                                    />
                                    {errors.name && <div className="form-error">{errors.name}</div>}
                                </div>
                            )}
                            
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                />
                                {errors.email && <div className="form-error">{errors.email}</div>}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="password-input-container">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter your password"
                                    />
                                    <button 
                                        type="button" 
                                        className="toggle-password" 
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.password && <div className="form-error">{errors.password}</div>}
                            </div>
                            
                            {authMode === 'signup' && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="rePassword">Confirm Password</label>
                                        <input
                                            type="password"
                                            id="rePassword"
                                            name="rePassword"
                                            value={formData.rePassword}
                                            onChange={handleInputChange}
                                            placeholder="Confirm your password"
                                        />
                                        {errors.rePassword && (
                                            <div className="form-error">{errors.rePassword}</div>
                                        )}
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Enter your phone number"
                                        />
                                        {errors.phone && <div className="form-error">{errors.phone}</div>}
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <textarea
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="Enter your address"
                                            rows="3"
                                        ></textarea>
                                        {errors.address && <div className="form-error">{errors.address}</div>}
                                    </div>
                                </>
                            )}
                            
                            <button 
                                type="submit" 
                                className="auth-button"
                                disabled={isLoading}
                            >
                                {isLoading 
                                    ? 'Processing...' 
                                    : (authMode === 'login' ? 'Login' : 'Sign Up')}
                            </button>
                        </form>
                        
                        <div className="auth-toggle">
                            {authMode === 'login' ? (
                                <p>Don't have an account? <button onClick={toggleAuthMode}>Sign Up</button></p>
                            ) : (
                                <p>Already have an account? <button onClick={toggleAuthMode}>Login</button></p>
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Original account page when logged in
    return (
        <div>
            <Header/>
            <div className="account-container">
                <div className="sidebar">
                    <div className="profile-info">
                        <FaUserCircle className="profile-icon" />
                        <h2>{userData.name}</h2>
                        <p>{userData.email}</p>
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
                        <a href="#" className="anav-link logout" onClick={handleLogout}>
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
                                    <span>{userData.name}</span>
                                </div>
                                <div className="detail-row">
                                    <label>Email:</label>
                                    <span>{userData.email}</span>
                                </div>
                                <div className="detail-row">
                                    <label>Phone:</label>
                                    <span>{userData.phone}</span>
                                </div>
                                <div className="detail-row">
                                    <label>Address:</label>
                                    <span>{userData.address}</span>
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