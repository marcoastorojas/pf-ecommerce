import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../redux/actions";
import AdminCategoryCard from "../AdminCategoryCard";

import style from "./index.module.css";

export default function AdminCategoriesComponent() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className={style.generalDiv}>
      {categories[0] &&
        categories.map((c) => {
          // console.log(c);
          let { id, name, active } = c;
          return <AdminCategoryCard key={id} id={id} name={name} active={active} />;
        })}
    </div>
  );
}
