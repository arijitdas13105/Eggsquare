//Login.js
import React, { useState } from "react";
import axios from "axios";
import {LoginAction} from '../redux/actions/userActions'
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { addToCustomerCart } from "../redux/actions/cartAction";

const Login = () => {
  const navigate=useNavigate()
    const dispatch=useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.user);
  const cart=useSelector((state)=>state.cart)
  const cartItems = useSelector((state) => state.cart.cartItems);

  
  const handleLogin =  async() => {
    try {
      const cartItemData = cartItems.map((item) => ({
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        packet: item.packet,
        total: item.total,
      }));

      dispatch(LoginAction(email,password))
     dispatch(addToCustomerCart(user.customer._id, cartItemData));
    navigate('/checkout')
    } catch (error) {
      
    }
    
    };

  return (
    <div>
        <h1>login</h1>
        <h1>login</h1>
        <h1>login</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;



