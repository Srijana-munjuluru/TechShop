import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";

import { increaseQuantity, decreaseQuantity, removeFromCart } from "../Redux/cartSlice";

function Cart() {

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const getPrice = (price) => {
        return Number(String(price).replace(/[₹,]/g, ""));
    };
    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity, 0);
    const totalOriginalPrice = cartItems.reduce(
        (total, item) => total + getPrice(item.originalPrice) * item.quantity, 0);
    const totalFinalPrice = cartItems.reduce(
        (total, item) => total + getPrice(item.finalPrice) * item.quantity, 0);
    const totalDiscount =
        totalOriginalPrice - totalFinalPrice;

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart">
                <FaShoppingCart className="empty-cart-icon" />
                <h2>Your Cart is Empty</h2>
                <Link to="/">
                    <button>Start Shopping</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-items">
                <h2>My Cart ({totalItems})</h2>
                {
                    cartItems.map((item) => (

                        <div className="cart-item" key={item.id}>
                            <img src={item.images[0]} alt={item.title} />
                            <div className="cart-product-info">
                                <h4>{item.title} {item.info}</h4>
                                <p className="cart-price">₹{getPrice(item.finalPrice).toLocaleString("en-IN")}<del>₹{getPrice(item.originalPrice).toLocaleString("en-IN")}</del></p>
                                <div className="quantity-control">
                                    <button onClick={() => dispatch(decreaseQuantity(item.id))}>
                                        <FaMinus />
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => dispatch(increaseQuantity(item.id))}>
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>

                            <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>
                                <FaTrash />
                            </button>
                        </div>
                    ))
                }
            </div>

            <div className="order-summary">
                <h3>Order Summary ({totalItems} items)</h3>
                <div className="summary-row">
                    <span>Original Price</span>
                    <span>₹{totalOriginalPrice.toLocaleString("en-IN")}</span>
                </div>

                <div className="summary-row discount">
                    <span>Discount</span>
                    <span> - ₹{totalDiscount.toLocaleString("en-IN")}</span>
                </div>

                <div className="summary-row delivery">
                    <span>Delivery</span>
                    <span>Free</span>
                </div>
                <hr />
                <div className="total-price">
                    <strong>Total Price</strong>
                    <strong>₹{totalFinalPrice.toLocaleString("en-IN")}</strong>
                </div>
                <button className="checkout-btn">Checkout</button>
            </div>
        </div>
    );
}

export default Cart;