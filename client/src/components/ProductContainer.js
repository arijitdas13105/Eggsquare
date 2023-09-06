//ProductContainer.js
import React from "react";
import Product from "./Product";
import { files } from "./Files";
import "./ProductContainer.css";
const ProductContainer = () => {
  const products = [
    {
      id: 1,
      title: "white_egg",
      image: files.brown_egg,
      price: 20,
    },
    {
      id: 2,
      title: "brown_egg",
      image: files.brown_egg,
      price: 22,
    },
  ];
  return (
    <div className="product-container">
      {products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          title={product.title}
          imageSrc={product.image}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductContainer;

export const products = [
  {
    id: 1,
    title: "white egg",
    image: files.brown_egg,
    price: 20,
  },
  {
    id: 2,
    title: "brown egg",
    image: files.brown_egg,
    price: 22,
  },
];
