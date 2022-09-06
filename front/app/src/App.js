import React from "react";

import { Route, Routes, useLocation } from "react-router-dom";

import { Toaster } from "react-hot-toast";

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
import AdminNavBar from "./components/--AdminComponents/AdminNavBar";
import Footer from "./components/Footer";

// import SellerRoutes from "./validations/SellerRoutes";
// import BuyerRoutes from "./validations/BuyerRoutes";

// import { BUYER_ROLE, SELLER_ROLE, ADMIN_ROLE } from "./validations/usersTypes";

import "./App.css";
import RegisterSucursal from "./components/--AdminComponents/RegisterSucursal/RegisterSucursal.jsx";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
      {pathname === "/signup" || (pathname === "/login" && <SimpleNavBar />)}
      {pathname === "/soyadmin/categories" || pathname === "/soyadmin/users" || pathname === "/soyadmin/reviews" || pathname === "/soyadmin/products" ? (
        <AdminNavBar />
      ) : (
        <NavBar />
      )}
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
        <Route path="/soyadmin/:panel" exact element={<AdminPage />} />
        <Route path="*" exact element={<GenericError />} />
      </Routes>
      <Footer />
      <Toaster toastOptions={{ className: "tostadora" }} />
    </div>
  );
}

export default App;
