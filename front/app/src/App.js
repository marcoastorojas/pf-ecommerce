import React from "react";
// import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

// import toast, { Toaster } from "react-hot-toast";

import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import Results from "./pages/Results";
import Details from "./pages/Details";
import Form from "./pages/Form";
import LogIn from "./pages/LogIn";
import CheckoutPay from "./pages/CheckoutPay/CheckoutPay";
import Cart from "./pages/Cart/Cart.jsx";
import InfoUserB from "./pages/InfoUserB/index.jsx";

// import SellerRoutes from "./validations/SellerRoutes";
// import BuyerRoutes from "./validations/BuyerRoutes";
import NavBar from "./components/NavBar";
import SimpleNavBar from "./components/SimpleNavBar";
import Footer from "./components/Footer";

// import SuccessPayment from "./pages/SuccessOperation";

import "./App.css";

// import closeButton from "./media/svg/cross_on_circle.svg";
// import toastLogo from "./media/svg/tick_on_circle.svg";

function App() {
  const { pathname } = useLocation();

  // useEffect(() => {
  //   toast.custom(
  //     (t) => (
  //       <div className="toast-border">
  //         <img className="toast-logo" src={toastLogo} alt="toast logo" />
  //         <div className="toast-text">
  //           <span>This toast has been succesfully arranged!</span>
  //         </div>
  //         <button className="toast-button" onClick={() => toast.dismiss(t.id)}>
  //           <img className="button-image" src={closeButton} alt="close button" />
  //         </button>
  //       </div>
  //     ),
  //     { duration: 10000 }
  //   );
  // });

  return (
    <div className="App">
      {pathname === "/signup" || pathname === "/login" ? <SimpleNavBar /> : <NavBar />}
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/login" exact element={<LogIn />} />
        <Route path="/results" exact element={<Results />} />
        <Route path="/product/:id" exact element={<Details />} />
        <Route path="/shopping-cart" exact element={<Cart />} />
        {/* <Route element={<BuyerRoutes />}> */}
        <Route path="/checkout/" exact element={<CheckoutPay />} />
        {/* <Route path='/successpay' exact element={<SuccessOperation/>} /> */}
        <Route path="/user" exact element={<InfoUserB />} />
        {/* <Route element={<SellerRoutes />}> */}
        <Route path="/product/create" exact element={<Form />} />
        {/* </Route> */}
        {/* </Route> */}
      </Routes>
      <Footer />
      {/* <Toaster /> */}
    </div>
  );
}

export default App;
