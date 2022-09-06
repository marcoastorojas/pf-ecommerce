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
    console.log(favourites)
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
      <div className={style.containerFather}>
        {favourites.map((pt) => {
         const images = pt.product.images.split(" ");
          return (
            <div key={pt.product.id} className={style.product_card}>
              <div>
                <img src={starF} alt="fill-star" onClick={() => handleDel(pt.product.id)} className={style.star} />
              </div>

                <NavLink to={`/product/${pt.product.id}`} className={style.product_data}>
                  <img src={images[0]} alt={pt.product.title} />
                  <h3 className={style.product_title}>{pt.product.title}</h3>
                  <h3 className={style.product_price}>
                    ${Number(pt.product.price?.originalprice).toLocaleString()}
                  </h3>
                </NavLink>
            </div>
          );
        })}
      </div>
    );
  else return <div className={style.empty}>WISHLIST IS EMPTY</div>;
}
