import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import style from "./index.module.css";
import SearchBar from "../SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getCategoryProductsById } from "../../redux/actions";

export default function NavBar() {
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(getCategories());
 }, [dispatch]);

 const [productNumber, setProductNumber] = useState(0);

 const categories = useSelector((state) => state.categories);

 const onCategorySelection = (e) => {
  // console.log(e);
  dispatch(getCategoryProductsById(e.target.id));
 };

 return (
  <header className={style.header}>
   <div className={style.sectionOne}>
    <div className={style.logoAndSB}>
     {" "}
     <Link to={"/"} className={style.logoLink}>
      <p className={style.logo}>Logo</p>
     </Link>
     <SearchBar />
    </div>
    <nav className={style.navButtons}>
     <details id="categories">
      <summary>Categories</summary>
      {categories[0] &&
       categories.map((e) => {
        const { id, name } = e;
        return (
         <div>
          <Link key={id} id={id} to={`/results`} onClick={onCategorySelection}>
           {name}
          </Link>
         </div>
        );
       })}
     </details>
     <Link to="/">History</Link>
     <Link to="/">Sales</Link>
     <Link to="/product/create">Upload your product</Link>
    </nav>
   </div>

   <div className={style.sectionTwo}>
    <Link to={"/log-in"}>
     <button>Login</button>
    </Link>
    <button>Signup</button>
    <button>🛒</button>
    <p className={style.cartNumber}>{productNumber}</p>
   </div>
  </header>
 );
}
