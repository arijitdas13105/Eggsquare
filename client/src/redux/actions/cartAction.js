//cartAction
import React, { useState, useEffect, useReducer } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  CART_ADD,
  ALL_CART,
  PACKET_INCREASE,
  PACKET_DECREASE,
  CREATE_RAZORPAY_ORDER_SUCCESS,
  CREATE_RAZORPAY_ORDER_FAILURE,
} from "../constants/allContants";
import { placeOrder } from "./userActions";

const generateCartItemID = (productId, quantity) => {
  return `${productId}_${quantity}`;
};

export const addCart = (cartItem) => {
  return {
    type: CART_ADD,
    payload: cartItem,
  };
};

export const getAllCart = () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  return {
    type: ALL_CART,
    payload: cartItems,
  };
};

export const addToCart = (product, quantity, packet) => {
  const cartItemId = generateCartItemID(product.id, quantity);

  return (dispatch, getState) => {
    const { cart } = getState();
    const existingCartItem = cart.cartItems.find(
      (item) => item.id === cartItemId
    );

    if (existingCartItem) {
      const updatedCartItems = cart.cartItems.map((item) =>
        item.id === cartItemId
          ? {
              ...item,
              packet: item.packet + packet,
              total: item.price * item.quantity * (item.packet + packet),
            }
          : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      dispatch(getAllCart());
    } else {
      const total = product.price * quantity * packet;
      const cartItem = { ...product, quantity, packet, total, id: cartItemId };
      const updatedCartItems = [...cart.cartItems, cartItem];
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      dispatch(getAllCart());
    }
  };
};

export const increasePacket = (itemId) => {
  return {
    type: PACKET_INCREASE,
    payload: itemId,
  };
};

export const decreasePacket = (itemId) => {
  return {
    type: PACKET_DECREASE,
    payload: itemId,
  };
};

export const addToCustomerCart = (userId, cartItemData) => async (dispatch) => {
  try {
    const authToken = localStorage.getItem("token");

    const response = await axios.post(
      `http://localhost:5000/api/customer/${userId}/addCartItem`,
      cartItemData,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
  } catch (error) {
    console.error("Error adding cart items to customer database:", error);
  }
};
