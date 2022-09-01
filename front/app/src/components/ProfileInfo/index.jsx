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

  // FORM INFO
  const [formInfo, setFormInfo] = useState({
    useranme: "",
    email: "",
    password: "",
    newPassword: "",
    name: "",
    lastname: "",
    dni: "",
    phone: "",
    direction: "",
    gender: "",
    street: "",
    zipcode: "",
    country: "",
    state: "",
    city: "",
    birthdayDate: "",
  });

  const showProfPicDiv = () => {
    setProfPicDivVisibility(!profPicDivVisibility);
  };

  const changeProfilePic = () => {
    urlRegExp.test(newImgUrl) && dispatch(putUserImage(newImgUrl, user.uid));
  };

  const ableOrDisableForm = () => {
    setDisabledForm(!disabledForm);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formInfo);
  };

  useEffect(() => {
    dispatch(getUserInfo(user.uid));
  }, [dispatch, user.uid]);

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
        <form className={style.infoForm}>
          {disabledForm ? (
            <div className={style.formContainerDiv}>
              <div className={style.formSectionOne}>
                <div>
                  <label htmlFor="username">Username</label>
                  <br />
                  <input id="username" type="text" placeholder={user.username} className={style.formInput} disabled />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <br />
                  <input id="email" type="text" placeholder={user.email} className={style.formInput} disabled />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <br />
                  <input id="password" type="text" placeholder="password" className={style.formInput} disabled />
                </div>
                <div>
                  <label htmlFor="newPassword">New Password</label>
                  <br />
                  <input id="newPassword" type="text" placeholder="newPassword" className={style.formInput} disabled />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="name">Name</label>
                  <br />
                  <input id="name" type="text" placeholder={user.name} className={style.formInput} disabled />
                  lastname: "", dni: "", phone: "", direction: "", gender: "", street: "", zipcode: "", country: "", state: "", city: "", birthdayDate: "",
                </div>
                <div>
                  <label htmlFor="lastname">Last Name</label>
                  <br />
                  <input id="lastname" type="text" placeholder={user.name} className={style.formInput} disabled />
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <div className={style.formContainerDiv}>
              <div className={style.formSectionOne}>
                <div>
                  <label htmlFor="username">Username</label>
                  <br />
                  <input id="username" type="text" placeholder={user.username} className={style.formInput} />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <br />
                  <input id="email" type="text" placeholder={user.email} className={style.formInput} />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <br />
                  <input id="password" type="text" placeholder="password" className={style.formInput} />
                </div>
                <div>
                  <label htmlFor="newPassword">New Password</label>
                  <br />
                  <input id="newPassword" type="text" placeholder="newPassword" className={style.formInput} />
                </div>
              </div>
              <div className={style.formSectionTwo}>
                <div>
                  <label htmlFor="name">Name</label>
                  <br />
                  <input id="name" type="text" placeholder={user.name} className={style.formInput} />
                </div>
                <button type="submit"></button>
              </div>
            </div>
          )}
          {/* {Object.entries(user).map((kv) => {
              let key = kv[0];
              let keyMayusLetter = key[0].toUpperCase() + key.substring(1);
              let value = kv[1];
              if (!value || key === "uid" || key === "roleId" || key === "name" || key === "email") return <></>;
              return (
                <div key={keyMayusLetter}>
                  <label htmlFor={key}>{keyMayusLetter}</label>
                  <br />
                  <input id={key} type="text" placeholder={value} value={value} className={style.formInput} disabled />
                </div>
              );
            })}
            {Object.entries(userInfo).map((kv) => {
              let key = kv[0];
              let keyMayusLetter = key[0].toUpperCase() + key.substring(1);
              let value = kv[1];
              if (!value || key === "google" || key === "status") return <></>;
              return (
                <div key={keyMayusLetter}>
                  <label htmlFor={key}>{keyMayusLetter}</label>
                  <br />
                  <input id={key} type="text" placeholder={value} value={value} className={style.formInput} disabled />
                </div>
              );
            })} */}
        </form>
        {/* {Object.entries(user).map((kv) => {
              let key = kv[0];
              let keyMayusLetter = key[0].toUpperCase() + key.substring(1);
              let value = kv[1];
              if (!value || key === "uid" || key === "roleId" || key === "name" || key === "email") return <></>;
              return (
                <div key={keyMayusLetter}>
                  <label htmlFor={key}>{keyMayusLetter}</label>
                  <br />
                  <input id={key} type="text" placeholder={value} className={style.formInput} />
                </div>
              );
            })}
            {Object.entries(userInfo).map((kv) => {
              let key = kv[0];
              let keyMayusLetter = key[0].toUpperCase() + key.substring(1);
              let value = kv[1];
              if (!value || key === "google" || key === "status") return <></>;
              return (
                <div key={keyMayusLetter}>
                  <label htmlFor={key}>{keyMayusLetter}</label>
                  <br />
                  <input id={key} type="text" placeholder={value} className={style.formInput} />
                </div>
              );
            })} */}
      </div>
    </div>
  );
}
