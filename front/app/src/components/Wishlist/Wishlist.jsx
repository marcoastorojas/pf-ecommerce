import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { delFav } from "../../redux/actions";
import starF from "../../media/images/bxs-star.svg";

export default function Wishlist() {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites);

  const handleDel = (id) => {
    dispatch(delFav(id));
  };

  if (favourites.length > 1)
    return (
      <div>
        {favourites.map((product) => {
          return (
            <div>
              <div>
                <img
                  src={starF}
                  alt="fill-star"
                  onClick={() => handleDel(product.id)}
                />
              </div>
              <div>
                <img src={product.image} alt={product.title} />
                <h2>{product.title}</h2>
                <span>
                  <h3>{product.brand}</h3>
                  <h3>{product.model}</h3>
                </span>
                <span>
                  <h2>{product.price}</h2>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  else return <div>WISHLIST IS EMPTY</div>;
}
