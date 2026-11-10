import React from "react";
import SliderImport from "react-slick";
import { Link } from "react-router-dom";

const Slider = SliderImport.default ?? SliderImport;

function Slides() {
    const settings = {
        className: "center",
        infinite: true,
        dots: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "ease-in-out",
        centerMode: true,
        centerPadding: "20%",
        focusOnSelect: true,
        arrows: false,
        pauseOnHover: true,
    };

    // Use the same IDs as your productsData
    const products = [
        {
            id: 9, // boAt Rockerz 255
            name: "boAt Rockerz 255",
            image: "/boat255r-1.png",
            price: "₹899",
            discount: "₹2,990",
        },
        {
            id: 13, // JBL Endurance Run Sports
            name: "JBL Endurance Run Sports",
            image: "/jbl-endu-1.png",
            price: "₹999",
            discount: "₹1,599",
        },
        {
            id: 14, // boAt Airdopes 203
            name: "boAt Airdopes 203",
            image: "/boat203-1.png",
            price: "₹1,074",
            discount: "₹3,999",
        },
        {
            id: 2, // boAt Rockerz 518
            name: "boAt Rockerz 518",
            image: "/boat518-1.png",
            price: "₹1,299",
            discount: "₹3,990",
        },
        {
            id: 8, // JBL Tune 760NC
            name: "JBL Tune 760NC",
            image: "/jbl760nc-1.png",
            price: "₹5,999",
            discount: "₹7,999",
        },
    ];

    return (
        <div className="featured-carousel">
            <h2>Featured Products</h2>

            <Slider {...settings}>
                {products.map((product) => (
                    <div key={product.id}>
                        <Link
                            to={`/product/${product.id}`}
                            className="slide-product-link"
                        >
                            <div className="product-card">
                                <h5>{product.name}</h5>

                                <img
                                    src={product.image}
                                    alt={product.name}
                                />

                                <h5>
                                    {product.price}

                                    <span>
                                        <del>
                                            {product.discount}
                                        </del>
                                    </span>
                                </h5>
                            </div>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Slides;