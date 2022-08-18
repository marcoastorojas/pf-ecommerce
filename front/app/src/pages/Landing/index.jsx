// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { stateTest } from "../../redux/actions";

import LandingProducts from "../../components/LandingProducts";
import Carousel from "../../components/Carousel";
import NavBar from "../../components/NavBar";

// import style from "./index.module.css";

export default function Landing() {
 return (
  <div>
   <NavBar />
   <Carousel />
   <LandingProducts />
  </div>
 );
}
