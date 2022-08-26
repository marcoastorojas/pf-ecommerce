import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { sendPayment } from "../../redux/actions";

export default function Checkout() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const cartTotal = useSelector((state) => state.getTotal);
  const user = useSelector((state) => state.user);
  //RECIBE LO QUE EL POST DEL BACK RETORNA
  const dataPayment = useSelector((state) => state.dataPayment);
  const navigate = useNavigate();

  const handlePay = () => {
    dispatch(
      sendPayment({ totalPriceProducts: cartTotal, products: cart, user_id: user.uid })
    );
  };

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
        <button onClick={() => handlePay()}>PAY</button>
        <Toaster />
      </div>
    );
}
