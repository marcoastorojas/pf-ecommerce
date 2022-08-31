// import { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./index.module.css";

import { useSelector, useDispatch } from "react-redux";

import star from "../../media/images/bx-star.svg";
import starF from "../../media/images/bxs-star.svg";
import { addFav, delFav } from "../../redux/actions";

export default function ProductCard({ id, title, image, price, model, brand }) {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites);

  const product = { id, title, image, price, model, brand };

  const addFavourites = () => {
    dispatch(addFav(product));
  };

  const delFavourites = () => {
    dispatch(delFav(product.id));
  };

  return (
    <div className={style.product_card}>
      {favourites.find((product) => product.id === id) ? (
        <div>
          <img src={starF} alt="fill-star" className={style.star} onClick={() => delFavourites()} />
        </div>
      ) : (
        <div>
          <img src={star} alt="star" className={style.star} onClick={() => addFavourites()} />
        </div>
      )}
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
