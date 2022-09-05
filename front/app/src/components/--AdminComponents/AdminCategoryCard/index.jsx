import { useDispatch } from "react-redux";
import { putCategoryState } from "../../../redux/actions";
import style from "./index.module.css";

export default function AdminCategoryCard({ id, name, active }) {
  const dispatch = useDispatch();

  const stateClickHandler = (e) => {
    let newState = active === "true" ? "false" : "true";
    // console.log(newState);
    dispatch(putCategoryState(e.target.id, newState));
  };

  return (
    <div className={style.cardDiv}>
      <p>Category: {name}</p>
      <button className={active === "true" ? style.stateButtonActive : style.stateButtonDisabled} id={id} onClick={stateClickHandler}>
        {active === "true" ? "Active" : "Disabled"}
      </button>
    </div>
  );
}

/* <div className={style.stateDiv}> */
/* <label className={style.switch} htmlFor="check">
<input
id="check"
type="checkbox"
className={style.checkInput}
value={id}
onClick={stateClickHandler}
// checked={active ? true : false}
/>
<span className={style.slider}></span>
</label> */
/* </div> */
