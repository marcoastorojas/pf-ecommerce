import { useParams } from "react-router-dom";

import AdminCategoriesComponent from "../AdminCategoriesComponent";
import AdminProductsComponent from "../AdminProductsComponent";
import AllReviews from "../AllReviews/AllReviews";

import style from "./index.module.css";

export default function AdminComponentContainer() {
  const { panel } = useParams();

  return (
    <div className={style.containerDiv}>
      {panel && panel === "reviews" && <AllReviews />}
      {panel && panel === "categories" && <AdminCategoriesComponent />}
      {panel && panel === "products" && <AdminProductsComponent />}
    </div>
  );
}
