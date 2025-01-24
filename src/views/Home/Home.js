import React from 'react'
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import Slider from "../../components/Slider/Slider"
import Aboutfarm from "../../components/Aboutfarm/Aboutfarm"
import "./Home.css"

function Home() {
  return (
    <div>
      <Header />

      <div className='Info-container'>
        <div className='infobox'>
          <h1>Welcome to Krushivrund Farm</h1>
          <h3>At Krushivrund Farm, we are committed to bringing you the freshest, highest-quality produce straight from our fields to your table. Located in the heart of nature, our farm thrives on sustainable farming practices, ensuring that every product we offer is not only nutritious but also grown with care for the environment. Whether you're looking for organic vegetables, farm-fresh fruits, or quality farming equipment, we provide a wide range of products to meet your needs. Join us in supporting local agriculture and enjoying the true taste of nature.
          </h3>
        </div>
        <div className='infoimg'>
          <Slider />
        </div>
      </div>

      <Aboutfarm />

      <Footer />
    </div>
  )
}

export default Home