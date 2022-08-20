import style from "./index.module.css";

export default function ProductCard({ title, image }) {
 return (
  <div className={style.product_card}>
   <h3 className={style.product_title}>{title}</h3>
   <img src={image.slice(0)} className={style.product_image} alt={title} />
  </div>
 );
}
