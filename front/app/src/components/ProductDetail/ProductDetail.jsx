import React from "react";
import "./ProductDetail.css";

import Add from "../../utils/add-cart.svg";
import Del from "../../utils/delete.svg";

export default function ProductDetail({ product }) {
  return (
    <div className="main-wrapper">
      <div className="container">
        <button className="button-back">GO Back</button>
        <div className="product-div">
          <div className="product-div-left">
            <div className="img-container">
              <img src="product.images" alt="product.brand" />
            </div>
          </div>
          <div className="product-div-right">
            <span className="product-name">{product.title}</span>
            <span className="product-model-name">{product.model}</span>

            <span className="product-price">${product.price}</span>
            <p className="product-description">{product.description}</p>
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
