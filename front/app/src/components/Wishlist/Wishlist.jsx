import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { delFav, getUserFav } from "../../redux/actions";
import starF from "../../media/images/bxs-star.svg";
import { NavLink } from "react-router-dom";

import style from "./Wishlist.module.css";

export default function Wishlist() {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites);
  const user = useSelector((state) => state.user);
  
   useEffect(() => {
    if(user.uid) dispatch(getUserFav(user.uid))
  }, [])
  
  const handleDel =(id) => {
     if(user.uid)  {
     dispatch(delFav(user.uid, id));
        setTimeout(() => {
          dispatch(getUserFav(user.uid))
      }, 500)
     }
     else return console.log("LOG IN")
  }

 if (favourites.length > 0)
    return (
      <div className={style.column}>
        {favourites.map((pt) => {
          return (
            <div key={pt.product.id} className={style.card}>
              <div className={style.starData}>
                <img src={starF} alt="fill-star" onClick={() => handleDel(pt.product.id)} />
              </div>
              <div className={style.info}>
                <NavLink to={`/product/${pt.product.id}`}>
                  <img src={pt.product.image} alt={pt.product.title} />
                  <h2 className={style.title}>{pt.product.title}</h2>
                  <span className={style.data}>
                    <h3>{pt.product.brand}</h3>
                    <h3>{pt.product.model}</h3>
                  </span>
                  <span className={style.price}>
                    <h2>{pt.product.price}</h2>
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
