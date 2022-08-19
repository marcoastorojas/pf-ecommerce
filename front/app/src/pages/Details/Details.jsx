import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import "./Details.css";
import Add from "../../utils/add-cart.svg";
import Del from "../../utils/delete.svg";

export default function Details() {
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const dispatch = useDispatch();
  const product = useSelector((store) => store.product);

  useEffect(() => {
    //dispatch(reducer.action(id))
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <Loading />;
  else
    return (
      <div className="main-wrapper">
        <div className="container">
          <div className="product-div">
            <div className="product-div-left">
              <div className="img-container">
                <img
                  src="product.images" alt="product.brand"
                />
              </div>
            </div>
            <div className="product-div-right">
              <span className="product-name">product.title</span>
              <span className="product-model-name">product.name | product.model</span>

              <span className="product-price">$ 50.25</span>
              <p className="product-description">
               product.description
              </p>
              <div className="btn-groups">
                <div>
                  <button className="noselect add">
                    <span className="text">Add to cart</span>
                    <span className="icon">
                      <img src={Add} alt="add-cart" />
                    </span>
                  </button>
                </div>
                <div>
                  <button className="noselect delete">
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
