import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import defaultImg from "../../../media/images/empty_user_profilepic.png";
import { setUserGoogle } from "../../../redux/actions";

import style from "./index.module.css";

export default function AdminNavMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const localStorage = window.localStorage;

  const admin = useSelector((state) => state.user);

  const [logOutTry, setLogOutTry] = useState(false);

  const onProfileClick = () => {
    navigate("/user/info");
  };

  const logOutTryHandler = () => {
    setLogOutTry(true);
  };

  const cancelLogOutTry = () => {
    setLogOutTry(false);
  };

  const logOutHandler = () => {
    dispatch(setUserGoogle({}, true));
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className={style.mainDiv}>
      <div className={style.profilePicDiv}>
        <img className={style.profilePic} src={admin.image ? admin.image : defaultImg} alt="default" />
      </div>
      <div className={style.administratorNameDiv}>
        <p className={style.administratorP}>Adminstrator:</p>
        <h3 className={style.administratorH3}>{admin.username}</h3>
      </div>
      {/* <div className={style.profileDiv} onClick={onProfileClick}>
        Profile
      </div> */}
      <div className={style.logoutDiv} onClick={logOutTryHandler}>
        Log out
      </div>
      <div className={style.divBorder}></div>
      <button className={style.changeInterfaceButton} onClick={() => navigate("/")}>
        Open user interface.
      </button>
      {logOutTry && (
        <div className={style.logOutQuestionScreenDiv}>
          <div className={style.logOutQuestionDiv}>
            <p className={style.logOutQuestion}>You're about to exit the admin accout.</p>
            <button className={style.logOutContinue} onClick={logOutHandler}>
              Continue
            </button>
            <button className={style.logOutCancel} onClick={cancelLogOutTry}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
