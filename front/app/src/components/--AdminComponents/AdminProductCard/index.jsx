// import { useEffect } from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductId } from "../../../redux/actions";
import style from "./index.module.css";

export default function AdminProductCard({ p, setRenderDetail }) {
  const dispatch = useDispatch();
  const {
    id,
    title,
    // model,
    // description,
    // brand,
    stock,
    images,
    // userId,
    price,
  } = p;
  const urlImages = images.split(" ");
  const {
    // id: priceId,
    originalprice,
    // discount, expiresin, productId
  } = price;

  const renderDetail = () => {
    // setRenderDetail(id);
    dispatch(getProductId(id));
    setRenderDetail(true);
    console.log(id);
  };

  // useEffect(() => {
  //   console.log(urlImages[0]);
  // }, [urlImages]);

  return (
    <div className={style.cardDiv} onClick={renderDetail}>
      <div className={style.imgDiv}>
        <img className={style.cardImage} src={urlImages[0]} alt="product" />
      </div>
      <div>
        <p>{title}</p>
        <div>
          <p>Stock: {stock}</p>
          <p>${originalprice}</p>
        </div>
      </div>
    </div>
  );
}
