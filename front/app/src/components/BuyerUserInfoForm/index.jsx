import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putNewPassword, putNewUserInfo, verifyCurrentPassword } from "../../redux/actions";

import style from "./index.module.css";

import greenCheckmark from "../../media/svg/green_checkmark_icon.svg";
import redX from "../../media/svg/red_x_icon.svg";
import toast from "react-hot-toast";

export default function BuyerUserInfoForm({ disabledForm }) {
  const user = useSelector((state) => state.user);
  const verifyingPassword = useSelector((state) => state.verifyingPassword);
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

  // const [passwordBlur, setPasswordBlur] = useState(false);
  const [newPasswordBlur, setNewPasswordBlur] = useState(false);

  //REGEXP & VALIDATIONS

  const passwordRE = /^(?=.{7,})(?=.*[a-z])(?=.*[A-Z])(?=.*[/*@#$%^&+=]).*$/g;
  const validNewPassword = passwordRE.test(formInfo.newPassword);

  //eslint-disable-next-line
  const emailRE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const validEmail = emailRE.test(formInfo.email);

  const namedRE = /^[a-zA-Z]+$/g;
  const validName = namedRE.test(formInfo.name);

  //HANDLERS

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
          // console.log({ verifiedPassword, validNewPassword, password: formInfo.password, newpassword: formInfo.newPassword });
          let passwordToVerify = e.target.value;
          if (!e.target.value) {
            passwordToVerify = "x";
          }
          dispatch(verifyCurrentPassword(user.uid, passwordToVerify));
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

  function onBlurHandler(e) {
    // if (e.target.id === "password") return setPasswordBlur(true);
    // if (e.target.id === "newPassword") return
    setNewPasswordBlur(true);
  }

  const changePassword = () => {
    console.log({ verifiedPassword, validNewPassword, password: formInfo.password, newpassword: formInfo.newPassword });
    if (verifiedPassword && validNewPassword) {
      dispatch(putNewPassword(user.uid, formInfo.newPassword));
    } else {
      console.log("invalid change");
    }
  };

  const changeUserInfoHandler = (e) => {
    e.preventDefault();

    if (validName && formInfo.name.length <= 40 && formInfo.name.length >= 2 && formInfo.username.length <= 40 && formInfo.username.length >= 7 && validEmail) {
      var newChanges = {};
      if (formInfo.name !== user.name) newChanges = { name: formInfo.name };
      if (formInfo.username !== user.username) newChanges = { ...newChanges, username: formInfo.username };
      if (formInfo.email !== user.email) newChanges = { ...newChanges, email: formInfo.email };

      console.log({ check: newChanges });
      if (Object.entries(newChanges)[0]) {
        console.log({ success: newChanges });
        dispatch(putNewUserInfo(user.uid, newChanges));
      }
    } else if (!Object.entries(newChanges)[0]) {
      toast("There's no change on your information.");
    } else {
      console.log("invalid user data");
      toast.error("There's some invalid input data, check again.");
    }

    /////////////////////////////////////////////////////// OLD CODE

    //const newChanges = {
    //       name: formInfo.name === user.name ? user.name : formInfo.name,
    //       username: formInfo.username === user.username ? user.username : formInfo.username,
    //       email: formInfo.email === user.email ? user.email : formInfo.email,
    //     };

    //   // if (formInfo.name !== user.name) newChanges = { name: formInfo.name };
    //   // if (formInfo.username !== user.username) newChanges = { ...newChanges, username: formInfo.username };
    //   // if (formInfo.email !== user.email) newChanges = { ...newChanges, email: formInfo.email };

    //   console.log({ check: newChanges });
    //   if (
    //     // Object.entries(newChanges)[0] &&
    //     validName &&
    //     newChanges.name.length <= 40 &&
    //     newChanges.name.length >= 2 &&
    //     newChanges.username.length <= 40 &&
    //     newChanges.username.length >= 7 &&
    //     validEmail
    //   ) {
    //     console.log({ succes: newChanges });
    //     dispatch(putNewUserInfo(user.uid, newChanges));
    //     // } else if (!Object.entries(newChanges)[0]) {
    //     //   toast("There's no change on your information.");
    //   } else {
    //     console.log("invalid user data");
    //     toast.error("There's some invalid input data, check again.");
    //   }
    // };
  };

  useEffect(() => {
    // console.log(validNewPassword);
    if (disabledForm) return setFormInfo(initialForm);
    //eslint-disable-next-line
  }, [disabledForm]);

  return (
    <form className={style.infoForm}>
      <div className={style.formContainerDiv}>
        <div className={style.formSectionOne}>
          <div>
            <div className={style.labelAndWarningDiv}>
              <label htmlFor="name">Name</label>
              <div className={!disabledForm && (formInfo.name.length <= 1 || formInfo.name.length > 40 || !validName) ? style.warningDiv2 : style.hiddenWarningDiv2}>
                *Should contain 2-40 digits, being only A-Z letters.
              </div>
            </div>
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
            <div className={style.labelAndWarningDiv}>
              <label htmlFor="username">Username</label>
              <div className={!disabledForm && (formInfo.username.length <= 6 || formInfo.username.length > 40) ? style.warningDiv3 : style.hiddenWarningDiv2}>
                *Should contain 7-40 digits.
              </div>
            </div>
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
            <div className={style.labelAndWarningDiv}>
              <label htmlFor="email">Email</label>
              <div className={!disabledForm && !validEmail ? style.warningDiv4 : style.hiddenWarningDiv2}>*Insert a valid email.</div>
            </div>
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
                <button
                  className={
                    formInfo.name.length <= 1 || formInfo.name.length > 40 || !validName || formInfo.username.length <= 6 || formInfo.username.length > 40 || !validEmail
                      ? style.disabledProfileSaveChangesButton
                      : style.profileSaveChangesButton
                  }
                  type="button"
                  onClick={changeUserInfoHandler}
                  disabled={formInfo.name.length <= 1 || formInfo.name.length > 40 || !validName || formInfo.username.length <= 6 || formInfo.username.length > 40 ? true : false}
                >
                  Save profile changes
                </button>
              </div>
            )}
          </div>
          <div>
            <div className={style.labelAndLoaderContainer}>
              <label htmlFor="password">Password</label>
              <div className={style.loaderContainer}>
                {verifyingPassword === "yes" && !disabledForm ? <div className={style.passwordLoader}></div> : null}
                {verifyingPassword !== "yes" && verifiedPassword && !disabledForm && <img className={style.verifiedSimbol} src={greenCheckmark} alt="green checkmark" />}
                {verifyingPassword !== "yes" && !verifiedPassword && !disabledForm && <img className={style.verifiedSimbol} src={redX} alt="red x" />}
              </div>
            </div>
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
              onBlur={onBlurHandler}
              disabled={disabledForm ? true : false}
            />
          </div>
          <div className={style.changePasswordButtonDiv}>
            {disabledForm ? null : (
              <div>
                <button
                  type="button"
                  className={
                    formInfo.password && formInfo.newPassword && formInfo.password !== formInfo.newPassword && verifiedPassword && validNewPassword
                      ? style.changePasswordButton
                      : style.disabledChangePasswordButton
                  }
                  onClick={changePassword}
                  onBlur={onBlurHandler}
                  disabled={formInfo.password && formInfo.newPassword && formInfo.password !== formInfo.newPassword && validNewPassword ? false : true}
                >
                  Set new password
                </button>
              </div>
            )}
          </div>
          <div className={style.warningDiv}>
            {!disabledForm && validNewPassword && formInfo.newPassword === formInfo.password && (
              <p className={style.warning}>*Your new password can't match yor current password.</p>
            )}
            {!disabledForm && newPasswordBlur && !validNewPassword && (
              <p className={style.warning}>
                *Remember that your password should contain between 8 and 40 digits, one upper and one lower case letter (a-z), a number, and a special character (/*@#$%^&+=).
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
