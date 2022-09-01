import { useState } from "react";
import { useSelector } from "react-redux";

import style from "./index.module.css";

export default function BuyerUserInfoForm({ disabledForm }) {
  const user = useSelector((state) => state.user);

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

  const changePassword = () => {
    console.log({ p: formInfo.password, np: formInfo.newPassword });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form className={style.infoForm}>
      {disabledForm ? (
        <div className={style.formContainerDiv}>
          <div className={style.formSectionOne}>
            <div>
              <label htmlFor="name">Name</label>
              <br />
              <input id="name" type="text" placeholder={user.name} value={user.name} className={style.formInput} disabled />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <br />
              <input id="username" type="text" placeholder={user.username} value={user.username} className={style.formInput} disabled />
            </div>
            <div className={style.emailInputDiv}>
              <label htmlFor="email">Email</label>
              <br />
              <input id="email" type="text" placeholder={user.email} value={user.email} className={style.formInput} disabled />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <br />
              <input id="password" type="text" placeholder="password" value={user.password} className={style.formInput} disabled />
            </div>
            <div>
              <label htmlFor="newPassword">New Password</label>
              <br />
              <input id="newPassword" type="text" placeholder="newPassword" value={user.newPassword} className={style.formInput} disabled />
            </div>
            <button type="button" onClick={changePassword}></button>
          </div>
        </div>
      ) : (
        <div className={style.formContainerDiv}>
          <div className={style.formSectionOne}>
            <div>
              <label htmlFor="name">Name</label>
              <br />
              <input id="name" type="text" placeholder={user.name} value={user.name} className={style.formInput} />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <br />
              <input id="username" type="text" placeholder={user.username} value={user.username} className={style.formInput} />
            </div>
            <div className={style.emailInputDiv}>
              <label htmlFor="email">Email</label>
              <br />
              <input id="email" type="text" placeholder={user.email} value={user.email} className={style.formInput} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <br />
              <input id="password" type="text" placeholder="password" value={user.password} className={style.formInput} />
            </div>
            <div>
              <label htmlFor="newPassword">New Password</label>
              <br />
              <input id="newPassword" type="text" placeholder="newPassword" value={user.newPassword} className={style.formInput} />
            </div>
            <button type="button" onClick={changePassword}></button>
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
  );
}
/* {Object.entries(user).map((kv) => {
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
            })} */
