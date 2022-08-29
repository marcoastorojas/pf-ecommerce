import LandingProducts from "../../components/LandingProducts";
import Carousel from "../../components/Carousel";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useEffect } from "react";

import style from "./index.module.css";

export default function Landing() {
    useEffect(() => {
        document.title = 'Home'
    }, [])
 return (
  <div className={style.landing}>
   {/* <NavBar /> */}
   <div className={style.mainDiv}>
    <Carousel />
    <LandingProducts />
    <br />
   </div>
   {/* <Footer /> */}
  </div>
 );
}
