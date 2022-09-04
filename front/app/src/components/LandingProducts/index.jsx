import { getProducts, getUserFav } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../ProductCard";
import "./index.modules.css";
import Paginate from "../Paginate/Paginate";

export default function LandingProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts);
  const favourites = useSelector((state) => state.favourites);
  const user = useSelector((state) => state.user);

  const sliceArrayProduct = products.data?.slice(0, 20);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setdataPerPage] = useState(20);


useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(favourites));
  }, [favourites]);


  useEffect(() => {
    dispatch(getProducts(currentPage));
    if(user.uid) dispatch(getUserFav(user.uid))
  }, [currentPage]);
  

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
                  price={product.price.originalprice}
                  brand={product.brand}
                  model={product.model}
                />
              );
            })
          : null}
      </div>
      <Paginate
        totalData={60}
        dataPerPage={dataPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </main>
  );
}
