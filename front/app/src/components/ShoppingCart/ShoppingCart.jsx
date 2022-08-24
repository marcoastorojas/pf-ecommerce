import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeAllFromCart,
  removeOneFromCart,
  addOneFromCart,
} from "../../redux/actions";
import { Toaster, toast } from "react-hot-toast";
import "./ShoppingCart.css";
import { Link } from "react-router-dom";

export default function ShoppingCart() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [quantityAdd, setQuantityAdd] = useState(1);
  const [quantityRes, setQuantityRes] = useState(1);

  const addCart = (e) => {
    dispatch(addOneFromCart(e.target.value));
    toast.success(`Successfully added ${quantityAdd} items to the cart!`);
  };

  const resCart = (e) => {
    dispatch(removeOneFromCart(e.target.value));
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

  if (cart.length > 0)
    return (
      <div className="cart">
        <h2>Shopping Cart</h2>

        <div className="products-cart">
          {cart.map((pt) => {
            const images = pt.product.images.split(" ");

            return (
              <div key={pt.product.id} className="card">
                <Link to={`/product/${pt.product.id}`}>
                  <img src={images[0]} alt={pt.product.title} />
                </Link>

                <h2>{pt.product.title}</h2>
                <div className="info">
                  <h3>
                    <span>Model: {pt.product.model}</span>
                    <span>Brand: {pt.product.brand}</span>
                  </h3>
                  <div className="price">
                    <h2>
                      <span>Total items: {pt.amount}</span>
                      <span>
                        Total price:$
                        {Intl.NumberFormat().format(
                          pt.amount * pt.product.price
                        )}
                      </span>
                    </h2>
                  </div>
                  <div className="buttons-cart">
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
                      -{pt.amount}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <button className="button-all" onClick={() => deleteAll()}>
            <span>REMOVE ALL</span>
          </button>
        </div>
        <Toaster />
      </div>
    );
  else return <div className="no-data">Shooping cart is empty</div>;
}
