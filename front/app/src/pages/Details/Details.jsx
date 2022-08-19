import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import NavBar from "../../components/NavBar";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import Footer from "../../components/Footer";

export default function Details() {
 const [loading, setLoading] = useState(true);

 // const { id } = useParams();

 // const dispatch = useDispatch();
 // const product = useSelector((store) => store.product);

 useEffect(() => {
  //dispatch(reducer.action(id))
  setTimeout(() => {
   setLoading(false);
  }, 1000);
 }, []);

 if (loading) return <Loading />;
 else
  return (
   <main>
    <NavBar />
    <ProductDetail />
    <Footer />
   </main>
  );
}
