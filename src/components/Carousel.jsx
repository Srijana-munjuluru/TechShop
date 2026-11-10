
import React from "react";
import SliderImport from "react-slick";
import "../App.css"
import { Link } from "react-router-dom";

const Slider = SliderImport.default ?? SliderImport;

function Carousel() {

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <div className="hero">
            <h2 className='bgname'>Over Ear</h2>
            <div className="row align-items-center" >
              <div className="col-lg-8">
                <h3>JBL Live 660NC</h3>
                <h1>Keep The Noise</h1>
                <h1>Out, Or in. You</h1>
                <h1>Choose</h1>
                <p>₹9,999 <span> <del> ₹14,999</del></span></p>
                <Link to="/product/1" className="shop-now-link">
                  <button className="btn1">Shop Now</button>
                </Link>
              </div>

              <div className="col-lg-4">
                <Link to="/product/1">
                  <img src="jbl660nc-1.png" alt="JBL Live 660NC" className="image" />
                </Link>
              </div>

            </div>
          </div>
        </div>

        <div>
          <div className="hero">
            <h2 className='bgname'>In Ear</h2>
            <div className="row align-items-center" >
              <div className="col-lg-8">
                <h3>boAt Airdopes 131</h3>
                <h1>Featherweight For</h1>
                <h1>Comfort All-Day.</h1>
                <p>₹1,099 <span> <del> ₹2,999</del></span></p>
                <Link to="/product/3" className="shop-now-link">
                  <button className="btn1">Shop Now</button>
                </Link>
              </div>

              <div className="col-lg-4">
                <Link to="/product/3">
                  <img src="boat131-3.png" alt="boAt Airdopes 131" className="image" />
                </Link>
              </div>

            </div>
          </div>
        </div>

        <div>
          <div className="hero">
            <h2 className='bgname'>Over Ear</h2>
            <div className="row align-items-center" >
              <div className="col-lg-8">
                <h3>Sony WH-XB910N</h3>
                <h1>Give Your Favourite</h1>
                <h1>Music A Boost.</h1>
                <p>₹13,489 <span> <del> ₹19,990</del></span></p>
                <Link to="/product/7" className="shop-now-link">
                  <button className="btn1">Shop Now</button>
                </Link>
              </div>

              <div className="col-lg-4">
                <Link to="/product/7">
                  <img src="sonyXb910n-1.png" alt="Sony WH-XB910N" className="image" />
                </Link>
              </div>
              
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;
