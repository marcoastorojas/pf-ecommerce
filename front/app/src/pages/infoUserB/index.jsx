import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserComponentContainer from "../../components/UserComponentContainer";
import UserInfoSideBar from "../../components/UserInfoSideBar";
import { getUserInfo } from "../../redux/actions";

import style from "./index.module.css";

export default function InfoUserB() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserInfo(user.uid));
  });

  return (
    <main className={style.mainDiv}>
      <UserInfoSideBar />
      <UserComponentContainer />
    </main>
  );
}
