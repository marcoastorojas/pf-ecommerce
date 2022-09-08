import { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./index.module.css";
import { addFav, delFav, getUserFav } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

import star from "../../media/images/bx-star.svg";
import starF from "../../media/images/bxs-star.svg";


export default function ProductCard({ id, title, image, price, model, brand }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo);
  const favourites = useSelector((state) => state.favourites);

  const product = { id, title, image, price, model, brand };
  
  const addFavourites = () => {
    if(user.uid)  {
    dispatch(addFav(product.id, user.uid));
    setTimeout(() => {
        dispatch(getUserFav(user.uid))
    }, 1000)
    }
    else return console.log("LOG IN")
  };

  const delFavourites = () => {
    if(user.uid)  {
    dispatch(delFav(user.uid, product.id));
    setTimeout(() => {
        dispatch(getUserFav(user.uid))
    }, 1000)
    }
    else return console.log("LOG IN")
  };
  

  if(user.role?.name === "USER_ROLE" || user.role?.name === "SELLER_ROLE" )return (
    <div className={style.product_card}>
    { favourites[0] !==0 && favourites.find((pt) => pt.product.id === id) ? <div className={style.favorites}>
          <img src={starF} alt="fill-star" className={style.star} onClick={() => delFavourites()} />
        </div> : <div className={style.favorites}>
          <img src={star} alt="star" className={style.star} onClick={() => addFavourites()} />
        </div>}

      <Link to={`/product/${id}`} className={style.product_data}>
        {/* <div></div> */}
        <img src={image.slice(0)} alt={title} />
        <h3 className={style.product_title}>{title}</h3>
        <h3 className={style.product_price}>
          ${Number(price).toLocaleString()}
        </h3>
      </Link>
    </div>
  );
  
  else return  (
    <div className={style.product_card}>
      <Link to={`/product/${id}`} className={style.product_data}>
        {/* <div></div> */}
        <img src={image.slice(0)} alt={title} />
        <h3 className={style.product_title}>{title}</h3>
        <h3 className={style.product_price}>
          ${Number(price).toLocaleString()}
        </h3>
      </Link>
    </div>
  );
}
