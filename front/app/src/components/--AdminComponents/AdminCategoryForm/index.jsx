import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCategory } from "../../../redux/actions";

import style from "./index.module.css";

export default function AdminCategoryForm() {
  const dispatch = useDispatch();

  const posting = useSelector((state) => state.postingCategory);

  const [newCategory, setNewCategory] = useState("");
  const [submitTry, setSubmitTry] = useState(false);

  const namedRE = /^[a-zA-Z ]+$/g;
  const validName = namedRE.test(newCategory);

  function onChangeHandler(e) {
    setNewCategory(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setSubmitTry(true);
    if (validName && newCategory.length >= 10 && newCategory.length <= 50) {
      console.log(newCategory);
      dispatch(postCategory(newCategory));
    } else {
      console.log("wrong input data");
    }
  };

  return (
    <div className={style.borderDiv}>
      <form className={style.form} onSubmit={submitHandler}>
        <p className={style.cardTitle}>Add a new Category</p>
        <p className={submitTry && (!validName || newCategory.length < 10 || newCategory.length > 40) ? style.warning : style.warningDisabled}>
          *Category's name should contain 10 to 50 a-z characters.
        </p>
        <input className={style.input} type="text" placeholder="How do you want to name it?" onChange={onChangeHandler} />
        <button
          className={!validName || newCategory.length < 10 || newCategory.length > 40 ? style.disabledButton : style.button}
          type="submit"
          disabled={!validName || newCategory.length < 10 || newCategory.length > 40 ? true : false}
        >
          Save new category on data base.
        </button>
      </form>
      <div className={posting.name ? style.postingDiv : null}>
        {posting.name && <p>{posting.name}</p>}
        {posting.posting && (
          <div>
            {posting.posting === "posted" ? (
              <div>
                <img src="" alt="success" />
                <p></p>
              </div>
            ) : posting.posting === "posting" ? (
              "loading"
            ) : (
              posting.posting === "error" && <img src="" alt="error creating category" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
