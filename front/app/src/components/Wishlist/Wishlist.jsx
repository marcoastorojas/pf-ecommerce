import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { delFav } from "../../redux/actions";
import starF from "../../media/images/bxs-star.svg";
import { NavLink } from "react-router-dom";

import style from "./Wishlist.module.css";

export default function Wishlist() {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites);

  const handleDel = (id) => {
    dispatch(delFav(id));
  };

  if (favourites.length > 1)
    return (
      <div className={style.column}>
        {favourites.map((product) => {
          return (
            <div key={product.id} className={style.card}>
              <div className={style.starData}>
                <img src={starF} alt="fill-star" onClick={() => handleDel(product.id)} />
              </div>
              <div className={style.info}>
                <NavLink to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.title} />
                  <h2 className={style.title}>{product.title}</h2>
                  <span className={style.data}>
                    <h3>{product.brand}</h3>
                    <h3>{product.model}</h3>
                  </span>
                  <span className={style.price}>
                    <h2>{product.price}</h2>
                  </span>
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    );
  else return <div>WISHLIST IS EMPTY</div>;
}
