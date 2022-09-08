import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanProductSearchResults, cleanseProductDetails, deleteProduct, getProducts, getProductsByName } from "../../../redux/actions";
import AdminDetailModal from "../AdminDetailModal";
import AdminProductCard from "../AdminProductCard";

import style from "./index.module.css";

export default function AdminProductsComponent() {
  const dispatch = useDispatch();

  //PAGINADO
  const [paginate, setPaginate] = useState(1);
  //SEARCH INPUT
  const [searchInput, setSearchInput] = useState(null);
  const [searchTry, setSearchTry] = useState(false);
  //MODAL DE DETALLE
  const [renderDetail, setRenderDetail] = useState(false);
  // const [detailToRender, setDetailToRender] = useState(null);
  // const [details, setDetails] = useState(null);

  const products = useSelector((state) => state.products);
  const searchedProducts = useSelector((state) => state.searchedProducts);
  const details = useSelector((state) => state.product);

  function onSearchInputChange(e) {
    setSearchInput(e.target.value);
  }

  function onPageChange(e) {
    setPaginate(e.target.id);
  }

  function prevOrNext(e) {
    // console.log(e.target.id);
    if (e.target.id === "prev") {
      if (paginate > 1) setPaginate(paginate - 1);
    } else if (e.target.id === "next") {
      if (paginate < products.totalPages) setPaginate(paginate + 1);
    }
  }

  const onSearchHandler = (e) => {
    e.preventDefault();
    console.log({ searchInput, search: "setting to true" });
    setSearchTry(true);
    dispatch(getProductsByName(searchInput));
  };

  const setOriginalResultsHandler = () => {
    // console.log("hoi");
    setSearchTry(false);
    dispatch(cleanProductSearchResults());
  };

  function closeDetailHandler() {
    // console.log("soy detail");
    // setDetailToRender(null);
    setRenderDetail(false);
    dispatch(cleanseProductDetails());
  }

  useEffect(() => {
    // console.log(detailToRender);
    // setDetails(products.data && products.data.find((p) => p.id === detailToRender));
    console.log(details);
    // console.log(searchInput);
    dispatch(getProducts(paginate));
    //eslint-disable-next-line
  }, [dispatch, paginate, details]);

  return (
    <div className={style.contAdminProducts}>
      <h1>Complete product catalog:</h1>
      <h3>{products.data && products.data[0] && products.totalResults} products uploaded.</h3>
      <form onSubmit={onSearchHandler} className={style.formProduct}>
        {/* <label>Search:</label> */}
        <input type="text" placeholder="Search a product by it's title" onChange={onSearchInputChange} />
        <button type="submit">Filter</button>
        <button onClick={setOriginalResultsHandler} disabled={searchTry ? false : true}>
          Back to all results.
        </button>
      </form>
      <div className={style.pageButtons}>
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
      <div className={style.resultProducts}>
        {!searchedProducts[0] &&
          products.data &&
          products.data.map((p) => (
            <AdminProductCard
              key={p.id}
              p={p}
              setRenderDetail={setRenderDetail}
              // setDetailToRender={setDetailToRender}
            />
          ))}
        {searchedProducts &&
          searchedProducts[0] &&
          searchedProducts.map((p) => (
            <AdminProductCard
              key={p.id}
              p={p}
              setRenderDetail={setRenderDetail}
              // setDetailToRender={setDetailToRender}
            />
          ))}
      </div>
      {renderDetail && details && (
        <div className={style.detailContainer}>
          <AdminDetailModal details={details} closeDetailHandler={closeDetailHandler} />
        </div>
      )}
    </div>
  );
}

// <div className={style.detailCard} id={details.id}>
//   <div className={style.imgAndTitle}>
//     <div className={style.detailImgContainer}>
//       {details.images &&
//         details.images.split(" ").map((img) => {
//           return <img key={img} src={img} alt="product" className={style.detailImg} />;
//         })}
//       {/* <img src={details.images.split(" ")[0]} alt="product" className={style.detailImg} /> */}
//     </div>
//     <div className={style.titleDiv}>
//       <button onClick={closeDetailHandler}>close</button>
//       <p>Title: {details.title}</p>
//       <p>Model: {details.model}</p>
//       <p>Brand: {details.brand}</p>
//       <p>Stock: {details.stock}</p>
//       <p>Owner: {details.userId}</p>
//     </div>
//   </div>
//   <div className={style.costDiv}>
//     <p>Total cost: ${details.price && details.price.originalprice}</p>
//     <p>
//       Discount:
//       {details.price && details.price.discount ? details.price.discount : "No discount."}
//     </p>
//     {details.price && details.price.discount && <p>Discount expire time: {details.price.expiresin ? details.price.expiresin : "Without limit."}</p>}
//   </div>
//   <div>
//     <p>Description:</p>
//     <p>{details.description}</p>
//   </div>
//   <div>
//     <button id="delete" onClick={deleteTryHandler}>
//       Delete product
//     </button>
//     {deleteTry && (
//       <div>
//         <p>You're about to delete a product from the data base. Do you want to complete this action?</p>
//         <button onClick={deleteActionHandler}>Yes, continue.</button>
//         <button id="cancel" onClick={deleteTryHandler}>
//           No, cancel the action.
//         </button>
//       </div>
//     )}
//   </div>
// </div>
