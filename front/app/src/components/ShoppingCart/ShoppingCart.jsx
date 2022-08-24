import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, removeOneFromCart } from "../../redux/actions";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [quantityAdd, setQuantityAdd] = useState(0);
  const [quantityRes, setQuantityRes] = useState(0);

  const addCart = (product, quantity) => {
    dispatch(addToCart(product, quantity));
  };

  const deleteFromCart = (e) => {
    dispatch(removeOneFromCart(e.target.value));
  };

  const deleteAll = () => {
    dispatch(clearCart());
  };

  if (cart.length > 1)
    return (
      <div>
        <h2>Shopping Cart</h2>
        <div>
          <h3>Products:</h3>
          {cart.map((pt) => {
            const images = pt.product.images.split(" ");
            return (
              <div>
                <img src={images[0]} alt={pt.product.title} />
                <h2>{pt.ptoduct.title}</h2>
                <h3>
                  <span>{pt.product.model}</span>
                  <span>{pt.product.brand}</span>
                </h3>
                <div>
                  <h2>
                    <span>Total items: {pt.amount}</span>
                    <span>
                      Total price:$
                      {Intl.NumberFormat().format(pt.amount * pt.product.price)}
                    </span>
                  </h2>
                </div>
                <div>
                  <button onClick={() => addCart()}>
                    +{pt.amount + quantityAdd}
                  </button>
                  <button>-{pt.amount + quantityRes}</button>
                  <button value={pt.product} onClick={(e) => deleteFromCart(e)}>
                    X
                  </button>
                </div>
              </div>
            );
          })}
          <div>
            <button onClick={() => clearCart()}>REMOVE ALL</button>
          </div>
        </div>
      </div>
    );
  else return <div>Shooping cart is empty</div>;
}
