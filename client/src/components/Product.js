import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = ({ title, imageSrc, id, price }) => {
  return (
    <div className="product">
      <div className="product-image-container">
        <img src={imageSrc} alt={title} className="product-image" />
      </div>
      <div className="product-detailsss">
        <h3 className="product-title">{title}</h3>
        <h3>Price: ₹{price}</h3>
        <Link to={`/product/${id}`}>
          <button className="product-button">Buy Now</button>
        </Link>
      </div>
    </div>
  );
};

export default Product;
