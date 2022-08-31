import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import style from "./index.module.css";

export default function ProfileInfo() {
  const user = useSelector((state) => state.user);

  const [disabledForm, setDisabledForm] = useState(true);

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className={style.mainDiv}>
      <div className={style.headDiv}>
        <h3>Profile information.</h3>
        <button className={style.changeInfoButton}>Change profile information</button>
      </div>
      {disabledForm ? (
        <form>
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </form>
      ) : (
        <form>
          <input type="text" disabled />
          <input type="text" disabled />
          <input type="text" disabled />
          <input type="text" disabled />
        </form>
      )}
    </div>
  );
}
