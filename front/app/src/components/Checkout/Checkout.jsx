import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

export default function Checkout() {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  if (cart.length < 1) {
    toast.error("Shopping cart is empty");
    setTimeout(() => {
      navigate("/");
    }, 1500);

    return (
      <div>
        Shopping cart is empty <Toaster />
      </div>
    );
  } else
    return (
      <div>
        PAY
        <Toaster />
      </div>
    );
}
