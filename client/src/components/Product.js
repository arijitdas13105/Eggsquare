import React from "react";
import { Link } from "react-router-dom";

import "./Product.css";

const Product = ({ title, imageSrc, id, price }) => {
  return (
    <div className="product">
      <div className="product-image-container">
        <img src={imageSrc} alt={title} className="product-image" />
      </div>

      <h3 className="product-title">{title}</h3>
      <h3>{price}</h3>
      <Link to={`/product/${id}`}>
        <button className="product-button">Buy Now</button>
      </Link>
    </div>
  );
};

export default Product;
