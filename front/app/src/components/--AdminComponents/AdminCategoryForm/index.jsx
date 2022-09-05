import { useState } from "react";
import { useDispatch } from "react-redux";

import style from "./index.module.css";

export default function AdminCategoryForm() {
  const dispatch = useDispatch();

  const [newCategory, setNewCategory] = useState("");
  const [submitTry, setSubmitTry] = useState(false);

  function onChangeHandler(e) {
    setNewCategory(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(newCategory);
    setSubmitTry(true);
    // dispatch(newCategory);
  };

  return (
    <div className={style.borderDiv}>
      <form className={style.form} onSubmit={submitHandler}>
        <p className={style.cardTitle}>Create a new Category</p>
        <p className={submitTry && (newCategory.length < 10 || newCategory.length > 40) ? style.warning : style.warningDisabled}>
          *Category's name should contain 10-50 characters.
        </p>
        <input className={style.input} type="text" onChange={onChangeHandler} />
        <button className={style.button} type="submit">
          Create Category.
        </button>
      </form>
      <div>Uploaded category YES/NO</div>
    </div>
  );
}
