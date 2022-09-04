// import { useEffect } from "react";
import { useParams } from "react-router-dom";

import AdminCategoriesComponent from "../AdminCategoriesComponent";

import style from "./index.module.css";

export default function AdminComponentContainer() {
  const { component } = useParams();

  // useEffect(() => {
  //   console.log(component);
  // });

  return <div className={style.containerDiv}>{component === "categories" && <AdminCategoriesComponent />}</div>;
}
