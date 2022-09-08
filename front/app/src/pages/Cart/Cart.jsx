import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart.jsx";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Cart() {
  const cart = useSelector(state => state.cart)

  useEffect(() => {
    document.title = `Shopping Cart: ${cart.length} elements`
  })
  return (
    <div>
      {/* <NavBar /> */}
      <ShoppingCart />
      {/* <Footer /> */}
    </div>
  );
}
