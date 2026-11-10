import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import '../App.css'
import { FaSearch, FaShoppingCart, FaUser, FaTimes } from 'react-icons/fa'


import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const dropdownMenu = [
        {
            id: 5,
            link: "Please Login",
            path: "/",
        },
    ];

    const [showUserPopup, setShowUserPopup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const cartItems = useSelector((state) => state.cart.items);

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Get all products from Redux
    const productsData = useSelector(
        (state) => state.products.products
    );

    // Filter products based on search text
    const searchResults = productsData.filter((product) =>
        product.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const handleCloseSearch = () => {
        setShowSearch(false);
        setSearchTerm("");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: 'black' }}>
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand" style={{ fontWeight: "bold" }}>Tech-Shop</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className='nav-item'>
                                 <button
                                    className="nav-icon-btn"
                                    onClick={() =>
                                        setShowSearch(!showSearch)
                                    }
                                >
                                    <FaSearch />
                                </button>
                            </li>
                            <li className="nav-item">
                                <Link to="/cart" className="nav-link active cart-icon"><FaShoppingCart />
                                    {
                                        cartCount > 0 && (<span className="cart-count">{cartCount}</span>)
                                    }
                                </Link>
                            </li>
                            <li className="nav-item user-menu">
                                <button className="user-icon-btn" onClick={() => setShowUserPopup(!showUserPopup)}>
                                    <FaUser />
                                </button>
                                {
                                    showUserPopup && (
                                        <div className="user-popup">
                                            <h5>Hello!</h5>
                                            <p> Access account, and manage orders</p>
                                            <button className="login-signup-btn" onClick={() => {
                                                setShowLogin(true);
                                                setShowUserPopup(false);
                                            }}>
                                                Login / Signup
                                            </button>
                                            <hr />

                                            {
                                                dropdownMenu.map((item) => (
                                                    <p className="private-login" key={item.id}>{item.link}</p>
                                                ))
                                            }
                                        </div>
                                    )}

                            </li>

                        </ul>
                    </div>

                </div>
            </nav>

            {
                showLogin && (
                    <div className="auth-overlay">
                        <div className="auth-modal">
                            <button className="close-btn" onClick={() => setShowLogin(false)}>×</button>
                            <Login openSignup={() => {
                                setShowLogin(false);
                                setShowSignup(true);
                            }} />
                        </div>

                    </div>
                )}

            {
                showSignup && (
                    <div className="auth-overlay">
                        <div className="auth-modal">
                            <button className="close-btn" onClick={() => setShowSignup(false)}> × </button>
                            <Signup openLogin={() => {
                                setShowSignup(false);
                                setShowLogin(true);
                            }} />
                        </div>
                    </div>
                )}

                {showSearch && (
                <div className="search-container">

                    <div className="search-box">

                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                            autoFocus
                        />

                        <button
                            className="close-search"
                            onClick={handleCloseSearch}
                        >
                            <FaTimes />
                        </button>

                    </div>


                    {/* Search Results */}
                    {searchTerm && (
                        <div className="search-results">

                            {searchResults.length > 0 ? (
                                searchResults.map((product) => (
                                    <Link
                                        to={`/product/${product.id}`}
                                        key={product.id}
                                        className="search-result-item"
                                        onClick={handleCloseSearch}
                                    >
                                        {product.title}
                                    </Link>
                                ))
                            ) : (
                                <p className="no-results">
                                    No products found
                                </p>
                            )}

                        </div>
                    )}

                </div>
            )}
        </>
    );
};

export default Navbar;