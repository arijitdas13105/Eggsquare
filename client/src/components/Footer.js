import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faPerson,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");

  // const serviceID=process.env.SERVICE_ID
  // const templateID=process.env.TEMPLATE_ID
  // const userID=process.env.USER_ID

  const serviceID = process.env.REACT_APP_SERVICE_ID;
  const templateID = process.env.REACT_APP_TEMPLATE_ID;
  const userID = process.env.REACT_APP_USER_ID;


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await emailjs.send(
        serviceID,
        templateID,
        {
          from_email: email,
          message: messages,
        },
        userID
      );

      console.log("email sent");
      setEmail("");
      setMessages("");

      // toast.success("Email sent successfully!", {
      //   style:{
      //     background: "black",
      //     color: "#fff",
      //     borderRadius: "4px",
      //     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      //   }
      // },{
      //   position: "top-center",

      //   autoClose: 1000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      // });

      toast("🦄 Email sent successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessages(e.target.value);
  };

  return (
    <>
      <div className="footer-container ">
        <ToastContainer />
        <div className="quick-link">
          <h3>Locate Us</h3>
          <span className="address">
            {" "}
            Madhav Rao Scindia Marg, City Center, Raksha Vihar, Lashkar,
            Gwalior, Madhya Pradesh 474011
          </span>
          {/* <ul>
            <Link to="/blogs">
              <li>Blogs</li>
            </Link>
            <Link to="/faqs">
              <li>FAQs</li>
            </Link>
            <Link to="/about">
              <li>About us </li>
            </Link>
          </ul> */}
        </div>
        {/* <div className="quick-link">
          <h3>Quick Links</h3>
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
        </div> */}

        <div className="contact-us">
          <h3>Contact </h3>
          <span className="contact-number">
            <FontAwesomeIcon icon={faPhone} />
            <span>+91 7501710048</span>
          </span>
          <span className="contact-email">
            <FontAwesomeIcon icon={faEnvelope} />
            <span>eggsquare@gmail.com</span>
          </span>
        </div>
        <div className="submit-message">
          <h3>Message Us</h3>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <textarea
            placeholder="Message"
            value={messages}
            onChange={handleMessageChange}
          />
          <button onClick={handleSubmit}>Send Message</button>
        </div>
      </div>
    </>
  );
};

export default Footer;
