// Navbar.js

import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faPerson, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCart } from "../redux/actions/cartAction";
import { logoutUser } from "../redux/actions/userActions";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropDown, setShowDropDown] = useState(false);
  const [showMenu, setShowMenu] = useState(false); 
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const handleCart = () => {
    dispatch(getAllCart(cartItems));
  };

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const closeDropDown = () => {
    setShowDropDown(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  // Function to toggle the menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="nav-container">
      <div className="logo">
        <Link to="/">
        <h1 >eggSquare</h1>
        </Link>
        
      </div>
      <div className={`nav-menus ${showMenu ? 'show-menu' : 'hide-menu'}`}>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/products">
            <li>Products</li>
          </Link>
          {/* <Link to="/">
            <li>Contact</li>
          </Link> */}
          <Link to="/order-history">
            <li>Order History</li>
          </Link>
        </ul>
      </div>
      <div className="self-icon">
        <Link className="cart-icon" to="/cart">
          <FontAwesomeIcon
            icon={faCartShopping}
            onClick={handleCart}
            className="shoping-icon"
          />
          {cartItems ? (
            <span className="cart-item-count">{cartItems.length}</span>
          ) : (
            <span className="cart-item-count">0</span>
          )}
        </Link>
        <div className="dropdown">
          {isAuthenticated ? (
            // If the user is authenticated, show the dropdown
            <>
              <div className="person-icon" onClick={toggleDropDown}>
                <FontAwesomeIcon icon={faPerson} />
              </div>
              {showDropDown && (
                <ul className="dropdown-menu">
                  <Link to="/order-history">
                    <li>Order History</li>
                  </Link>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              )}
            </>
          ) : (
            // If the user is not authenticated, redirect to the login page
            <Link to="/login">
              <FontAwesomeIcon icon={faPerson} />
            </Link>
          )}
        </div>
        {/* Show/hide menu based on screen width */}
        <div className={`menu-icon ${showMenu ? 'hide' : ''}`} onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
