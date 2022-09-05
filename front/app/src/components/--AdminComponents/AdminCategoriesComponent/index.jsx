import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../redux/actions";

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
        categories.map((c) => (
          <div key={c.id}>
            <p>{c.name}</p>
            <p>{c.active}</p>
          </div>
        ))}
    </div>
  );
}
