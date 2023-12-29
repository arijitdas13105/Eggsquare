//Login.js
import React, { useState } from "react";
import axios from "axios";
import { LoginAction } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addToCustomerCart } from "../redux/actions/cartAction";
// import "./AddressForm.css";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleLogin = async (e) => {
    
    try {
      e.preventDefault();
      const cartItemData = cartItems.map((item) => ({
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        packet: item.packet,
        total: item.total,
      }));

      dispatch(LoginAction(email, password));
      if(user.isAuthenticated){
          toast.success('login successfull ', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      dispatch(addToCustomerCart(user.customer._id, cartItemData));
      navigate("/products");
     
      }else{
        toast.error('login failed', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    
    } catch (error) {
      console.log("first",error)
    }
  };

  return (
    <div className="login-holedr">
      <h1>Sign in</h1>
      
      <div className="login-form">
        <form onSubmit={handleLogin}>
          <div className="login-form-group">
            <label className="labels">Email</label>
            <input
            className="loginInput"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-form-group">
          <label  className="labels">Password</label>
             <input
              className="loginInput"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Login</button>
        </form>
        <span onClick={()=>{
        navigate('/register')
        }}>
        New to EggSquare ? Create an account
        </span>
      </div>
      
    </div>
  );
};

export default Login;






//-------------//