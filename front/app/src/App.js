import React from "react";
// import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import Results from "./pages/Results";
import Details from "./pages/Details";
import Form from "./pages/Form";
import LogIn from "./pages/LogIn";
import CheckoutPay from "./pages/CheckoutPay/CheckoutPay";
import Cart from "./pages/Cart/Cart.jsx";
import InfoUserB from "./pages/infoUserB";
import SuccessPayment from "./pages/SuccessOperation";
import GenericError from "./pages/GenericError";
import AdminPage from "./pages/AdminPage/AdminPage";

import NavBar from "./components/NavBar";
import SimpleNavBar from "./components/SimpleNavBar";
import Footer from "./components/Footer";
import AdminNavBar from "./components/--AdminComponents/AdminNavBar";

// import SellerRoutes from "./validations/SellerRoutes";
// import BuyerRoutes from "./validations/BuyerRoutes";

// import closeButton from "./media/svg/cross_on_circle.svg";
// import toastLogo from "./media/svg/tick_on_circle.svg";

import "./App.css";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
      {pathname === "/signup" || pathname === "/login" ? <SimpleNavBar /> : pathname === "/soyadmin" ? <AdminNavBar /> : <NavBar />}
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/login" exact element={<LogIn />} />
        <Route path="/results" exact element={<Results />} />
        <Route path="/product/:id" exact element={<Details />} />
        <Route path="/shopping-cart" exact element={<Cart />} />
        {/* <Route element={<BuyerRoutes />}> */}
        <Route path="/checkout/" exact element={<CheckoutPay />} />
        <Route path="/successpay" element={<SuccessPayment />} />
        <Route path="/user/:component" exact element={<InfoUserB />} />
        {/* <Route element={<SellerRoutes />}> */}
        <Route path="/product/create" exact element={<Form />} />
        {/* </Route> */}
        {/* </Route> */}
        <Route path="/error" exact element={<GenericError />} />
        <Route path="/soyadmin" exact element={<AdminPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
