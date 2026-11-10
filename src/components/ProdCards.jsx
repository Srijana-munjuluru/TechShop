import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/cartSlice.js";
import { Link } from "react-router-dom";

function ProdCards() {

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addedProductId, setAddedProductId] = useState(null);
  const dispatch = useDispatch()
  const productsData = useSelector(state => state.products.products)
  const topProductIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const topProducts = productsData.filter((product) =>
    topProductIds.includes(product.id)
  );

  const filteredProducts =
    selectedCategory === "All"
      ? topProducts
      : topProducts.filter(
        (product) => product.category === selectedCategory
      );

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));

    setAddedProductId(product.id);

    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  return (
    <div className="topProds">

      <h2>Top Products</h2>

      <div className="btns">
        <button className={selectedCategory === "All" ? "active" : ""} onClick={() => setSelectedCategory("All")}>All</button>
        <button className={selectedCategory === "Headphones" ? "active" : ""} onClick={() => setSelectedCategory("Headphones")}>Headphones</button>
        <button className={selectedCategory === "Earbuds" ? "active" : ""} onClick={() => setSelectedCategory("Earbuds")}>Earbuds</button>
        <button className={selectedCategory === "Earphones" ? "active" : ""} onClick={() => setSelectedCategory("Earphones")}>Earphones</button>
        <button className={selectedCategory === "Neckbands" ? "active" : ""} onClick={() => setSelectedCategory("Neckbands")}>Neckbands</button>
      </div>

      <div className="container">

        <div className="row">
          {
            filteredProducts.map((product) => (
              <div className="col-lg-3" key={product.id}>
                <div className="card">
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
                    className={`addtocart ${addedProductId === product.id ? "added" : ""
                      }`}
                    onClick={() => handleAddToCart(product)}
                  >
                    {addedProductId === product.id
                      ? "Added"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))
          }
          {selectedCategory === "All" && (
            <div className="col-lg-3 col-md-4 col-sm-6">
              <Link to="/products" className="browse-card-link">
                <div className="browse-card">
                  <span>Browse All</span>
                  <span>Products →</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default ProdCards;