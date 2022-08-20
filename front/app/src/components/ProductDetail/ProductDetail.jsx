import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./ProductDetail.css";

import Add from "../../utils/add-cart.svg";
import Del from "../../utils/delete.svg";

export default function ProductDetail({ product }) {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState(product.data.images.split(" "));

  const changeImage = (e) => {
    setIndex(+e.target.id);
  };

  return (
    <div className="main-wrapper">
      <div className="container">
        <button className="button-back">
          <NavLink to="/" className="text">GO Back</NavLink>
        </button>

        <div className="product-div">
          <div className="product-imgs">
            <img
              src={images[index]}
              alt={product.data.brand}
              className="image-big"
            />
            <div className="thumb">
              {images.map((image, index) => {
                if (index > 0)
                  return (
                    <img
                      src={image}
                      alt={product.data.brand}
                      key={index}
                      id={index}
                      onClick={(e) => changeImage(e)}
                    />
                  );
              })}
            </div>
            <div className="img-select"></div>
          </div>
          <div className="product-div-right">
            <span className="product-name">{product.data.title}</span>
            <span className="product-model-name">
              {product.data.model} | {product.data.brand}
            </span>

            <span className="product-price">
              ${Intl.NumberFormat().format(product.data.price)}
            </span>
            <p className="product-description">{product.data.description}</p>
            <div className="btn-groups">
              <div>
                <button className="noselect add button-shopping">
                  <span className="text">Add to cart</span>
                  <span className="icon">
                    <img src={Add} alt="add-cart" />
                  </span>
                </button>
              </div>
              <div>
                <button className="noselect delete button-shopping">
                  <span className="text">Delete</span>
                  <span className="icon">
                    <img src={Del} alt="delete-cart" />
                  </span>{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
