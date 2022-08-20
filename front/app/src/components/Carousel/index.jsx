import { useEffect, useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { getProducts } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
// import "../../Css/Carousel.css";
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
   <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
   <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
   {sliceArrayProducts?.map((slide, index) => {
    return (
     <div className={index === current ? "slide-active" : "slide"} key={index}>
      {index === current && (
       <div>
        <img
         src={slide.images.slice(0)}
         alt="not found"
         className="image-carousel"
        />
        <span className="slide-name">{slide.title}</span>
        <span className="slide-price">${slide.price}</span>
       </div>
      )}
     </div>
    );
   })}
  </section>
 );
}
