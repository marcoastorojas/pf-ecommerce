import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { putUserImage } from "../../redux/actions";

import emptyUser from "../../media/images/empty_user_profilepic.png";

import BuyerUserInfoForm from "../BuyerUserInfoForm";
import SellerUserInfoForm from "../SellerUserInfoForm";

import style from "./index.module.css";
import BeASeller from "../BeASeller/BeASeller";

export default function ProfileInfo() {
  const dispatch = useDispatch();

  const urlRegExp =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

  const user = useSelector((state) => state.user);
  const userInfo = useSelector((state) => state.userInfo);

  const [disabledForm, setDisabledForm] = useState(true);

  const [profPicDivVisibility, setProfPicDivVisibility] = useState(true);
  const [newImgUrl, setNewImgUrl] = useState(null);

  const showProfPicDiv = () => {
    setProfPicDivVisibility(!profPicDivVisibility);
  };

  const changeProfilePic = () => {
    urlRegExp.test(newImgUrl) && dispatch(putUserImage(user.uid, { image: newImgUrl }));
  };

  // let initialForm = {
  //   name: "",
  //   useranme: "",
  //   email: "",
  //   password: "",
  //   newPassword: "",
  // };

  const ableOrDisableForm = () => {
    setDisabledForm(!disabledForm);
    // if (disabledForm)
    //   initialForm = {
    //     name: "",
    //     useranme: "",
    //     email: "",
    //     password: "",
    //     newPassword: "",
    //   };
  };

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <div className={style.mainDiv}>
      <div className={style.headDiv}>
        <h3>Profile information.</h3>
        {userInfo.role && (
          <button className={style.changeInfoButton} onClick={ableOrDisableForm}>
            {disabledForm ? "Change profile information" : "Dismiss changes"}
          </button>
        )}
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
                Cancel
              </button>
            </div>
          </div>
        </div>

        {!userInfo.role && (
          <div className={style.loaderContainer}>
            <div className={style.loader}></div>
          </div>
        )}

        <div>
          {userInfo.role && userInfo.role.name === "USER_ROLE" && <BuyerUserInfoForm disabledForm={disabledForm} />}
          {userInfo.role && userInfo.role.name === "SELLER_ROLE" && <BuyerUserInfoForm disabledForm={disabledForm} />}
        </div>
        <div>
          {userInfo.role && userInfo.role.name === "SELLER_ROLE" && <BeASeller />}
          {/* {userInfo.role && userInfo.role.name === "SELLER_ROLE" && <SellerUserInfoForm disabledForm={disabledForm} />} */}
        </div>
        {/* <button onClick={() => console.log(userInfo.role.name)}>PRUEBA</button> */}
      </div>
    </div>
  );
}
