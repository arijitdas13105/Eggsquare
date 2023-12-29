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
  GET_USER_ORDER_HISTORY_SUCCESS,
  LOGOUT_USER,
  CANCEL_ORDER_FAILURE,
  CANCEL_ORDER_SUCCESS
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
    console.log("tokens",tokens)
    console.log("customer",customer)
    dispatch(loginSuccess(tokens, customer));

    localStorage.setItem("token", tokens);
    // const localSet=localStorage.setItem("token", tokens);
  } catch (error) {
    console.error('LoginAction error:', error);

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


// export const registerUser = (userData) => async (dispatch) => {
export const registerUser = (email,password) => async (dispatch) => {
  try {
   const response = await axios.post(`${BASE_URL}/api/customer/register`, {email,password});

    dispatch({
      type: "REGISTER_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "REGISTER_FAIL",
      // payload: response.data.error,
      payload: error.response.data.error,
    });
  }
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

export const addToCustomerCarts =
  (userId, cartItemData) => async (dispatch) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/customer/${userId}/addCartItem`,
        cartItemData
      );
      dispatch({
        type: ADD_TO_CUSTOMER_CART,
        payload: cartItemData,
      });
    } catch (error) {
      console.error("Error adding cart items to customer database:", error);
    }
  };

//for storing in order history
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
    console.log("response at userAction-166",response);
  } catch (error) {
    console.error("Error placing order:", error);
  }
};

export const getAddress = (userId) => async (dispatch) => {
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
          Authorization: authToken, // Include the token in the request headers
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


export const cancelOrder=(userId,orderId)=>async(dispatch)=>{
  try {
    const authToken = localStorage.getItem("token");
    const config={
      headers:{
        Authorization:authToken
      }
    }
    const response= await axios.put(`${BASE_URL}/api/customer/${userId}/orders/${orderId}/cancel`,{},config)
    const cancelOrderItem=response.data.order
    if (response.status===200){
     
      
      dispatch({
        type:CANCEL_ORDER_SUCCESS,
        payload:cancelOrderItem
      })
    }else{
      console.error("Error canceling order:", response.data.error);
      dispatch({
        type:CANCEL_ORDER_FAILURE,
        payload:cancelOrderItem
      })
    }
  } catch (error) {
    console.error("Error canceling order:",error )
   
  }
}