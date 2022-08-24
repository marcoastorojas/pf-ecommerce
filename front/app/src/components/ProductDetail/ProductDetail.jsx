import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
import "./ProductDetail.css";

import Add from "../../media/images/add-cart.svg";
import Del from "../../media/images/delete.svg";
import SellerDetails from "../SellerDetails";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeAllFromCart } from "../../redux/actions";
import { Toaster, toast } from "react-hot-toast";

export default function ProductDetail({ product }) {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState(product.images.split(" "));
  const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const changeImage = (e) => {
    setIndex(+e.target.id);
  };

  const addCart = () => {
    dispatch(addToCart(product, +quantity));
    toast.success(`Successfully added ${quantity} items to the cart!`);
  };

  const deleteFromCart = () => {
    dispatch(removeAllFromCart(product.id));
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

  return (
    <div className="container">
      <div className="left">
        <div className="top">
          <div className="images">
            <img
              src={images[index]}
              alt={product.brand}
              className="main-image"
            />
            {images.map((image, index) => {
              if (index > 0)
                return (
                  <img
                    src={image}
                    alt={product.brand}
                    key={index}
                    id={index}
                    className="thumb"
                    onClick={(e) => changeImage(e)}
                  />
                );
            })}
          </div>
          <div className="details">
            <h1>{product.title}</h1>
            <h2>
              <span>{product.model}</span>
              <span>{product.brand}</span>
            </h2>
            <p>{product.description}</p>
          </div>
        </div>
        <div className="bottom">
          <div className="comments">
            <span>
              <h3>user name</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur hic asperiores, quisquam ipsa expedita, quae harum
                sint corporis beatae recusandae facere ut inventore ex
                reiciendis quibusdam eum porro! Inventore, itaque.
              </p>
            </span>
            <span>
              <h3>user name 2</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur hic asperiores, quisquam ipsa expedita, quae harum
                sint corporis beatae recusandae facere ut inventore ex
                reiciendis quibusdam eum porro! Inventore, itaque.
              </p>
            </span>
          </div>
        </div>
      </div>
      <div className="right">
        <SellerDetails />
        <div className="shopping">
          <div className="pricing">
            <div>
              Quantity:{" "}
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <div className="quantity">{quantity}</div>
            </div>
            <div className="total">
              Total:{" "}
              <span>
                ${Intl.NumberFormat().format(product.price * quantity)}
              </span>
            </div>
          </div>
          <div>
            <div className="buttons">
              <div>
                <button
                  className="noselect add button-shopping"
                  onClick={() => addCart()}
                >
                  <span className="text">Add to cart</span>
                  <span className="icon">
                    <img src={Add} alt="add-cart" />
                  </span>
                </button>
              </div>
              <div>
                <button
                  className="noselect delete button-shopping"
                  onClick={() => deleteFromCart()}
                >
                  <span className="text">Delete All</span>
                  <span className="icon">
                    <img src={Del} alt="delete-cart" />
                  </span>{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
