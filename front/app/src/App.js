// import logo from './logo.svg';
import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import Results from "./pages/Results";
import Details from "./pages/Details";
import Form from "./pages/Form";
// import LogIn from "./pages/LogIn";

import Cart from "./pages/Cart/Cart.jsx";
import CheckoutPay from "./pages/CheckoutPay/CheckoutPay";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/results" exact element={<Results />} />
        <Route path="/product/:id" exact element={<Details />} />
        <Route path="/product/create" exact element={<Form />} />
        <Route path="/shopping-cart" exact element={<Cart />} />
        <Route path="/checkout/" exact element={<CheckoutPay />} />
      </Routes>
    </div>
  );
}

export default App;
