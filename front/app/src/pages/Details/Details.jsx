import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import NavBar from "../../components/NavBar";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import { getProductId, clearDetail } from "../../redux/actions";
import Footer from "../../components/Footer";
import Footer from "../../components/Footer";


export default function Details() {
 const [loading, setLoading] = useState(true);

 // const { id } = useParams();

 // const dispatch = useDispatch();
 // const product = useSelector((store) => store.product);


  useEffect(() => {
    dispatch(clearDetail());
    dispatch(getProductId(id));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch, id]);

  if (loading) return <Loading />;
 else
  return (
   <main>
    <NavBar />
    <ProductDetail product={product}/>
    <Footer />
   </main>
  );
}
