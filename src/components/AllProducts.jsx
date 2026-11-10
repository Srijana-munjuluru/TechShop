import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/cartSlice.js";
import { sortMenu, brandsMenu, categoryMenu } from "../data/filterBarData.js";
import Services from "./Services.jsx";
import { Link } from "react-router-dom";

function AllProducts() {
    const productsData = useSelector(
        (state) => state.products.products
    );

    const dispatch = useDispatch();

    // Selected filters
    const [selectedSort, setSelectedSort] = useState("");
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [addedProductId, setAddedProductId] = useState(null);

    // Add/remove brand filter
    const handleBrandChange = (brand) => {
        setSelectedBrands((previousBrands) =>
            previousBrands.includes(brand)
                ? previousBrands.filter((item) => item !== brand)
                : [...previousBrands, brand]
        );
    };

    // Add/remove category filter
    const handleCategoryChange = (category) => {
        setSelectedCategories((previousCategories) =>
            previousCategories.includes(category)
                ? previousCategories.filter((item) => item !== category)
                : [...previousCategories, category]
        );
    };

    // Filter products
    let filteredProducts = productsData.filter((product) => {

        const brandMatch =
            selectedBrands.length === 0 ||
            selectedBrands.includes(product.brand);

        const categoryMatch =
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.category);

        return brandMatch && categoryMatch;
    });

    // Helper function for prices
    const getPrice = (price) => {
        return Number(
            String(price).replace(/[₹,]/g, "")
        );
    };

    // Sort products
    if (selectedSort === "Price(Lowest First)") {
        filteredProducts = [...filteredProducts].sort(
            (a, b) =>
                getPrice(a.finalPrice) - getPrice(b.finalPrice)
        );
    }

    if (selectedSort === "Price(Highest First)") {
        filteredProducts = [...filteredProducts].sort(
            (a, b) =>
                getPrice(b.finalPrice) - getPrice(a.finalPrice)
        );
    }

    if (selectedSort === "Top Rated") {
        filteredProducts = [...filteredProducts].sort(
            (a, b) => b.rateCount - a.rateCount
        );
    }

    // Add product to cart
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));

        setAddedProductId(product.id);

        setTimeout(() => {
            setAddedProductId(null);
        }, 2000);
    };

    const handleClearFilters = () => {
        setSelectedSort("");
        setSelectedBrands([]);
        setSelectedCategories([]);
    };


    return (
        <>
        <div className="products-page">

            {/* Sidebar */}
            <aside className="filter-sidebar">

                <h3>Sort By</h3>
                <hr />

                <div className="sort-menu">
                    {sortMenu.map((item) => (
                        <button
                            key={item.id}
                            className={
                                selectedSort === item.title
                                    ? "selected-sort"
                                    : ""
                            }
                            onClick={() =>
                                setSelectedSort(item.title)
                            }
                        >
                            {item.title}
                        </button>
                    ))}
                </div>

                <h3 className="filter-heading">Filter By</h3>
                <hr />

                {/* Brand Filters */}
                <h4>Brands</h4>

                {brandsMenu.map((item) => (
                    <label
                        className="filter-option"
                        key={item.id}
                    >
                        <input
                            type="checkbox"
                            checked={selectedBrands.includes(
                                item.label
                            )}
                            onChange={() =>
                                handleBrandChange(item.label)
                            }
                        />

                        {item.label}
                    </label>
                ))}

                {/* Category Filters */}
                <h4 className="category-heading">
                    Category
                </h4>

                {categoryMenu.map((item) => (
                    <label
                        className="filter-option"
                        key={item.id}
                    >
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(
                                item.label
                            )}
                            onChange={() =>
                                handleCategoryChange(item.label)
                            }
                        />

                        {item.label}
                    </label>
                ))}
                

                {/* Clear All Filters Button */}
                <button
                    className="clear-filters"
                    onClick={handleClearFilters}
                >
                    Clear All Filters
                </button>

            </aside>



            {/* Products Area */}
            <main className="all-products">

                <h2>All Products</h2>

                <div className="products-grid">

                    {filteredProducts.map((product) => (
                        <div className="card product-page-card" key={product.id}>
    <Link
        to={`/product/${product.id}`}
        className="product-link"
    >
        <img
            src={product.images[0]}
            alt={product.title}
        />

        <p className="star">
            {"★".repeat(product.rateCount)}
        </p>

        <h3>{product.title}</h3>

        <p>{product.info}</p>
    </Link>

    <hr />

    <p>
        ₹{product.finalPrice}
        <del style={{ color: "gray" }}>
            ₹{product.originalPrice}
        </del>
    </p>

    <button
        className={`addtocart ${
            addedProductId === product.id ? "added" : ""
        }`}
        onClick={() => handleAddToCart(product)}
    >
        {addedProductId === product.id
            ? "Added"
            : "Add to Cart"}
    </button>
</div>
                    ))}

                </div>

            </main>
            
        </div>
        <Services />
        </>
    );
    
}

export default AllProducts;