import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyCurrentPassword } from "../../redux/actions";

import style from "./index.module.css";

export default function BuyerUserInfoForm({ disabledForm }) {
  const user = useSelector((state) => state.user);
  const verifiedPassword = useSelector((state) => state.verifiedPassword);

  const dispatch = useDispatch();

  // FORM INFO
  const initialForm = {
    name: user.name,
    username: user.username,
    email: user.email,
    password: "",
    newPassword: "",
  };
  const [formInfo, setFormInfo] = useState(initialForm);

  function handleFormChange(e) {
    switch (e.target.id) {
      case "name":
        return setFormInfo((prevState) => {
          return { ...prevState, name: e.target.value };
        });
      case "username":
        return setFormInfo((prevState) => {
          return { ...prevState, username: e.target.value };
        });
      case "email":
        return setFormInfo((prevState) => {
          return { ...prevState, email: e.target.value };
        });
      case "password":
        return setFormInfo((prevState) => {
          dispatch(verifyCurrentPassword(user.uid, e.target.value));
          return { ...prevState, password: e.target.value };
        });
      case "newPassword":
        return setFormInfo((prevState) => {
          return { ...prevState, newPassword: e.target.value };
        });
      default:
        return console.log("no form input id on switch");
    }
  }

  const changePassword = () => {
    console.log(formInfo);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formInfo);
  };

  useEffect(() => {
    console.log(verifiedPassword);
    if (disabledForm) return setFormInfo(initialForm);
    //eslint-disable-next-line
  }, [disabledForm]);

  return (
    <form className={style.infoForm}>
      <div className={style.formContainerDiv}>
        <div className={style.formSectionOne}>
          <div>
            <label htmlFor="name">Name</label>
            <br />
            <input
              id="name"
              type="text"
              placeholder={disabledForm ? user.name : null}
              value={formInfo.name}
              className={style.formInput}
              onChange={handleFormChange}
              disabled={disabledForm ? true : false}
            />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <br />
            <input
              id="username"
              type="text"
              placeholder={user.username}
              value={formInfo.username}
              className={style.formInput}
              onChange={handleFormChange}
              disabled={disabledForm ? true : false}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input
              id="email"
              type="text"
              placeholder={user.email}
              value={formInfo.email}
              className={style.formInput}
              onChange={handleFormChange}
              disabled={disabledForm ? true : false}
            />
          </div>
          <div className={style.saveChangesButtonDiv}>
            {disabledForm ? null : (
              <div>
                <button className={style.profileSaveChangesButton} type="button" onClick={submitHandler}>
                  Save profile changes
                </button>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input
              id="password"
              type="text"
              placeholder="Current password"
              value={disabledForm ? "" : null}
              className={style.formInput}
              onChange={handleFormChange}
              disabled={disabledForm ? true : false}
            />
          </div>
          <div>
            <label htmlFor="newPassword">New Password</label>
            <br />
            <input
              id="newPassword"
              type="text"
              // placeholder="New password"
              value={disabledForm ? "" : null}
              className={style.formInput}
              onChange={handleFormChange}
              disabled={disabledForm ? true : false}
            />
          </div>
          <button type="button" onClick={changePassword}></button>
        </div>
      </div>

      {/*  OLD ABLE FORM
      //   <div className={style.formContainerDiv}>
      //     <div className={style.formSectionOne}>
      //       <div>
      //         <label htmlFor="name">Name</label>
      //         <br />
      //         <input id="name" type="text" placeholder={user.name} className={style.formInput} onChange={handleFormChange} />
      //       </div>
      //       <div>
      //         <label htmlFor="username">Username</label>
      //         <br />
      //         <input id="username" type="text" placeholder={user.username} className={style.formInput} onChange={handleFormChange} />
      //       </div>
      //       <div className={style.emailInputDiv}>
      //         <label htmlFor="email">Email</label>
      //         <br />
      //         <input id="email" type="text" placeholder={user.email} className={style.formInput} onChange={handleFormChange} />
      //       </div>
      //       <div>
      //         <label htmlFor="password">Password</label>
      //         <br />
      //         <input id="password" type="text" placeholder="password" className={style.formInput} onChange={handleFormChange} />
      //       </div>
      //       <div>
      //         <label htmlFor="newPassword">New Password</label>
      //         <br />
      //         <input id="newPassword" type="text" placeholder="newPassword" className={style.formInput} onChange={handleFormChange} />
      //       </div>
      //       <button type="button" onClick={changePassword}></button>
      //     </div>
      //   </div> */}
    </form>
  );
}
