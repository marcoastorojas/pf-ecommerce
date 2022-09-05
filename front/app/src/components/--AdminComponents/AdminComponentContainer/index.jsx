import { useParams } from "react-router-dom";

import AdminCategoriesComponent from "../AdminCategoriesComponent";

import style from "./index.module.css";

export default function AdminComponentContainer() {
  const { panel } = useParams();

  return (
    <div className={style.containerDiv}>
      {panel && panel === "categories" && <AdminCategoriesComponent />}
      {panel && panel === "reviews" && <AdminCategoriesComponent />}
    </div>
  );
}
