import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./ProductDetail.css";

import Add from "../../utils/add-cart.svg";
import Del from "../../utils/delete.svg";

export default function ProductDetail({ product }) {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState(product.data.images.split(" "));
  const [quantity, setQuantity] = useState(1);

  const changeImage = (e) => {
    setIndex(+e.target.id);
  };

  return (
    <div className="container">
      <div className="left">
        <div className="top">
          <div className="images">
            <img
              src={images[index]}
              alt={product.data.brand}
              className="main-image"
            />
            {/* <img
              src="https://http2.mlstatic.com/D_779763-MLA45385615296_032021-O.jpg"
              alt="brand"
              className="thumb"
            /> */}
            {images.map((image, index) => {
              if (index > 0)
                return (
                  <img
                    src={image}
                    alt={product.data.brand}
                    key={index}
                    id={index}
                    className="thumb"
                    onClick={(e) => changeImage(e)}
                  />
                );
            })}
          </div> {/*images div*/}
          <div className="details">
            <h1>{product.data.title}</h1>
            <h2>
              <span>{product.data.model}</span>
              <span>{product.data.brand}</span>
            </h2>
            <p>{product.data.description}</p>
          </div> {/*details div*/}
        </div> {/*top div*/}
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
          </div> {/*comments div*/}
        </div> {/*bottom div*/}
      </div> {/*left div*/}
      <div className="right">
        <div className="seller-info">
          <img
            src="data:image/jpeg;base64,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"
            alt="user profile"
          />
          <h2>user seller</h2>
          <div className="user-data">
            <span>rating</span>
            <span>profile link</span>
          </div> {/*user data div*/}
        </div> {/*seller info div*/}
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
              />{quantity}
            </div> {/*el del input div*/}
            <div className="total">
              total:{" "}
              <span>
                ${Intl.NumberFormat().format(product.data.price * quantity)}
              </span>
            </div> {/*total div*/}
          </div> {/*pricing div*/}
          <div>
            <div className="buttons">
              <div>
                <button className="noselect add button-shopping">
                  <span className="text">Add to cart</span>
                  <span className="icon">
                    <img src={Add} alt="add-cart" />
                  </span>
                </button>
              </div> {/*el del boton div*/}
              <div>
                <button className="noselect delete button-shopping">
                  <span className="text">Delete</span>
                  <span className="icon">
                    <img src={Del} alt="delete-cart" />
                  </span>{" "}
                </button>
              </div> {/*el del boton 2 div*/}
            </div> {/*buttons div*/}
          </div> {/*div arriba de buttons div*/}
        </div> {/*shopping div*/}
      </div> {/*right div*/}
    </div>
  );
}
