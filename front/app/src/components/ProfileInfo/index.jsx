import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import sample from "../../media/images/sample-image-square.jpg";
import { getUserInfo } from "../../redux/actions";

import style from "./index.module.css";

export default function ProfileInfo() {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.user);

  const [disabledForm, setDisabledForm] = useState(true);
  const [profPicDivVisibility, setProfPicDivVisibility] = useState(false);
  const [newImgUrl, setNewImgUrl] = useState(null);

  useEffect(() => {
    // console.log(uid);
    dispatch(getUserInfo(uid));
  }, [dispatch, uid]);

  const ableOrDisableForm = () => {
    setDisabledForm(!disabledForm);
  };

  const showProfPicDiv = () => {
    setProfPicDivVisibility(!profPicDivVisibility);
  };

  const changeProfilePic = () => {
    console.log(newImgUrl);
  };

  const testUser = {
    name: "andi",
    username: "ousiarca",
    email: "a@a.com",
    image: sample,
  };

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
          <img className={style.formImg} src={sample} alt="sample" />
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
            {Object.entries(testUser).map((kv) => {
              let key = kv[0];
              let value = kv[1];
              if (!value) return <></>;
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
            {Object.entries(testUser).map((kv) => {
              let key = kv[0];
              let value = kv[1];
              if (!value) return <></>;
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
