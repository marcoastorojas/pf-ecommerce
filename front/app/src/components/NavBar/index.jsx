import { useState } from "react";
import styles from "./index.module.css";

import SearchBar from "../SearchBar";

export default function NavBar() {
 const [productNumber, setProductNumber] = useState(0);

 return (
  <header className={styles.header}>
   <div>
    <h1>Logo</h1>
    <SearchBar />
    <button>Login</button>
    <button>Signup</button>
    <button>🛒</button>
    <p>{productNumber}</p>
   </div>
   <div>
    <button>Categories</button>
    <button>History</button>
    <button>Sales</button>
    <button>Upload product</button>
   </div>
  </header>
 );
}
