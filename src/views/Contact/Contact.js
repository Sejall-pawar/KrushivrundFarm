import React, { useState } from 'react';
import './Contact.css';
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <Header/>
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Krushivrund Farm</h1>
        <p>We're here to connect, answer your questions, and share our passion for fresh, organic produce.</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-section">
            <h2>Get in Touch</h2>
            <div className="contact-details">
              <div className="detail-item">
                <span className="icon">📍</span>
                <p>Krushivrund Farm, Karanjgaone, Nashik</p>
              </div>
              <div className="detail-item">
                <span className="icon">📞</span>
                <p>+91 [Your Phone Number]</p>
              </div>
              <div className="detail-item">
                <span className="icon">📧</span>
                <p>info@krushivrundfarm.com</p>
              </div>
            </div>
          </div>

          <div className="business-hours">
            <h2>Business Hours</h2>
            <p>Monday to Saturday: 9:00 AM – 6:00 PM</p>
            <p>Sunday: Closed</p>
          </div>

          <div className="social-media">
            <h2>Follow Us</h2>
            <div className="social-links">
              <a href="#" className="social-icon">🌱 Instagram</a>
              <a href="#" className="social-icon">🌾 Facebook</a>
              <a href="#" className="social-icon">🍇 Twitter</a>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (Optional)"
              value={formData.phone}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Write Your Query or Feedback Here"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Contact;