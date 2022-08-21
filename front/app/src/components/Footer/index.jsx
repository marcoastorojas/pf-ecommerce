import { Link } from "react-router-dom";

import style from "./index.module.css";

export default function Footer() {
 return (
  <div>
   <br />
   <hr />
   <footer className={style.footer}>
    <div className={style.footerDivs}> </div>
    <div className={style.footerLinksDiv}>
     <Link to={""} className={style.links}>
      Contact us.
     </Link>
     <Link to={""} className={style.links}>
      Work with us.
     </Link>
     <Link to={""} className={style.links}>
      Q&A.
     </Link>
    </div>
    <div className={style.footerDivs}></div>
   </footer>
  </div>
 );
}
