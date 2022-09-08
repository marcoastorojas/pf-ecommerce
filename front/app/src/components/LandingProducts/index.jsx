import { getUserFav, getUserInfo } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../ProductCard";
import style from "./index.module.css";
import Loading from '../Loading/Loading.jsx';
import NoResultsFound from '../NoResultsFound/NoResultsFound.jsx';
// import Paginate from "../Paginate/Paginate";

export default function LandingProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts);
  const favourites = useSelector((state) => state.favourites);
  const user = useSelector((state) => state.user);

  const sliceArrayProduct = products.data?.slice(0, 20);

  // const [dataPerPage, setdataPerPage] = useState(20);

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    if (user.uid) {
      // dispatch(getUserFav(user.uid));
      dispatch(getUserInfo(user.uid));
    }
  }, []);

  return (
      <div className={style.containerProducts}>
        <button onClick={() => console.log(products)}>PRUEBA</button>
        {products.length===0?<Loading/>:products[0]===0?<NoResultsFound/>: Array.isArray(sliceArrayProduct)
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
  );
}
