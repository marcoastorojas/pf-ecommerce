import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Loading from "../../components/Loading/Loading";
// import NavBar from "../../components/NavBar";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
// import SellerDetails from "../../components/SellerDetails";
// import Footer from "../../components/Footer";

import { getProductId, clearDetail } from "../../redux/actions";

import "./index.module.css";

export default function Details() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const product = useSelector((store) => store.product);
  useEffect(() => {
    // console.log(Object.keys(product).length)
    document.title = Object.keys(product).length>0?product.title:'Loading...'
  }, [Object.keys(product).length])

  useEffect(() => {
    dispatch(getProductId(id));
  }, [id])
  useEffect(() => {
    return function clear () {
      dispatch(clearDetail());
    }
  }, []);

  if (!product.id) return <Loading />;
  else
    return (
      <div className="detailPage">
        {/* <NavBar /> */}
        <ProductDetail product={product} />
        {/* <Footer /> */}
      </div>
    );
}
