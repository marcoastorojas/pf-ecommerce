import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeAllFromCart,
  removeOneFromCart,
  addOneFromCart,
  getTotal,
} from "../../redux/actions";
import { Toaster, toast } from "react-hot-toast";
import style from "./ShoppingCart.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const cartTotal = useSelector((state) => state.cartTotal);

  const [quantityAdd, setQuantityAdd] = useState(1);
  const [quantityRes, setQuantityRes] = useState(1);

  useEffect(() => {
    dispatch(getTotal());
  }, [cart.length]);

  const addCart = (e) => {
    dispatch(addOneFromCart(e.target.value));
    dispatch(getTotal());
    toast.success(`Successfully added ${quantityAdd} items to the cart!`);
  };

  const resCart = (e) => {
    dispatch(removeOneFromCart(e.target.value));
    dispatch(getTotal());
    toast.success(`Successfully removed ${quantityRes} items to the cart!`, {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#713200",
      },
      iconTheme: {
        primary: "#713200",
        secondary: "#FFFAEE",
      },
    });
  };

  const deleteFromCart = (e) => {
    dispatch(removeAllFromCart(e.target.value));
    dispatch(getTotal());
    toast.success(`Successfully deleted product from the cart!`, {
      style: {
        border: "1px solid #FF2301",
        padding: "16px",
        color: "#FF2301",
      },
      iconTheme: {
        primary: "#FF2301",
        secondary: "#FFFAEE",
      },
    });
  };

  const deleteAll = () => {
    dispatch(getTotal());
    toast.success(`Successfully cleared cart!`, {
      style: {
        border: "1px solid  #F32013",
        padding: "16px",
        color: " #F32013",
      },
      iconTheme: {
        primary: " #F32013",
        secondary: "#FFFAEE",
      },
    });
    setTimeout(() => {
      dispatch(clearCart());
    }, 1200);
  };

  const goToCheckout = () => {
    navigate("/checkout");
  };

  if (cart.length > 0)
    return (
      <div className={style.contShoppingCart}>
        {/* <button onClick={() => console.log(cart, cartTotal)}>PRUEBA</button> */}
        {/* <h2>Shopping Cart</h2> */}
        <div className={style.headShopCart}>
          <h3>TOTAL TO PAY: ${Intl.NumberFormat().format(cartTotal)}</h3>
        </div>
        <div className={style.productsShopCart}>
          {cart.map((pt) => {
            const images = pt.product.images.split(" ");
            return (
              <div key={pt.product.id} className={style.cardShopCart}>
                <div className={style.productoCSC}>
                  <div className={style.imgCSCDiv}>
                    <Link to={`/product/${pt.product.id}`}>
                      <img className={style.shopCartIMG} src={images[0]} alt={pt.product.title} />
                    </Link>
                  </div>
                  <div className={style.detailsNprice}>
                    <div className={style.details}>
                      <div className={style.detailsTop}>
                        <p>{pt.product.title}</p>
                      </div>
                      <div className={style.detailsBot}>
                        <p>{pt.product.brand}</p>
                        <p>{pt.product.model}</p>
                      </div>
                    </div>
                    <div className={style.price}>
                      <p>${pt.product.price}</p>
                      <p>x{pt.amount}</p>
                      <p>${Intl.NumberFormat().format(pt.amount * pt.product.price)}</p>
                    </div>
                  </div>
                </div>
                <div className={style.buttonsCSC}>
                  <button value={pt.product.id} onClick={(e) => addCart(e)}>
                    +{quantityAdd}
                  </button>
                  <button value={pt.product.id} onClick={(e) => resCart(e)}>
                    -{quantityRes}
                  </button>
                  <button
                    value={pt.product.id}
                    onClick={(e) => deleteFromCart(e)}
                  >
                    {/* -{pt.amount} */}
                    Remove all
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className={style.buttonsShopCart}>
          <button className={style.buttonEnabled} onClick={() => deleteAll()}>
            <span>REMOVE ALL</span>
          </button>
          <button className={style.buttonEnabled} onClick={() => goToCheckout()}>
            <span>CHECKOUT</span>
          </button>
        </div>
        {/* <Toaster /> */}
      </div>
    );
  else return (
    <div className={style.contShoppingCart}>
      <div className={style.headShopCart}>
          <h3>TOTAL TO PAY: ${Intl.NumberFormat().format(cartTotal)}</h3>
      </div>
      <div className={style.productsShopCart}>
        <p>Shooping cart is empty</p>;
      </div>
      <div className={style.buttonsShopCart}>
          <button className={style.buttonDisabled} disabled>
            <span>REMOVE ALL</span>
          </button>
          <button className={style.buttonDisabled} disabled>
            <span>CHECKOUT</span>
          </button>
        </div>
    </div>

  )
}
