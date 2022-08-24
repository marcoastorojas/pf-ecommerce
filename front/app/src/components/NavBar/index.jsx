import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignInGoogle from "../SignInGoogle/SigInGoogle.jsx";

import {
 getCategories,
 getCategoryProductsById,
 getSearchCategory,
 getSearchName,
} from "../../redux/actions";

import SearchBar from "../SearchBar";

import style from "./index.module.css";

export default function NavBar() {
 const dispatch = useDispatch();

 const categories = useSelector((state) => state.categories);

 useEffect(() => {
  dispatch(getCategories());
 }, [dispatch]);

 //  const [productNumber, setProductNumber] = useState(0);
 const [showCategories, setShowCategories] = useState(false);

 const onCategorySelection = (e) => {
  // console.log(e);
  dispatch(getCategoryProductsById(e.target.id));
  dispatch(getSearchCategory(e.target.id));
  dispatch(getSearchName(""));
 };

 function showCategoriesHandler() {
  showCategories ? setShowCategories(false) : setShowCategories(true);
 }

 return (
  <header className={style.header}>
   <div className={style.sectionOne}>
    <div className={style.logoAndSB}>
     {" "}
     <Link to={"/"} className={style.logoLink}>
      <p className={style.logo}>PF: e-commerce</p>
     </Link>
     <div className={style.searchBarDiv}>
      <SearchBar />
     </div>
    </div>
    <nav className={style.navButtons}>
     {/* <details id="categories" className={style.details}>
      <summary>Categories</summary>
      {categories[0] &&
       categories.map((e, index) => {
        const { id, name } = e;
        return (
         <div key={index}>
          <Link key={id} id={id} to={`/results`} onClick={onCategorySelection}>
           {name}
          </Link>
         </div>
        );
       })}
     </details> */}
     <button onClick={showCategoriesHandler} className={style.categoriesButton}>
      Categories
     </button>
     <div>
      {categories[0] &&
       showCategories &&
       categories.map((e, index) => {
        const { id, name } = e;
        return (
         <div key={index}>
          <Link key={id} id={id} to={`/results`} onClick={onCategorySelection}>
           {name}
          </Link>
         </div>
        );
       })}
     </div>
     <Link to="/" className={style.navBarLinks}>
      History
     </Link>
     <Link to="/" className={style.navBarLinks}>
      Sales
     </Link>
     <Link to="/product/create" className={style.navBarLinks}>
      Upload your product
     </Link>
    </nav>
   </div>

   <div className={style.sectionTwo}>
    <div>
     <Link to={""} className={style.logIn}>
      Log in
     </Link>
    </div>
    <div>
     <Link to={"/signup"} className={style.signUp}>
      Sign up
     </Link>
    </div>
    <div>
     <div>--Cart--</div>
     {/* <p className={style.cartNumber}>{}</p> */}
    </div>
   </div>
   <div>
    <SignInGoogle />
   </div>
  </header>
 );
}
