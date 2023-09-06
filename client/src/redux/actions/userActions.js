//userAction

import React, { useState, useEffect, useReducer } from "react";

import { useNavigate, useNavigation } from "react-router-dom";
import BASE_URL from "../../files/config";
import { useDispatch, useSelector } from "react-redux";

import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  GET_ADDRESS,
  ADD_ADDRESS,
  ADD_TO_CUSTOMER_CART,
  CREATE_RAZORPAY_ORDER_SUCCESS,
  CREATE_RAZORPAY_ORDER_FAILURE,
  CREATE_RAZORPAY_ORDER_REQUEST,
  GET_USER_ORDER_HISTORY_SUCCESS,
  LOGOUT_USER,
} from "../constants/allContants";
import axios from "axios";
export const loginSuccess = (token, customer) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { token, customer },
  };
};

export const loginFail = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

export const LoginAction = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/customer/login`, {
      email,
      password,
    });

    const { tokens, customer } = response.data;
    dispatch(loginSuccess(tokens, customer));

    localStorage.setItem("token", tokens);
  } catch (error) {
    dispatch(loginFail("login failed:", error));
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("cartItems");
  return {
    type: LOGOUT_USER,
  };
};

export const addAddress = (userId, addressData) => async (dispatch) => {
  try {
    const authToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: authToken,
      },
    };

    const response = await axios.post(
      `${BASE_URL}/api/customer/${userId}/addAddress`,
      addressData,
      config
    );
    if (response.status === 200) {
      const newAddress = response.data;

      dispatch({
        type: ADD_ADDRESS,
        payload: newAddress,
      });
    } else {
      console.error("Error adding new address:", response.data.error);
    }
  } catch (error) {
    console.error("Error adding new address:", error);
  }
};

export const getUserAddress = (userId) => async (dispatch) => {
  try {
    const authToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: authToken,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/api/customer/${userId}/alladdress`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );

    if (response.status === 200) {
      const userAddress = response.data;
      dispatch({
        type: GET_ADDRESS,
        payload: userAddress,
      });
    }
  } catch (error) {
    console.error("Error fetching user addresses:", error);
  }
};

export const addToCustomerCarts =(userId, cartItemData) => async (dispatch) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/customer/${userId}/addCartItem`,
        cartItemData
      );
      dispatch({
        type: ADD_TO_CUSTOMER_CART,
        payload: cartItemData, // assuming cartItemData contains the updated cart items
      });
    } catch (error) {
      console.error("Error adding cart items to customer database:", error);
    }
  };

export const createRazorpayOrder =(userId, cartItemData) => async (dispatch) => {
    try {
      const cartTotal = cartItemData.reduce(
        (total, item) => total + item.total,
        0
      );
      const authToken = localStorage.getItem("token");
      const orderResponse = await axios.post(
        `${BASE_URL}/api/customer/${userId}/createOrder`,
        { cartItems: cartItemData },
        {
          headers: {
            Authorization: authToken, 
          },
        }
      );
      const order_id = orderResponse.data.order_id;
      const options = {
        key: "rzp_test_AudIy7hoBdJbPk",
        amount: cartTotal * 100,
        currency: "INR",
        name: "Your Store",
        description: "Test Transaction",
        order_id: order_id,
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post(
              `${BASE_URL}/api/customer/${userId}/verify`,
              response
            );

            dispatch(addToCustomerCarts(userId, cartItemData));
          } catch (error) {
            console.log("Error verifying payment:", error);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
    }
  };

export const createRazorpayOrderSuccess = (order) => {
  return {
    type: CREATE_RAZORPAY_ORDER_SUCCESS,
    payload: order,
  };
};

export const createRazorpayOrderFailure = (error) => {
  return {
    type: CREATE_RAZORPAY_ORDER_FAILURE,
    payload: error,
  };
};

export const createRazorpayOrderRequest = () => ({
  type: CREATE_RAZORPAY_ORDER_REQUEST,
});

export const handleOrder = (userId, cartItemData) => async (dispatch) => {
  try {
    const cart = useSelector((state) => state.cart);
    const orderResponse = await axios.post(
      `${BASE_URL}/api/customer/${userId}/create-razorpay-order`,
      { cartItems: cartItemData }
    );
    const order_id = orderResponse.data.data.id;
    const cartTotal = cart.cartItems.reduce(
      (total, item) => total + item.total,
      0
    );

    const options = {
      key: "rzp_test_AudIy7hoBdJbPk",
      amount: cartTotal * 100,
      currency: "INR",
      name: "Your Store",
      description: "Test Transaction",
      order_id: order_id,
      handler: async (response) => {
        try {
          const verifyResponse = await axios.post(
            `${BASE_URL}/api/customer/${userId}/verify`,
            response
          );

          dispatch(addToCustomerCarts(userId, cartItemData));
        } catch (error) {
          console.log("Error verifying payment:", error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.log("Error handling checkout:", error);
  }
};

export const placeOrder = (userId, orderData) => async (dispatch) => {
  try {
    const authToken = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: authToken,
      },
    };
    const response = await axios.post(
      `${BASE_URL}/api/customer/${userId}/placeOrder`,
      orderData,
      config
    );
  } catch (error) {
    console.error("Error placing order:", error);
  }
};

export const getAddress = (userId) => async (dispatch) => {
  try {
    const authToken = localStorage.getItem("token");
    const config = {
      headers: {
        // Authorization: `Bearer ${authToken}`,
        Authorization: authToken,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/api/customer/${userId}/alladdress`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );

    if (response.status === 200) {
      const userAddress = response.data;
      dispatch({
        type: GET_ADDRESS,
        payload: userAddress,
      });
    }
  } catch (error) {
    console.error("Error fetching user addresses:", error);
  }
};

export const getUserOrder = (userId) => async (dispatch) => {
  try {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
    }
    const config = {
      headers: {
        Authorization: authToken,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/api/customer/${userId}/orders`,
      config
    );
    if (response.status == 200) {
      const orderHistory = response.data;
      dispatch(getOrderHistorySuccess(orderHistory));
    }
  } catch (error) {
    console.error("Error fetching user order history:", error);
  }
};
export const getOrderHistorySuccess = (orderHistory) => {
  return {
    type: GET_USER_ORDER_HISTORY_SUCCESS,
    payload: orderHistory,
  };
};
