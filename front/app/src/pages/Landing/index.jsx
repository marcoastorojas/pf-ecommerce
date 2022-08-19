// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

import LandingProducts from "../../components/LandingProducts";
import Carousel from "../../components/Carousel";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
// import { useSelector } from "react-redux";

// import style from "./index.module.css";

export default function Landing() {
 //  const searchedProducts = useSelector((state) => state.searchedProducts);
 //  useEffect(() => {
 //   console.log({ searchedProducts: searchedProducts });
 //  });

 return (
  <div>
   <NavBar />
   <Carousel />
   <LandingProducts />
   <Footer />
  </div>
 );
}
