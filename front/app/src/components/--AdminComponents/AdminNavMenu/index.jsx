// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import defaultImg from "../../../media/images/empty_user_profilepic.png";

import style from "./index.module.css";

export default function AdminNavMenu() {
  const navigate = useNavigate();

  const admin = useSelector((state) => state.user);

  // const logOutTryHandler = () => {};

  // const logOutHandler = () => {
  //   localStorage.deleteItem("user");
  //   navigate("/");
  // };

  // useEffect(() => {
  //   console.log(admin);
  // }, [admin]);

  return (
    <div className={style.mainDiv}>
      <div className={style.profilePicDiv}>
        <img className={style.profilePic} src={admin.image ? admin.image : defaultImg} alt="default" />
      </div>
      <div className={style.administratorNameDiv}>
        <p className={style.administratorP}>Adminstrator:</p>
        <h3 className={style.administratorH3}>{admin.username}</h3>
      </div>
      <div className={style.profileDiv}>Profile</div>
      <div
        className={style.logoutDiv}
        // onClick={logOutTryHandler}
      >
        Log out
      </div>
      <div className={style.divBorder}></div>
      <button className={style.changeInterfaceButton} onClick={() => navigate("/")}>
        Open user interface.
      </button>
    </div>
  );
}
