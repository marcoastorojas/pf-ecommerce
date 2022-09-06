import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanProductSearchResults, getProductId, getProducts, getProductsByName } from "../../../redux/actions";
import AdminProductCard from "../AdminProductCard";

import style from "./index.module.css";

export default function AdminProductsComponent() {
  const dispatch = useDispatch();

  const [paginate, setPaginate] = useState(1);
  const [searchInput, setSearchInput] = useState(null);
  const [searchTry, setSearchTry] = useState(false);

  const products = useSelector((state) => state.products);
  const searchedProducts = useSelector((state) => state.searchedProducts);

  const [detailToRender, setDetailToRender] = useState(null);
  const [details, setDetails] = useState(null);

  function onSearchInputChange(e) {
    setSearchInput(e.target.value);
  }

  function onPageChange(e) {
    setPaginate(e.target.id);
  }

  function prevOrNext(e) {
    console.log(e.target.id);
    if (e.target.id === "prev") {
      if (paginate > 1) setPaginate(paginate - 1);
    } else if (e.target.id === "next") {
      if (paginate < products.totalPages) setPaginate(paginate + 1);
    }
  }

  const onSearchHandler = (e) => {
    e.preventDefault();
    console.log(searchInput, "set serach to true");
    setSearchTry(true);
    dispatch(getProductsByName(searchInput));
  };

  const setOriginalResultsHandler = () => {
    console.log("hoi");
    setSearchTry(false);
    dispatch(cleanProductSearchResults());
  };

  function closeDetailHandler() {
    console.log("soy detail");
    setDetailToRender(null);
    setDetails(null);
  }

  useEffect(() => {
    console.log(detailToRender);
    setDetails(products.data && products.data.find((p) => p.id === detailToRender));
    console.log(details);
    // console.log(searchInput);
    dispatch(getProducts(paginate));
  }, [dispatch, paginate, detailToRender, details]);

  return (
    <div>
      <p>Complete product catalog:</p>
      <p>{products.data && products.data[0] && products.totalResults} products uploaded.</p>
      <form onSubmit={onSearchHandler}>
        <input type="text" placeholder="Search a product by it's title" onChange={onSearchInputChange} />
        <button type="submit">Filter</button>
        <button onClick={setOriginalResultsHandler} disabled={searchTry ? false : true}>
          Back to all results.
        </button>
      </form>
      <div>
        <button id="prev" onClick={prevOrNext}>
          {"<"}
        </button>
        {products.totalPages &&
          Array.from(Array(products.totalPages).keys()).map((page) => (
            <button key={page} id={page + 1} onClick={onPageChange}>
              {page + 1}
            </button>
          ))}
        <button id="next" onClick={prevOrNext}>
          {">"}
        </button>
      </div>
      <div>
        {!searchedProducts[0] && products.data && products.data.map((p) => <AdminProductCard key={p.id} p={p} setDetailToRender={setDetailToRender} />)}
        {searchedProducts && searchedProducts[0] && searchedProducts.map((p) => <AdminProductCard key={p.id} p={p} setDetailToRender={setDetailToRender} />)}
      </div>
      {details && (
        <div className={style.detailContainer}>
          <div className={style.detailCard} id={details.id}>
            <div className={style.imgAndTitle}>
              <div className={style.detailImgContainer}>
                {details.images.split(" ").map((img) => {
                  return <img src={img} alt="product" className={style.detailImg} />;
                })}
                {/* <img src={details.images.split(" ")[0]} alt="product" className={style.detailImg} /> */}
              </div>
              <div className={style.titleDiv}>
                <button onClick={closeDetailHandler}>close</button>
                <p>Title: {details.title}</p>
                <p>Model: {details.model}</p>
                <p>Brand: {details.brand}</p>
                <p>Stock: {details.stock}</p>
                <p>Owner: {details.userId}</p>
              </div>
            </div>
            <div className={style.costDiv}>
              <p>Total cost: ${details.price.originalprice}</p>
              <p>Discount: {details.price.discount ? details.price.discount : "No discount."}</p>
              {details.price.discount && <p>Discount expire time: {details.price.expiresin ? details.price.expiresin : "Without limit."}</p>}
            </div>
            <div>
              <p>Description:</p>
              <p>{details.description}</p>
            </div>
            <p></p>
          </div>
        </div>
      )}
    </div>
  );
}
