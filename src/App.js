import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";

function App() {
  const location = useLocation();
  const userDetails = location.state;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders related to the delivery person from the API
    // Replace `/api/orders/:DeliveryPersonID` with the actual endpoint
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `/api/orders/${userDetails.DeliveryPersonID}`
        );
        if (response.status === 200 && response.data) {
          const { orders } = response.data;
          setOrders(orders);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (userDetails) {
      fetchOrders();
    }
  }, [userDetails]);

  if (!userDetails) {
    return <div className="App">Loading...</div>;
  }

  const deleteOrderDetails = async (orderId) => {
    try {
      const response = await axios.delete(`/api/orders/${orderId}`);
      if (response.status === 200) {
        const restorder = orders.filter((ord) => ord.OrderID !== orderId);
        console.log("deleted");
        setOrders(restorder);
        window.alert(`${orderId} Deleted`)
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const {
    DeliveryPersonID,
    FirstName,
    LastName,
    ContactNumber,
    Email,
    VehicleID,
  } = userDetails;

  return (
    <div className="App">
      <div className="center-content">
        <div className="content-box">
          <h1 className="heading">Delivery Details</h1>
          <p>Delivery personnel ID: {DeliveryPersonID}</p>
          <p>First Name: {FirstName}</p>
          <p>Last Name: {LastName}</p>
          <p>Contact Number: {ContactNumber}</p>
          <p>Email: {Email}</p>
          <p>Vehicle ID: {VehicleID}</p>

          <h2 className="heading">Order Details</h2>
          {orders.length === 0 ? (
            <p>No orders found for this delivery person.</p>
          ) : (
            <ul>
              {orders.map((order) => (
                <li key={order.OrderID}>
                  <p>Order ID: {order.OrderID}</p>
                  <p>Order Status: {order.OrderStatus}</p>
                  <p>Delivery Date: {order.DeliveryDate}</p>
                  <p>Pickup Person Name: {order.PName}</p>
                  <p>Pickup Address: {order.PAddress}</p>
                  <p>Pickup Contact: {order.ContactNumber}</p>
                  <button onClick={() => deleteOrderDetails(order.OrderID)}>
                    Delete
                  </button>
                  {/* Add more order details as needed */}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
