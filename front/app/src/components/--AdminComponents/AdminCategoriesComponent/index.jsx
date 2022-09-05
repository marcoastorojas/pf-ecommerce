import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../redux/actions";
import AdminCategoryCard from "../AdminCategoryCard";
import AdminCategoryForm from "../AdminCategoryForm";

import style from "./index.module.css";

export default function AdminCategoriesComponent() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className={style.generalDiv}>
      <div>
        <AdminCategoryForm />
      </div>
      <div className={style.abledDisabledDiv}>
        <div className={style.activeDiv}>
          <p className={style.abledDsiabledP}>Abled categories.</p>
          {categories[0] &&
            categories.map((c) => {
              // console.log(c);
              let { id, name, active } = c;
              if (active === "true") return <AdminCategoryCard key={id} id={id} name={name} active={active} />;
            })}
        </div>
        <div className={style.separationDiv}></div>
        <div className={style.disabledDivDiv}>
          <p className={style.abledDsiabledP}>Disabled categories.</p>
          {categories[0] &&
            categories.map((c) => {
              // console.log(c);
              let { id, name, active } = c;
              if (active === "false") return <AdminCategoryCard key={id} id={id} name={name} active={active} />;
            })}
        </div>
      </div>
    </div>
  );
}
