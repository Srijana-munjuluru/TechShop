import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../Redux/cartSlice.js";
import reviewsData from "../data/reviewsData.js";

function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const productsData = useSelector(
        (state) => state.products.products
    );

    const product = productsData.find(
        (item) => item.id === Number(id)
    );

    const [selectedImage, setSelectedImage] = useState("");
    const [added, setAdded] = useState(false);
    const [activeTab, setActiveTab] = useState("Specifications");

    // This function adds "/" before image names.
    // It allows us to access images directly from the public folder.
    const getImagePath = (image) => {
        if (!image) return "";

        // If the path already starts with "/", don't add another one
        if (image.startsWith("/")) {
            return image;
        }

        return `/${image}`;
    };

    // Set the first product image when the product changes
   useEffect(() => {
    if (product && product.images && product.images.length > 0) {
        // Set the first product image
        setSelectedImage(`/${product.images[0]}`);

        // Reset page states
        setAdded(false);
        setActiveTab("Specifications");

        // Scroll to the top of the page
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}, [product]);

    // Show this if the product is not found
    if (!product) {
        return (
            <div className="product-not-found">
                <h2>Product not found</h2>

                <Link to="/products">
                    Back to Products
                </Link>
            </div>
        );
    }

    // Convert price into a number
    const getPrice = (price) => {
        return Number(
            String(price).replace(/[₹,]/g, "")
        );
    };

    const originalPrice = getPrice(product.originalPrice);
    const finalPrice = getPrice(product.finalPrice);
    const savedAmount = originalPrice - finalPrice;

    // Add product to cart
    const handleAddToCart = () => {
        dispatch(addToCart(product));

        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 2000);
    };

    // Get related products from the same category
    const relatedProducts = productsData
        .filter(
            (item) =>
                item.category === product.category &&
                item.id !== product.id
        )
        .slice(0, 4);

    return (
        <div className="product-details-page">

            {/* Main Product Section */}
            <section className="product-details-container">

                {/* Product Images */}
                <div className="product-images-section">

                    {/* Thumbnail Images */}
                    <div className="thumbnail-images">
                        {product.images?.map((image, index) => (
                            <button
                                key={index}
                                type="button"
                                className={
                                    selectedImage === image
                                        ? "active-thumbnail"
                                        : ""
                                }
                                onClick={() =>
                                    setSelectedImage(image)
                                }
                            >
                                <img
                                    src={getImagePath(image)}
                                    alt={`${product.title} ${index + 1}`}
                                />
                            </button>
                        ))}
                    </div>

                    {/* Main Product Image */}
                    <div className="main-product-image">
                        {selectedImage && (
                            <img
                                src={getImagePath(selectedImage)}
                                alt={product.title}
                            />
                        )}
                    </div>

                </div>


                {/* Product Information */}
                <div className="product-information">

                    <h2>{product.title}</h2>

                    <p className="product-info">
                        {product.info}
                    </p>

                    <div className="details-rating">
                        <span className="stars">
                            {"★".repeat(product.rateCount)}
                        </span>

                        <span className="rating-text">
                            {product.rateCount}/5 Rating
                        </span>
                    </div>

                    <hr />

                    {/* Price and Stock */}
                    <div className="price-stock-row">

                        <div>
                            <div className="details-price">
                                ₹{finalPrice.toLocaleString("en-IN")}

                                <del>
                                    ₹{originalPrice.toLocaleString("en-IN")}
                                </del>
                            </div>

                            <p className="tax-info">
                                You save ₹
                                {savedAmount.toLocaleString("en-IN")}
                                <br />
                                (Inclusive of all taxes)
                            </p>
                        </div>

                        <span className="stock-status">
                            ✓ In Stock
                        </span>

                    </div>

                    <hr />

                    {/* Offers */}
                    <h4>Offers and Discounts</h4>

                    <div className="offers">
                        <div>
                            No Cost EMI on Credit Card
                        </div>

                        <div>
                            Pay Later & Avail Cashback
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <button
                        className={`details-add-cart ${
                            added ? "added" : ""
                        }`}
                        onClick={handleAddToCart}
                    >
                        {added ? "Added" : "Add to Cart"}
                    </button>

                </div>

            </section>


            {/* Specifications / Overview / Reviews */}
            <section className="specifications-section">

                {/* Tabs */}
                <div className="specification-tabs">

                    <button
                        className={
                            activeTab === "Specifications"
                                ? "active-tab"
                                : ""
                        }
                        onClick={() =>
                            setActiveTab("Specifications")
                        }
                    >
                        Specifications
                    </button>

                    <button
                        className={
                            activeTab === "Overview"
                                ? "active-tab"
                                : ""
                        }
                        onClick={() =>
                            setActiveTab("Overview")
                        }
                    >
                        Overview
                    </button>

                    <button
                        className={
                            activeTab === "Reviews"
                                ? "active-tab"
                                : ""
                        }
                        onClick={() =>
                            setActiveTab("Reviews")
                        }
                    >
                        Reviews
                    </button>

                </div>


                {/* Specifications Content */}
                {activeTab === "Specifications" && (
                    <div className="specifications-list">

                        <div>
                            <span>Brand</span>
                            <strong>{product.brand}</strong>
                        </div>

                        <div>
                            <span>Model</span>
                            <strong>{product.title}</strong>
                        </div>

                        <div>
                            <span>Generic Name</span>
                            <strong>{product.category}</strong>
                        </div>

                        <div>
                            <span>Connectivity</span>
                            <strong>
                                {product.connectivity}
                            </strong>
                        </div>

                    </div>
                )}


                {/* Overview Content */}
                {activeTab === "Overview" && (
                    <div className="overview-content">

                        <h3>{product.title}</h3>

                        <p>{product.info}</p>

                        <p>
                            Explore the features and product
                            details of {product.title}.
                        </p>

                    </div>
                )}


                {/* Reviews Content */}
                {activeTab === "Reviews" && (
                    <div className="reviews-container">

                        <h3>Customer Reviews</h3>

                        {reviewsData.map((review) => (
                            <div
                                className="review-card"
                                key={review.id}
                            >
                                <div className="review-header">

                                    <h4>
                                        {review.name}
                                    </h4>

                                    <span>
                                        {review.date}
                                    </span>

                                </div>

                                <p className="review-stars">
                                    {"★".repeat(
                                        review.rateCount
                                    )}
                                </p>

                                <p>
                                    {review.review}
                                </p>

                            </div>
                        ))}

                    </div>
                )}

            </section>


            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="related-products">

                    <h2>Related Products</h2>

                    <div className="related-products-grid">

                        {relatedProducts.map((item) => (
                            <div
                                className="related-card"
                                key={item.id}
                            >
                                <Link
                                    to={`/product/${item.id}`}
                                    className="product-link"
                                >
                                    <img
                                        src={getImagePath(
                                            item.images?.[0]
                                        )}
                                        alt={item.title}
                                    />

                                    <p className="star">
                                        {"★".repeat(
                                            item.rateCount
                                        )}
                                    </p>

                                    <h4>{item.title}</h4>

                                    <p>{item.info}</p>
                                </Link>

                                <hr />

                                <p className="related-price">
                                    ₹{getPrice(
                                        item.finalPrice
                                    ).toLocaleString("en-IN")}

                                    <del>
                                        ₹{getPrice(
                                            item.originalPrice
                                        ).toLocaleString("en-IN")}
                                    </del>
                                </p>

                                <button
                                    className="related-add-cart"
                                    onClick={() =>
                                        dispatch(addToCart(item))
                                    }
                                >
                                    Add to Cart
                                </button>

                            </div>
                        ))}

                    </div>

                </section>
            )}

        </div>
    );
}

export default ProductDetails;