import { useState } from "react";

import { Link } from "react-router-dom";

import style from "./index.module.css";
import SearchBar from "../SearchBar";

export default function NavBar() {
 const [productNumber, setProductNumber] = useState(0);

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
    <nav>
     <button>Categories</button>
     <button>History</button>
     <button>Sales</button>
     <button>Upload product</button>
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
