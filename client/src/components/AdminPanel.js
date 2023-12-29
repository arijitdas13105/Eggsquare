
//Admin Panel

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/admin/login', { username, password });
      setOrders(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error authenticating admin:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (customerId, orderId) => {
    try {
      // Make an HTTP request to update the order status on the server
      await axios.put(`/api/admin/${customerId}/orders/${orderId}/update`);
      
      // After updating on the server, you can refresh the data from the server
      // Here, you can fetch updated data or re-fetch the entire list of orders.
      // This ensures that the client always displays the latest data.
      const updatedOrdersResponse = await axios.get('/api/admin/orders');
      setOrders(updatedOrdersResponse.data);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      {!isLoggedIn ? (
        <div>
          <h3>Login</h3>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button onClick={handleLogin}>Login</button>
          {isLoading && <p>Loading...</p>}
        </div>
      ) : (
        <div>
          <button onClick={() => setIsLoggedIn(false)}>Logout</button>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Customer Email</th>
                  <th>Orders</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((customer) => (
                  <tr key={customer._id}>
                    <td>{customer.email}</td>
                    <td>
                      {customer.orders.map((order) => (
                        <div key={order._id}>
                          <p>Order ID: {order._id}</p>
                          <p>Status: {order.orderStatus}</p>
                        </div>
                      ))}
                    </td>
                    <td>
                      {customer.orders.map((order) => (
                        <div key={order._id}>
                          {order.orderStatus === 'processing' && (
                            <button className="complete-button" onClick={() => handleUpdateOrderStatus(customer._id, order._id)}>
                              Mark as Complete
                            </button>
                          )}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;



