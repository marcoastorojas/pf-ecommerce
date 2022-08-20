import LandingProducts from "../../components/LandingProducts";
import Carousel from "../../components/Carousel";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

import "./index.module.css";

export default function Landing() {
 return (
  <div className="landing">
   <NavBar />
   <Carousel />
   <LandingProducts />
   <Footer />
  </div>
 );
}
