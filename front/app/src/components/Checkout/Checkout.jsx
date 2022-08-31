// import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { sendPayment } from "../../redux/actions";

export default function Checkout() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const cartTotal = useSelector((state) => state.cartTotal);
  const user = useSelector((state) => state.user);
  //RECIBE LO QUE EL POST DEL BACK RETORNA
  const dataPayment = useSelector((state) => state.dataPayment);
  const navigate = useNavigate();

  const handlePay = () => {
    dispatch(sendPayment({ totalPriceProducts: cartTotal, products: cart, user_id: user.uid }));
  };

  if (cart.length < 1) {
    toast.error("Shopping cart is empty");
    toast.custom(
      (t) => (
        <div className="toast-border">
          <img
            className="toast-logo"
            // src={toastLogo}
            alt="toast logo"
          />
          <div className="toast-text">
            <span>This toast has been succesfully arranged!</span>
          </div>
          <button className="toast-button" onClick={() => toast.dismiss(t.id)}>
            <img
              className="button-image"
              // src={closeButton}
              alt="close button"
            />
          </button>
        </div>
      ),
      { duration: 10000 }
    );
    setTimeout(() => {
      navigate("/");
    }, 1500);

    return (
      <div>
        <Toaster />
        Shopping cart is empty
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
