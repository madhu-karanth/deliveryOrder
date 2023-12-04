import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Update from "./Update";
import CreateOrder from "./CreateOrder";

import reportWebVitals from "./reportWebVitals";
import Login from "./Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/app/:id" element={<App />} />
      <Route path="/update/:id" element={<Update />} />
      <Route path="/create/:id" element={<CreateOrder />} />
      {/* Redirect to Login page if no route matches */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
