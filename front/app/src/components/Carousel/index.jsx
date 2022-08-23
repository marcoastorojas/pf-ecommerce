import { useEffect, useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { getProducts } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./index.modules.css";

export default function Carousel() {
 const dispatch = useDispatch();
 const products = useSelector((state) => state.allProducts);

 const [current, setCurrent] = useState(0);
 const sliceArrayProducts = products.data?.slice(0, 10);
 const length = sliceArrayProducts?.length;
 //  console.log(sliceArrayProducts);
 useEffect(() => {
  dispatch(getProducts());
 }, [dispatch]);

 const nextSlide = () => {
  setCurrent(current === length - 1 ? 0 : current + 1);
 };

 const prevSlide = () => {
  setCurrent(current === 0 ? length - 1 : current - 1);
 };

 if (!Array.isArray(sliceArrayProducts) || sliceArrayProducts?.length <= 0) {
  return null;
 }

 return (
  <section className="carousel">
   <div className="section-one">
    <span className="arrows" onClick={prevSlide}>
     {"<"}
    </span>
    {sliceArrayProducts?.map((slide, index) => {
     return (
      <div className={index === current ? "slide-active" : "slide"} key={index}>
       {index === current && (
        <Link to="/product/:id" className="image-text-container">
         <img
          src={slide.images.slice(0)}
          alt="not found"
          className="image-carousel"
         />
         <div className="title-price-container">
          <span className="slide-name">{slide.title}</span>
          <span className="slide-price">${slide.price}</span>
         </div>
        </Link>
       )}
      </div>
     );
    })}
    <span className="arrows" onClick={nextSlide}>
     {">"}
    </span>
   </div>
   <div className="section-two">
    <button className="round-button"></button>
    <button className="round-button"></button>
    <button className="round-button"></button>
    <button className="round-button"></button>
    <button className="round-button"></button>
    <button className="round-button"></button>
    <button className="round-button"></button>
    <button className="round-button"></button>
    <button className="round-button"></button>
    <button className="round-button"></button>
    <button className="round-button"></button>
   </div>
  </section>
 );
}
