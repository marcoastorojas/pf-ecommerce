import React from "react";
import NavBar from "../../components/NavBar";
import Checkout from "../../components/Checkout/Checkout.jsx";
import Footer from "../../components/Footer";
import { useEffect } from "react";

export default function CheckoutPay() {
  //Cambiar el título de la página
  useEffect(() => {
    document.title = 'Checkout'
  }, [])
  return (
    <div>
      {/* <NavBar /> */}
      <Checkout />
      {/* <Footer /> */}
    </div>
  );
}
