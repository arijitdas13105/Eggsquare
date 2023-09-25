// Register.js

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Register() {
  const dispatch = useDispatch();
  //   const registrationError = useSelector((state) => state.registrationError);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  

  //   const handleChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };
  const isEmailValid = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   if (!isEmailValid(email)) {
      // Email is not in a valid format, display a warning
      toast("Please use a correct email format", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

  if (password !== confirmPassword) {
    // Passwords don't match, display an error message
    toast('Passwords do not match ', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        // setTimeout(() => {
        //   navigate("/cart");
        // }, 3000);
    return;
  }


dispatch(registerUser(email, password));
toast('🦄Registration successfull ', {
position: "top-right",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});
setTimeout(() => {
  navigate("/login");
}, 3000);


  };

  return (
   

    <div className="login-holedr">
      <h1>Create Your Account</h1>

      <div className="login-form">
        <ToastContainer/>
        <form onSubmit={handleSubmit}>
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
            <label className="labels">Password</label>
            <input
              className="loginInput"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login-form-group">
          <label className="labels">Confirm Password</label>
          <input
            className="loginInput"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
             </div>
          <button type="submit">Register</button>
        </form>
        <span
          onClick={() => {
            navigate("/login");
          }}
        >
          Already have an account? Sign in
        </span>
      </div>
    </div>
  );
}

export default Register;
