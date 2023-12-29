import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import { files } from "./Files";
export const products = [
  {
    id: 1,
    title: "WHITE EGG",
    image: files.white_egg2,
    price: 6,
  },
  {
    id: 2,
    title: "BROWN EGG",
    image: files.brown_egg,
    price: 15,
  },
];

const Product = () => {
  
  return (
    <>
      <div className="productContains" 
      >
        {products.map((p) => (
          <>
            <div className="product">
              <div className="productt-container">
                <div className="product-image-container">
                  <img src={p.image} alt={p.title} className="product-image" />
                </div>
                <div className="product-detailsss">
                  <h3 className="product-title">{p.title}</h3>
                  <h3>Price: ₹{p.price}</h3>
                  <Link to={`/product/${p.id}`}>
                    <button className="product-button">Buy Now</button>
                  </Link>
                </div>
              </div>
            </div>{" "}
          </>
        ))}
      </div>
    </>
  );
};

export default Product;
