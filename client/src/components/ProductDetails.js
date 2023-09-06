//productDetails
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { addCart, addToCart, getAllCart } from "../redux/actions/cartAction";
import { files } from "./Files";
import BenifitsSection from "./BenifitsSection";
import Footer from "./Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ products }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("Type of id:", typeof id);

  const productId = parseInt(id);
  console.log("Type of productId:", typeof productId);
  console.log("productId:", productId);
  const product = products.find((product) => product.id === productId);
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log("cartItems", cartItems);
  const [quantity, setQuantity] = useState(6);
  const [packet, setPacket] = useState(1);

  const handleQuantity = (value) => {
    if (value >= 1 && value <= 30) {
      setQuantity(value);
    }
  };

  const handlePacket = (value) => {
    if (value >= 1) {
      setPacket(value);
    }
  };

  const generateCartItemID = (productId, quantity) => {
    return `${productId}_${quantity}`;
  };

  const handleCart = () => {
    dispatch(addToCart(product, quantity, packet, cartItems));
    toast.success("Item added to cart", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="productDetails-container">
      <ToastContainer />
      <img src={files.eggBanner} className="eggBanner" />

      <div className="productDetails-holder">
        <div className="cart-image-price">
          <div className="productDetails-photo">
            <img src={product.image} alt="product-image" />
          </div>
          <span className="product-price">₹ {product.price} </span>
          <span className="product-total">
            total: {product.price * quantity * packet}{" "}
          </span>
        </div>

        <div className="cartDetails">
          <h1> {product.title} </h1>
          <span> {product.title} </span>
          <div className="product-qnty-option">
            <p
              onClick={() => handleQuantity(6)}
              className={quantity === 6 ? "selected" : ""}
            >
              6
            </p>
            <p
              onClick={() => handleQuantity(10)}
              className={quantity === 10 ? "selected" : ""}
            >
              10
            </p>
            <p
              onClick={() => handleQuantity(25)}
              className={quantity === 25 ? "selected" : ""}
            >
              25
            </p>
            <p
              onClick={() => handleQuantity(30)}
              className={quantity === 30 ? "selected" : ""}
            >
              30
            </p>
          </div>
          <div className="product-packet">
            <p onClick={() => handlePacket(packet - 1)}>-</p>
            <p>{packet}</p>
            <p onClick={() => handlePacket(packet + 1)}>+</p>
          </div>
          <div className="cartPincode">
            <input placeholder="enter pincode" />
            <button>check</button>
          </div>
          <div className="addCart">
            <button onClick={handleCart}>Add to cart</button>
          </div>
        </div>
      </div>
      <BenifitsSection />
      <Footer />
    </div>
  );
};

export default ProductDetails;
