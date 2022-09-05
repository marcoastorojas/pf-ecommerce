import { useNavigate } from "react-router-dom";
import style from "./index.module.css";

export default function AdminSideBar() {
  const navigate = useNavigate();

  const componentSelectionHandler = (e) => {
    switch (e.target.id) {
      case "categories":
        return navigate("/soyadmin/categories");
      default:
        return;
    }
  };

  return (
    <aside className={style.aside}>
      <div className={style.controlPanel}>Control Panel</div>
      <nav className={style.optionNav}>
        <div
          className={style.firstOptionDiv}
          onClick={componentSelectionHandler}
        >
          <p id="categories" className={style.optionP}>
            Category management
          </p>
        </div>
        <div className={style.optionDiv} onClick={componentSelectionHandler}>
          <p className={style.optionP}>
            Option 2
          </p>
        </div>
        <div className={style.optionDiv} onClick={componentSelectionHandler}>
          <p className={style.optionP}>Option 3</p>
        </div>
        <div className={style.lasOptionDiv} onClick={componentSelectionHandler}>
          <p className={style.optionP}>Option 4</p>
        </div>
      </nav>
    </aside>
  );
}
