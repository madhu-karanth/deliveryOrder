import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";

function App() {
  const location = useLocation();
  const userDetails = location.state;
  const [DeliveryPersonID, setDeliveryPersonID] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [ContactNumber, setContactNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [VehicleID, setVehicleID] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const {
        FirstName,
        LastName,
        ContactNumber,
        Email,
        VehicleID,
        DeliveryPersonID,
      } = userDetails;

      setDeliveryPersonID(DeliveryPersonID);
      setFirstName(FirstName);
      setLastName(LastName);
      setContactNumber(ContactNumber);
      setEmail(Email);
      setVehicleID(VehicleID);
    };

    if (userDetails) {
      fetchOrders();
    }
  }, [userDetails]);

  if (!userDetails) {
    return <div className="App">Loading...</div>;
  }

  const updateDetails = async () => {
    try {
      const response = await axios.post("/api/person/update", {
        DeliveryPersonID,
        FirstName,
        LastName,
        ContactNumber,
        Email,
        VehicleID,
      });
      if (response.status === 200) {
        window.alert("Update success");
      } else {
        // Handle unsuccessful login
        console.log("Update failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div className="center-content">
        <div className="content-box">
          <h1 className="heading">Delivery Details</h1>
          <p>
            Delivery personnel ID:{" "}
            <input
              type="text"
              placeholder="Personal Id"
              value={DeliveryPersonID}
              onChange={(e) => setDeliveryPersonID(e.target.value)}
            ></input>{" "}
          </p>
          <p>
            Delivery personnel ID:{" "}
            <input
              type="text"
              placeholder="Personal Id"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>{" "}
          </p>
          <p>
            Delivery personnel ID:{" "}
            <input
              type="text"
              placeholder="Personal Id"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>{" "}
          </p>
          <p>
            Delivery personnel ID:{" "}
            <input
              type="text"
              placeholder="Personal Id"
              value={ContactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            ></input>{" "}
          </p>
          <p>
            Delivery personnel ID:{" "}
            <input
              type="text"
              placeholder="Personal Id"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>{" "}
          </p>
          <p>
            Delivery personnel ID:{" "}
            <input
              type="text"
              placeholder="Personal Id"
              value={VehicleID}
              onChange={(e) => setVehicleID(e.target.value)}
            ></input>{" "}
          </p>

          <button onClick={updateDetails}>Update Details</button>
        </div>
      </div>
    </div>
  );
}

export default App;
