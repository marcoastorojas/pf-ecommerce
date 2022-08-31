import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserInfo, putUserImage } from "../../redux/actions";

import emptyUser from "../../media/images/empty_user_profilepic.png";

import style from "./index.module.css";

export default function ProfileInfo() {
  const dispatch = useDispatch();

  const urlRegExp =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

  const user = useSelector((state) => state.user);
  const userInfo = useSelector((state) => state.userInfo);

  const [disabledForm, setDisabledForm] = useState(true);
  const [profPicDivVisibility, setProfPicDivVisibility] = useState(true);
  const [newImgUrl, setNewImgUrl] = useState(null);

  useEffect(() => {
    // console.log(uid);
    dispatch(getUserInfo(user.uid));
  }, [dispatch, user.uid]);

  const ableOrDisableForm = () => {
    setDisabledForm(!disabledForm);
  };

  const showProfPicDiv = () => {
    setProfPicDivVisibility(!profPicDivVisibility);
  };

  const changeProfilePic = () => {
    // console.log({ newImgUrl, test: urlRegExp.test(newImgUrl) });
    urlRegExp.test(newImgUrl) && dispatch(putUserImage(newImgUrl, user.uid));
  };

  // const testUser = {
  //   name: "andi",
  //   username: "ousiarca",
  //   email: "a@a.com",
  //   image: sample,
  // };

  return (
    <div className={style.mainDiv}>
      <div className={style.headDiv}>
        <h3>Profile information.</h3>
        <button className={style.changeInfoButton} onClick={ableOrDisableForm}>
          Change profile information
        </button>
      </div>
      <div className={style.infoDiv}>
        <div className={style.imageDiv}>
          <img className={style.formImg} src={user.image ? user.image : emptyUser} alt="sample" />
          <button className={profPicDivVisibility ? style.changeImgButton : style.hidden} onClick={showProfPicDiv}>
            Change profile picture
          </button>
          <div className={profPicDivVisibility ? style.hidden : style.newUrlDiv}>
            <input className={style.newUrlInput} type="text" placeholder="Insert new profile pic's url" onChange={(e) => setNewImgUrl(e.target.value)} />
            <div className={style.changeAndCloseButtonsDiv}>
              <button className={style.changeImgButton} onClick={changeProfilePic}>
                Change
              </button>
              <button className={style.changeImgButton} onClick={showProfPicDiv}>
                Close
              </button>
            </div>
          </div>
        </div>
        {disabledForm ? (
          <form className={style.infoForm}>
            {Object.entries(user).map((kv) => {
              let key = kv[0];
              let value = kv[1];
              if (!value || key === "uid" || key === "roleId") return <></>;
              return (
                <div key={key}>
                  <label htmlFor={key}>{key}</label>
                  <input id={key} type="text" placeholder={value} value={value} disabled />
                </div>
              );
            })}
            {Object.entries(userInfo).map((kv) => {
              let key = kv[0];
              let value = kv[1];
              if (!value || key === "google" || key === "status") return <></>;
              return (
                <div key={key}>
                  <label htmlFor={key}>{key}</label>
                  <input id={key} type="text" placeholder={value} value={value} disabled />
                </div>
              );
            })}
          </form>
        ) : (
          <form className={style.infoForm}>
            {Object.entries(user).map((kv) => {
              let key = kv[0];
              let value = kv[1];
              if (!value || key === "uid" || key === "roleId") return <></>;
              return (
                <div key={key}>
                  <label htmlFor={key}>{key}</label>
                  <input id={key} type="text" placeholder={value} />
                </div>
              );
            })}
            {Object.entries(userInfo).map((kv) => {
              let key = kv[0];
              let value = kv[1];
              if (!value || key === "google" || key === "status") return <></>;
              return (
                <div key={key}>
                  <label htmlFor={key}>{key}</label>
                  <input id={key} type="text" placeholder={value} />
                </div>
              );
            })}
          </form>
        )}
      </div>
    </div>
  );
}
