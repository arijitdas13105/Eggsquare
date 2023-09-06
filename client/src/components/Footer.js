import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faPerson,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = () => {
    console.log("Email:", email);
    console.log("Message:", message);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <div className="footer-container ">
        <div className="quick-link">
          <h3>quick links</h3>
          <ul>
            <Link to="/blogs">
              <li>Blogs</li>
            </Link>
            <Link to="/faqs">
              <li>FAQs</li>
            </Link>
            <Link to="/about">
              <li>About us </li>
            </Link>
          </ul>
        </div>

        <div className="contact-us">
          <h3>contact us</h3>
          <span className="contact-number">
            <FontAwesomeIcon icon={faPhone} />
            <span>8910742930</span>
          </span>
          <span className="contact-email">
            <FontAwesomeIcon icon={faEnvelope} />
            <span>arijitdas1310@gmail.com</span>
          </span>
        </div>
        <div className="submit-message">
        <h3>contact us</h3>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={handleMessageChange}
          />
          <button onClick={handleSubmit}>Send Message</button>
        </div>
      </div>
    </>
  );
};

export default Footer;
