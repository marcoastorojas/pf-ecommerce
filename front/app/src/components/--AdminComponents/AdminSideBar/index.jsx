import { useNavigate } from "react-router-dom";

import style from "./index.module.css";

export default function AdminSideBar() {
  const navigate = useNavigate();

  const componentSelectionHandler = (e) => {
    switch (e.target.id) {
      case "users":
        return navigate("/soyadmin/users");
      case "products":
        return navigate("/soyadmin/products");
      case "orders":
        return navigate("/soyadmin/orders");
      case "reviews":
        return navigate("/soyadmin/reviews");
      case "categories":
        return navigate("/soyadmin/categories");
      case "sucursales":
        return navigate("/soyadmin/sucursales")
      default:
        return;
    }
  };

  return (
    <aside className={style.aside}>
      <div className={style.controlPanel}>Control Panel</div>
      <nav className={style.optionNav}>
        <div className={style.optionDiv} onClick={componentSelectionHandler}>
          <p id="users" className={style.optionP}>
            User monitoring
          </p>
        </div>
        <div className={style.lasOptionDiv} onClick={componentSelectionHandler}>
          <p id="products" className={style.optionP}>
            Products management
          </p>
        </div>
        <div className={style.lasOptionDiv} onClick={componentSelectionHandler}>
          <p id="orders" className={style.optionP}>
            Orders administration
          </p>
        </div>
        <div className={style.optionDiv} onClick={componentSelectionHandler}>
          <p id="reviews" className={style.optionP}>
            All Reviews
          </p>
        </div>
        <div className={style.firstOptionDiv} onClick={componentSelectionHandler}>
          <p id="categories" className={style.optionP}>
            Categories management
          </p>
        </div>
        <div className={style.firstOptionDiv} onClick={componentSelectionHandler}>
          <p id="sucursales" className={style.optionP}>
            Add sucursal
          </p>
        </div>
      </nav>
    </aside>
  );
}
