import { useState } from "react";

import { Link } from "react-router-dom";

import style from "./index.module.css";
import SearchBar from "../SearchBar";

export default function NavBar() {
 const [productNumber, setProductNumber] = useState(0);

 return (
  <header className={style.header}>
   <div className={style.sectionOne}>
    <h1 className={style.logo}>Logo</h1>
    <SearchBar />
    <Link to={"/log-in"}>
     <button>Login</button>
    </Link>
    <button>Signup</button>
    <button>🛒</button>
    <p>{productNumber}</p>
   </div>
   <div className={style.sectionTwo}>
    <button>Categories</button>
    <button>History</button>
    <button>Sales</button>
    <button>Upload product</button>
   </div>
  </header>
 );
}
