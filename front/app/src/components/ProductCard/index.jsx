// import { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./index.module.css";

export default function ProductCard({ id, title, image, price }) {
 return (
  <Link to={`/product/${id}`} className={style.product_card}>
   {/* <div></div> */}
   <img src={image.slice(0)} className={style.product_image} alt={title} />
   <h3 className={style.product_title}>{title}</h3>
   <h3 className={style.product_price}>${Number(price).toLocaleString()}</h3>
  </Link>
 );
}
