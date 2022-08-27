import { Link } from "react-router-dom";

import style from "./index.module.css";

export default function Footer() {
 return (
  <div className={style.contFooter}>
   <br />
   {/* <hr /> */}
   <footer className={style.footer}>
     <Link to={""} className={style.links}>
      Contact us.
     </Link>
     <Link to={""} className={style.links}>
      Work with us.
     </Link>
     <Link to={""} className={style.links}>
      Q&A.
     </Link>
   </footer>
  </div>
 );
}
