import React from 'react'
import "./Aboutfarm.css"
import { Link } from 'react-router-dom'
import Mission from "../../Assets/Images/mission.png"
import Value from "../../Assets/Images/value.png"
import Offer from "../../Assets/Images/offer.png"
import Arrow from "../../Assets/Images/right-arrow.png"

function Aboutfarm() {
    return (
        <div>

            <h1 className='abouttagline'>About Krushivrund Farm</h1>

            <div className='about-container'>
                <div className='aboutbox'>
                    <img className='abt-img' src={Mission} />
                    <h1>Our Mission</h1>
                    <h3>
                        To nurture the land responsibly, grow quality crops, and provide our customers with farm-fresh products that promote health and well-being.
                    </h3>
                </div>
                <div className='aboutbox'>
                    <img className='abt-img' src={Value} />
                    <h1>Our Values</h1>
                    <h3>
                        We follow eco-friendly practices to protect the environment for future generations.
                    </h3>
                    <h3>From planting to harvest, we ensure that every product meets the highest standards.</h3>
                </div>
                <div className='aboutbox'>
                    <img className='abt-img' src={Offer} />
                    <h1>What We Offer</h1>
                    <h3>Fresh greps and raisin grown with care.</h3>
                    <h3>Hands-on knowledge about sustainable agriculture.</h3>
                </div>
            </div>
            <Link to="/about" className="abt-link">
                <button className="abt-btn">
                    Read More About Us <img src={Arrow} alt="arrow" />
                </button>
            </Link>
        </div>
    )
}

export default Aboutfarm