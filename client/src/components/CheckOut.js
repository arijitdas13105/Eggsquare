// //checkout.js

// import React, { useState, useEffect, useReducer } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addAddress,
//   getUserAddress,
//   loginFail,
//   addToCustomerCarts,
//   createRazorpayOrder,
//   placeOrder,
//   getAddress,
// } from "../redux/actions/userActions";
// import { useNavigate } from "react-router-dom";
// import "./CheckOut.css";
// import { addToCart, addToCustomerCart } from "../redux/actions/cartAction";
// import axios from "axios";
// import BASE_URL from "../files/config";
// import { files } from "./Files";

// const Checkout = () => {
//   // Get user data from Redux store
//   const [selectedAddress, setSelectedAddress] = useState("");
//   const [orderId, setOrderId] = useState("");
//   const [orderStatus, setOrderStatus] = useState("processing");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const user = useSelector((state) => state.user);
//   const cart = useSelector((state) => state.cart);
//   const cartItems = useSelector((state) => state.cart.cartItems);

//   const userAddresses = useSelector((state) => state.user.addresses);
//   console.log(userAddresses);
//   const authToken = user.token;

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (user.customer && user.customer._id) {
//       dispatch(getAddress(user.customer._id));
//     }
//   }, [dispatch, user.customer]);
//   // }, [dispatch, user.customer._id]);

//   const handleAddressChange = (e) => {
//     setSelectedAddress(e.target.value);
//   };

//   const handlePayment = async () => {
//     try {
//       const customerId = user.customer._id;

//       const orderResponse = await axios.post(
//         `${BASE_URL}/api/payments/orders`,
//         { total: cartTotal }
//       );
//       const orderData = orderResponse.data.data;

//       const options = {
//         key: process.env.KEY_SECRET,
//         amount: orderData.amount,
//         currency: orderData.currency,
//         name: "Egg Square",
//         description: "Payment for Your Order",
//         order_id: orderData.id,
//         handler: async (response) => {
//           try {
//             const verifyResponse = await axios.post(
//               `${BASE_URL}/api/payments/verify`,
//               response
//             );
//             const verificationData = verifyResponse.data;
//             if (verificationData.message === "Payment verified successfully") {
//               //cartItemData need to get "title,price,...total" nor cartItems providing "id" also which i dont need
//               const cartItemData = cartItems.map((item) => ({
//                 title: item.title,
//                 price: item.price,
//                 image: item.image,
//                 quantity: item.quantity,
//                 packet: item.packet,
//                 total: item.total,
//               }));

//               const cartTotal = cartItems.reduce(
//                 (total, item) => total + item.total,
//                 0
//               );
//               const sendOrderData = {
//                 cartItems: cartItemData,
//                 orderTotal: cartTotal,
//                 address: selectedAddress,
//                 status: orderStatus,
//               };

//               dispatch(placeOrder(user.customer._id, sendOrderData));

//               navigate("/order-history");
//             } else {
//               navigate("/checkout/fail");
//             }
//           } catch (error) {
//             console.error("Error verifying payment:", error);
//           }
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (error) {}
//   };

//   const cartTotal = cart.cartItems.reduce(
//     (total, item) => total + item.total,
//     0
//   );

//   const handleAddAddress = () => {
//     navigate("/add-address");
//   };

//   return (
//     <div className="checkout-Holder">
//       <img src={files.eggBanner} />
//       <div className="checkout-container-abc">
//         <div className="checkout-container">
//           <h2>Select an Address</h2>
//           <div className="addressOption">
//             {user.customer.address.length > 0 ? (
//               <select className="address-select" onChange={handleAddressChange}>
//                 <option value="" disabled selected>
//                   Select an Address
//                 </option>
//                 {userAddresses.map((address, index) => (
//                   <option
//                     key={address._id}
//                     value={address._id}
//                     addressName={address.name}
//                   >
//                     {address.name}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               <p>No addresses found bsdk.</p>
//             )}
//             <span>or</span>
//             <button className="checkout-button" onClick={handleAddAddress}>
//               add address
//             </button>
//           </div>

//           <button
//             className="confirm-button"
//             onClick={handlePayment}
//             onChange={(e) => {
//               setSelectedAddress(e.target.value);
//               console.log("selected address is ==>", selectedAddress);
//             }}
//           >
//             Confirm Checkout
//           </button>
//         </div>
//         <div className="total-cart">
//           <span className="total-label">Total:</span>{" "}
//           <span className="total-amount">₹{cartTotal}</span>
//         </div>
//         <div className="checkout-cartItem">
//           {cartItems.map((item) => (
//             <li key={item.id} className="cart-item">
//               <img src={item.image} alt={item.title} />
//               <div className="cart-item-details">
//                 <div className="cart-items-abc">
//                   <h3 className="cart-item-title">{item.title}</h3>
//                   <p className="cart-item-quantity">
//                     Quantity: {item.quantity}
//                   </p>
//                 </div>

//                 <div>
//                   <p className="cart-item-total">Total: ₹{item.total}</p>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;





// --------------------
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddress, placeOrder } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import "./CheckOut.css";
import { files } from "./Files";
import axios from "axios";
import BASE_URL from "../files/config";
import Loading from "./Loading.js"; 
const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState(""); // Initialize selectedAddress state
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const userAddresses = useSelector((state) => state.user.addresses);
  const cart = useSelector((state) => state.cart);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [orderStatus, setOrderStatus] = useState("processing");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.customer && user.customer._id) {
      dispatch(getAddress(user.customer._id));
    }
  }, [dispatch, user.customer]);

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value); // Update selectedAddress when user selects an address
  };
  const handleAddAddress = () => {
    navigate("/add-address");
  };
  
  const handlePayment = async () => {
    try {
      setIsLoading(true); 
      const customerId = user.customer._id;

      const orderResponse = await axios.post(
        `${BASE_URL}/api/payments/orders`,
        { total: cartTotal }
      );
      const orderData = orderResponse.data.data;

      const options = {
        key: process.env.KEY_SECRET,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Egg Square",
        description: "Payment for Your Order",
        order_id: orderData.id,
        handler: async (response) => {
          try {
            setIsLoading(false)
            const verifyResponse = await axios.post(
              `${BASE_URL}/api/payments/verify`,
              response
            );
            const verificationData = verifyResponse.data;
            if (verificationData.message === "Payment verified successfully") {
              //cartItemData need to get "title,price,...total" nor cartItems providing "id" also which i dont need
              const cartItemData = cartItems.map((item) => ({
                title: item.title,
                price: item.price,
                image: item.image,
                quantity: item.quantity,
                packet: item.packet,
                total: item.total,
              }));

              const cartTotal = cartItems.reduce(
                (total, item) => total + item.total,
                0
              );
              const sendOrderData = {
                cartItems: cartItemData,
                orderTotal: cartTotal,
                address: selectedAddress,
                status: orderStatus,
              };

              dispatch(placeOrder(user.customer._id, sendOrderData));

              navigate("/order-history");
            } else {
              navigate("/checkout/fail");
            }
          } catch (error) {
            setIsLoading(false); 
            console.error("Error verifying payment:", error);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {}
  };

  const cartTotal = cart.cartItems.reduce(
    (total, item) => total + item.total,
    0
  );

  return (
    <>{
      isLoading?(<Loading/>):(
        <div className="checkout-Holder">
      <img src={files.eggBanner} alt="Egg Banner" />
      <div className="checkout-container-abc">
        <div className="checkout-container">
          <h2>Select an Address</h2>
          <div className="addressOption">
            {userAddresses.length > 0 ? (
              <select
                className="address-select"
                onChange={handleAddressChange}
                value={selectedAddress} // Set the selected address in the dropdown
              >
                <option value="" disabled>
                  Select an Address
                </option>
                {userAddresses.map((address) => (
                  <option key={address._id} value={address._id}>
                    {address.name}
                  </option>
                ))}
              </select>
            ) : (
              <p>No addresses found.</p>
            )}
            <span>or</span>
            <button className="checkout-button" onClick={handleAddAddress}>
              add address
            </button>
          </div>

          <button className="confirm-button" onClick={handlePayment}>
            Confirm Checkout
          </button>
        </div>
        <div className="total-cart">
          <span className="total-label">Total:</span>{" "}
          <span className="total-amount">₹{cartTotal}</span>
        </div>
        <div className="checkout-cartItem">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div className="cart-item-details">
                <div className="cart-items-abc">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-quantity">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div>
                  <p className="cart-item-total">Total: ₹{item.total}</p>
                </div>
              </div>
            </li>
          ))}
        </div>
      </div>
    </div>
      )
    }
    
    </>
    
  );
};

export default Checkout;

