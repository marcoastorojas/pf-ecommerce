// import { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./index.module.css";

export default function ProductCard({ id, title, image }) {
 return (
  <Link to={`/product/${id}`} className={style.product_card}>
   <h3 className={style.product_title}>{title}</h3>
   <img src={image.slice(0)} className={style.product_image} alt={title} />
  </Link>
 );
}
