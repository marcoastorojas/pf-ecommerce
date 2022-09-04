import LandingProducts from "../../components/LandingProducts";
import Carousel from "../../components/Carousel";
// import NavBar from "../../components/NavBar";
// import Footer from "../../components/Footer";
import { useEffect, useState } from "react";

import style from "./index.module.css";
import Paginate from "../../components/Paginate/Paginate";
import { useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions";
import toast from "react-hot-toast";

export default function Landing() {
    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        document.title = 'Home'
        dispatch(getProducts(currentPage));
    }, [currentPage])
    // useEffect(() => {
    //   toast.loading('Loading products', {
    //     id: 'Landing'
    //   })
    // }, [])


 return (
  <div className={style.landing}>
   {/* <NavBar /> */}
   <div className={style.mainDiv}>
    <Carousel />
    <LandingProducts />
    <Paginate
        totalData={60}
        dataPerPage={20}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    {/* <br /> */}
   </div>
   {/* <Footer /> */}
  </div>
 );
}
