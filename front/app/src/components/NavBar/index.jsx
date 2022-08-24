import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import style from "./index.module.css";
import SearchBar from "../SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getCategoryProductsById, getSearchCategory, getSearchName } from "../../redux/actions";

import cart from "../../media/images/cart.svg";

export default function NavBar() {
 const dispatch = useDispatch();

 const categories = useSelector((state) => state.categories);
 useEffect(() => {
  dispatch(getCategories());
  console.log('NavBar')
 }, [dispatch]);

 const [productNumber, setProductNumber] = useState(0);


 const onCategorySelection = (e) => {
  // console.log(e);
  dispatch(getCategoryProductsById(e.target.id));
  dispatch(getSearchCategory(e.target.id))
  dispatch(getSearchName(''))
 };

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
     <details id="categories" className={style.details}>
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
     </details>
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
     <Link to={""} className={style.signUp}>
      Sign up
     </Link>
    </div>
    <div>
     <button> {productNumber}</button>
     {/* <p className={style.cartNumber}>{}</p> */}
    </div>
   </div>
  </header>
 );
}
