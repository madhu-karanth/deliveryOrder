// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [deliveryPerson, setDeliveryPerson] = useState({
        DeliveryPersonID: '',
    });
    const navigate = useNavigate();
    const setInput = (e) => {
        const { name, value } = e.target;
        setDeliveryPerson((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const login = async () => {
        try {
            const response = await axios.post('/api/login', {
                ID: deliveryPerson.DeliveryPersonID,
            });
            if (response.status === 200) {
                // Login successful
                const userDetails = response.data;
                // Redirect to App.js and pass user details as a prop
                navigate(`/app/${userDetails.DeliveryPersonID}`, { state: userDetails });
            } else {
                // Handle unsuccessful login
                console.log('Login failed');
            }
        } catch (error) {
            console.error(error);
        }
    };
    const deleteUserDetails = async (deliveryId) => {
        try {
            const response = await axios.delete(`/api/person/${deliveryPerson.DeliveryPersonID}`);
            console.log(response);
            if (response.status === 200) {
                console.log("deleted");
            } else {
                console.error('Failed to fetch delivery person');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="App">
            <input
                type="text"
                name="DeliveryPersonID"
                placeholder="Delivery personeel ID"
                onChange={setInput}
            ></input>
            <button onClick={login}>Fetch User Details</button>
            <button onClick={deleteUserDetails}>Delete User</button>
        </div>
    );
}

export default Login;

