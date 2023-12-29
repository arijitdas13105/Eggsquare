// Navbar.js

import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faPerson, faBars } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
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
  const user = useSelector((state) => state.user);

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

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="nav-container">
      <div className="logo">
        <NavLink to="/">
          <h1>eggSquare</h1>
        </NavLink>
      </div>
      <div className={`nav-menus ${showMenu ? 'show-menu' : 'hide-menu'}`}>
        <ul>
          <NavLink to="/" className="nav-text">
            <li>Home</li>
          </NavLink>
          <NavLink to="/products" className="nav-text">
            <li>Products</li>
          </NavLink>
          <NavLink to="/order-history" className="nav-text">
            <li>Order History</li>
          </NavLink>
        </ul>
      </div>
      <div className="self-icon">
        <NavLink className="cart-icon" to="/cart">
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
        </NavLink>
        <div className="dropdown">
          {isAuthenticated ? (
            <>
              <div className="person-icon" onClick={toggleDropDown}>
                <FontAwesomeIcon icon={faPerson} />
              </div>
              {showDropDown && (
                <ul className="dropdown-menu">
                  <NavLink to="/order-history">
                    <li>Order History</li>
                  </NavLink>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              )}
            </>
          ) : (
            <NavLink to="/login">
              <FontAwesomeIcon icon={faPerson} />
            </NavLink>
          )}
        </div>
        <div className={`menu-icon ${showMenu ? 'hide' : ''}`} onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
