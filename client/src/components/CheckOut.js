

// ---------     3   -----------
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddress, placeOrder } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import "./CheckOut.css";
import { files } from "./Files";
import axios from "axios";
import BASE_URL from "../files/config";
import Loading from "./Loading.js"; 
import { loadStripe } from "@stripe/stripe-js";

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
console.log("cartItems",cartItems);
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


  const handlePayment = async()=>{
    const customerId = user.customer._id;
    // const stripe = await loadStripe(`${process.env.STRIPE_PUBLIC_KRY}`);
    // const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KRY);
    const stripe = await loadStripe("pk_test_51OOZUMSGnjCjqYGbt2zeJUsoEoGiHcSAclbN3oSjXjBz2UxPSN1odnnCxt9pY3WXDpHVBPL8kHQ2jtVjGKVkd3VJ00MLHK6M10");

    const body = {
      products:cartItems,
      customerId
    }
    const headers = {
        "Content-Type":"application/json"
    }
    const response = await fetch(`${BASE_URL}/api/payments/create-checkout-session`,{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
        sessionId:session.id
    });
    
    if(result.error){
        console.log(result.error);
    }
}


 const handlePaymentscv=()=>{
  axios.post(`${BASE_URL}/api/payments/create-checkout-session`,{

  }).then((res)=>{
    if(res.data.BASE_URL){
      window.location.href=res.data.BASE_URL
    }
  })
 }

  const cartTotal = cart.cartItems.reduce(
    (total, item) => total + item.total,
    0
  );

  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );
  
    const [message, setMessage] = useState("");
  
    useEffect(() => {
      // Check to see if this is a redirect back from Checkout
      const query = new URLSearchParams(window.location.search);
  
      if (query.get("success")) {
        setMessage("Order placed! You will receive an email confirmation.");
      }
  
      if (query.get("canceled")) {
        setMessage(
          "Order canceled -- continue to shop around and checkout when you're ready."
        );
      }
    }, []);


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

