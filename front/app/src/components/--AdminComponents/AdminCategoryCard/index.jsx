import { useDispatch } from "react-redux";
import style from "./index.module.css";

export default function AdminCategoryCard({ id, name, active }) {
  const dispatch = useDispatch();

  const stateClickHandler = (e) => {
    console.log(id);
  };

  return (
    <div id={id} className={style.cardDiv}>
      <p>Category: {name}</p>
      <div className={style.stateDiv}>
        <p>State: {active ? "Active" : "Disabled"}</p>
        {/* <label className={style.switch} htmlFor="check">
          <input
            id="check"
            type="checkbox"
            className={style.checkInput}
            value={id}
            onClick={stateClickHandler}
            // checked={active ? true : false}
          />
          <span className={style.slider}></span>
        </label> */}
        <button onClick={stateClickHandler}>click</button>
      </div>
    </div>
  );
}
