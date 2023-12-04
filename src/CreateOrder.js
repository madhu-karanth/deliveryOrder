import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { useLocation } from "react-router-dom";

function App() {
  const [DeliveryPersonID, setDeliveryPersonID] = useState("");
  const [PName, setPName] = useState("");
  const [PAddress, setPAddress] = useState("");
  const [ContactNumber, setContactNumber] = useState("");
  const [OrderStatus, setOrderStatus] = useState("");
  const [DeliveryDate, setDeliveryDate] = useState("");
  const [EstimatedDeliveryTime, setEstimatedDeliveryTime] = useState("");
  const location = useLocation();
  const userDetails = location.state;

  useEffect(() => {
    const fetchOrders = async () => {
      const { DeliveryPersonID } = userDetails;

      setDeliveryPersonID(DeliveryPersonID);
    };

    if (userDetails) {
      fetchOrders();
    }
  }, [userDetails]);

  const createDetails = async () => {
    try {
      const response = await axios.post("/api/person/create", {
        DeliveryPersonID,
        PName,
        PAddress,
        ContactNumber,
        OrderStatus,
        DeliveryDate,
        EstimatedDeliveryTime,
      });
      if (response.status === 200) {
        window.alert("Create success");
      } else {
        // Handle unsuccessful login
        console.log("Create failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div className="center-content">
        <div className="content-box">
          <h1 className="heading">Order Details</h1>
          <p>
            PName:{" "}
            <input
              type="text"
              placeholder="PName"
              value={PName}
              onChange={(e) => setPName(e.target.value)}
            ></input>{" "}
          </p>
          <p>
            PAddress:{" "}
            <input
              type="text"
              placeholder="PAddress"
              value={PAddress}
              onChange={(e) => setPAddress(e.target.value)}
            ></input>{" "}
          </p>
          <p>
            ContactNumber:{" "}
            <input
              type="tel"
              placeholder="Personal Id"
              value={ContactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            ></input>{" "}
          </p>
          <p>
            OrderStatus:{" "}
            <input
              type="text"
              placeholder="Personal Id"
              value={OrderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
            ></input>{" "}
          </p>
          <p>
            DeliveryDate:{" "}
            <input
              type="date"
              placeholder="Personal Id"
              value={DeliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            ></input>{" "}
          </p>
          <p>
            EstimatedDeliveryTime:{" "}
            <input
              type="datetime-local"
              placeholder="Personal Id"
              value={EstimatedDeliveryTime}
              onChange={(e) => setEstimatedDeliveryTime(e.target.value)}
            ></input>{" "}
          </p>

          <button onClick={createDetails}>Create Details</button>
        </div>
      </div>
    </div>
  );
}

export default App;
