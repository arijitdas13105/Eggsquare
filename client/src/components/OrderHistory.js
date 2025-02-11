


//-----------------------
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, getUserOrder } from "../redux/actions/userActions";
import "./OrderHistory.css";
import Loading from "./Loading.js"; 
const OrderHistory = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.customer?._id);
  const orderHistory = useSelector((state) => state.user.orderHistory);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (userId) {
      dispatch(getUserOrder(userId));
    }
  }, [userId]);

  const handleCancelOrder=(orderId) =>{
    console.log("first",orderId)
    dispatch( cancelOrder(userId,orderId))
  }

  return (
    <div className="order-history-container">
      <h2 className="order-history-heading">Your Orders</h2>

      {orderHistory.map((order) => (
        <div key={order._id} className="order">
          <div className="order-items-container">
            <ul className="order-items-grid">
              {order.items.map((item) => (
                <li key={item.id} className="order-item">
                  <div className="item-image-container">
                    <img src={item.image} alt={item.title} className="item-image" />
                  </div>
                  <div className="item-details">
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-quantity">Quantity: {item.quantity}</p>
                    <p className="item-packet">Packet: {item.packet}</p>
                    <p className="item-total">Total: ₹{item.total}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-summary">
            <div className="order-values-holder">
              <span className="order-label">Total:</span>
              <span className="order-value">₹{order.orderTotal}</span>
            </div>
            <div className="order-values-holder">
              <span className="order-label">Pincode:</span>
              <span className="order-value">{order.addressName.pin}</span>
            </div>
            <div className="order-values-holder">
              <span className="order-label">Name:</span>
              <span className="order-value">{order.addressName.name}</span>
            </div>
            <div className="order-values-holder">
              <span className="order-label">Location Name:</span>
              <span className="order-value">{order.addressName.locationName}</span>
            </div>
            <div className="order-values-holder">
              <span className="order-label">House No:</span>
              <span className="order-value">{order.addressName.flatNo}</span>
            </div>
            <div className="order-values-holder">
              <span className="order-label">Order Status:</span>
              <span className="order-value">{order.orderStatus}</span>
            </div>
            {
              order.orderStatus!=="canceled" &&(
                 <button
              className="cancel-order-button"
              onClick={() => handleCancelOrder(order._id)}
            >
              Cancel Order
            </button>
              )
            }
           
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
