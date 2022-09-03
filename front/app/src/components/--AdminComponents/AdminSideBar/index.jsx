import { useNavigate } from "react-router-dom";
import style from "./index.module.css";

export default function AdminSideBar() {
  const navigate = useNavigate();

  return (
    <aside className={style.aside}>
      <nav className={style.optionNav}>
        <div className={style.optionDiv}>
          <p className={style.optionP}>Option 1</p>
        </div>
        <div className={style.optionDiv}>
          <p className={style.optionP}>Option 2</p>
        </div>
        <div className={style.optionDiv}>
          <p className={style.optionP}>Option 3</p>
        </div>
        <div className={style.optionDiv}>
          <p className={style.optionP}>Option 4</p>
        </div>
      </nav>
    </aside>
  );
}
