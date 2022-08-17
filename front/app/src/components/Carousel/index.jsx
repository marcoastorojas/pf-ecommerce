import { dataPrueba } from "./dataPrueba"
import { useState } from "react"
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from "react-icons/fa"
import "../../Css/Carousel.css"


export default function Carousel({slides}) {
const [current, setCurrent] = useState(0);
const length = slides.length;

const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
}

const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
}

console.log(slides.length);

if(!Array.isArray(slides) || slides.length <= 0) {
    return null;
}

    return (
        <section className="carousel">
            <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide}/>
            <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide}/>
            {dataPrueba.map((slide, index) => {
                return (
                    <div className={index === current ? "slide-active" : "slide"} key={index}>
                        {index === current && (
                        <img src={slide.image} alt="pcs-gamers" className="image-carousel" />
                        )}  
                    </div>
                    )
                })}
        </section>
    );
   }
   