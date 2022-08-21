import { getProducts } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../ProductCard";
import "./index.modules.css";

export default function LandingProducts() {
 const dispatch = useDispatch();
 const products = useSelector((state) => state.allProducts);
 const sliceArrayProduct = products.data?.slice(0, 6);

 useEffect(() => {
  dispatch(getProducts());
 }, [dispatch]);

 return (
  <main>
   <div className="container-lProducts">
    {Array.isArray(sliceArrayProduct)
     ? sliceArrayProduct.map((product) => {
        return (
         <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          image={product.images}
         />
        );
       })
     : null}
   </div>
  </main>
 );
}
