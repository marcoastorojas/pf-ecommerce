import { useParams } from "react-router-dom";

import UsersCardsContainer from "../UsersCardsContainer/UsersCardsContainer.jsx";
import MyShoppingContainer from "../../MyShoppingContainer/MyShoppingContainer";
import AdminProductsComponent from "../AdminProductsComponent";
import AllReviews from "../AllReviews/AllReviews";
import AdminCategoriesComponent from "../AdminCategoriesComponent";
import RegisterSucursal from "../RegisterSucursal/RegisterSucursal.jsx";

import style from "./index.module.css";

export default function AdminComponentContainer() {
  const { panel } = useParams();

  return (
    <div className={style.containerDiv}>
      {panel && panel === "users" && <UsersCardsContainer />}
      {panel && panel === "products" && <AdminProductsComponent />}
      {panel && panel === "orders" && <MyShoppingContainer />}
      {panel && panel === "reviews" && <AllReviews />}
      {panel && panel === "categories" && <AdminCategoriesComponent />}
      {panel && panel === "sucursales" && <RegisterSucursal />}
    </div>
  );
}
