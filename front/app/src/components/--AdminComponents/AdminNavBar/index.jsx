import { Link } from "react-router-dom";
import AdminNavMenu from "../AdminNavMenu";

import style from "./index.module.css";

export default function AdminNavBar() {
  return (
    <header className={style.header}>
      <div className={style.sectionOne}>
        <div className={style.logoDiv}>
          <Link to={"/soyadmin"} className={style.logoLink}>
            <p className={style.plus}>
              <b>Plus</b>
            </p>
            <p className={style.hardware}>hardware</p>
          </Link>
          <h2 className={style.adminscreen}>Admin screen.</h2>
        </div>
      </div>

      <div className={style.sectionTwo}>
        <AdminNavMenu />
      </div>
    </header>
  );
}
