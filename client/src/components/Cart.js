// Cart.js

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllCart,
  addToCart,
  increasePacket,
  decreasePacket,
  addToCustomerCart,
  addCart,REMOVE_FROM_CART
} from "../redux/actions/cartAction";
import { addAddress, getUserAddress, } from "../redux/actions/userActions";
import {removeFromCart } from "../redux/actions/cartAction";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCartShopping, faPerson, faTrash } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const userAddresses = useSelector((state) => state.user.addresses);

  const [checkout, setCheckout] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();

  // Get cartItems from Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log("user is ", user);
  useEffect(() => {
    dispatch(getAllCart());
    checkUserLoginStatus();
  }, [dispatch]);

  const checkUserLoginStatus = () => {
    const authToken = localStorage.getItem("token");
    setIsLoggedin(!!authToken);

    if (isLoggedin && user.customer) {
      dispatch(getUserAddress(user.customer._id));
    }
  };

  const updateLocalStorageCartItems = (cartItems) => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  const handleIncreasePacket = (itemId) => {
    dispatch(increasePacket(itemId));
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId
        ? {
            ...item,
            packet: item.packet + 1,
            total: item.price * item.quantity * (item.packet + 1),
          }
        : item
    );
    updateLocalStorageCartItems(updatedCartItems);
  };

  // const handleDecreasePacket = (itemId) => {
  //   dispatch(decreasePacket(itemId));
  //   const updatedCartItems = cartItems.map((item) =>
  //     item.id === itemId
  //       ? {
  //           ...item,
  //           packet: item.packet - 1,
  //           total: item.price * item.quantity * (item.packet - 1),
  //         }
  //       : item
  //   );
  //   updateLocalStorageCartItems(updatedCartItems);
  // };

  const handleDecreasePacket = (itemId) => {
    const itemToUpdate = cartItems.find((item) => item.id === itemId);
  
    // Check if the item's packet count is greater than 0 before decreasing it
    if (itemToUpdate && itemToUpdate.packet > 1) {
      dispatch(decreasePacket(itemId));
  
      // Update the local storage as well
      const updatedCartItems = cartItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              packet: item.packet - 1,
              total: item.price * item.quantity * (item.packet - 1),
            }
          : item
      );
      updateLocalStorageCartItems(updatedCartItems);
    }
  };
  

  const total = cartItems.reduce((accumulator, item) => {
    return accumulator + item.total;
  }, 0);

  const handleCheckOut = () => {
    if (isLoggedin) {
      setCheckout(true);

      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  const handleAddAddress = () => {
    navigate("/add-address");
  };
  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    updateLocalStorageCartItems(updatedCartItems);
    toast('🗑️ Item removed from Cart!', {
      position: "top-right",
      autoClose:1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  return (
    <div className="cart-container">
      <ToastContainer />
      <div className="cart-holder">
        <ul className="cart-item-list">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div className="cart-item-details">
                <div className="cart-items-abc">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-quantity">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="cart-item-packet">
                  <button onClick={() => handleDecreasePacket(item.id)}>
                    -
                  </button>
                  <span>{item.packet}</span>
                  <button onClick={() => handleIncreasePacket(item.id)}>
                    +
                  </button>
           
            <FontAwesomeIcon style={{color:"red"}} icon={faTrash} onClick={() => handleRemoveItem(item.id)} />
            

                  {/* <button onClick={() => handleRemoveItem(item.id)}>🗑️</button> Delete button */}
                  {/* <button onClick={() => handleRemoveItem(item.id)}>🗑️</button> Delete button */}
                </div>
                <div className="cart-item-total-holder">
                  <p className="cart-item-total">Total: ₹{item.total}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="cart-summary-holder">
        <div className="cart-summary">
          <span className="cart-total">Total: ₹{total}</span>
          <button className="checkout-button" onClick={handleCheckOut}>
            Check Out
          </button>
          <button className="checkout-button" onClick={handleAddAddress}>
            add address
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
