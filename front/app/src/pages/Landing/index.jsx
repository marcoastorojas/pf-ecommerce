import LandingProducts from "../../components/LandingProducts";
import Carousel from "../../components/Carousel";
import NavBar from "../../components/NavBar";

import styles from "./index.module.css";


export default function Landing() {

 return (
  <div>
   <NavBar />
   <Carousel />
   <LandingProducts/>
  </div>
 );
}
