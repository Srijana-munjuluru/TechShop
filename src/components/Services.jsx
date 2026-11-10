import React from "react";
import {FaShippingFast, FaShieldAlt, FaTags, FaCreditCard} from 'react-icons/fa';

function Services() {
    
    
    const servicesData = [
        {
            id: 1,
            icon: <FaShippingFast />,
            title: "Express Delivery",
            info: "Ships in 24 Hours",
        },
        {
            id: 2,
            icon: <FaShieldAlt />,
            title: "Brand Warranty",
            info: "100% Original products",
        },
        {
            id: 3,
            icon: <FaTags />,
            title: "Exciting Deals",
            info: "On all prepaid orders",
        },
        {
            id: 4,
            icon: <FaCreditCard />,
            title: "Secure Payments",
            info: "SSL / Secure certificate",
        },
    ];
    
    return (
        <section className="services">
            <h2>Our Advantages</h2>

            <div className="services-container">
                {
                    servicesData.map((service) => (
                        <div className="service-card" key={service.id}>
                            <div className="service-icon">
                                {service.icon}
                            </div>

                            <div className="service-content">
                                <h4>{service.title}</h4>
                                <p>{service.info}</p>
                            </div>

                        </div>
                    ))
                }
            </div>
        </section>
    );
}

export default Services;