import React from "react";
// import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import Results from "./pages/Results";
import Details from "./pages/Details";
import Form from "./pages/Form";
import LogIn from "./pages/LogIn";
import CheckoutPay from "./pages/CheckoutPay/CheckoutPay";
import Cart from "./pages/Cart/Cart.jsx";

import SellerRoutes from "./validations/SellerRoutes";
import BuyerRoutes from './validations/BuyerRoutes';
import NavBar from "./components/NavBar";
import SimpleNavBar from "./components/SimpleNavBar";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
      {pathname === "/signup" || pathname === "/login" ? <SimpleNavBar /> : <NavBar />}
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/login" exact element={<LogIn />} />
        <Route path="/results" exact element={<Results />} />
        <Route path="/product/:id" exact element={<Details />} />
    <Route element={<BuyerRoutes />}>
        <Route path="/checkout/" exact element={<CheckoutPay />} />
        <Route element={<SellerRoutes />}> 
            <Route path="/product/create" exact element={<Form />} />
        </Route>
    </Route>
    <Route path="/shopping-cart" exact element={<Cart />} />
   </Routes>
   <Footer/>
  </div>
 );
}

export default App;
