import React from "react";

import UserComponentContainer from "../../components/UserComponentContainer";
import UserInfoSideBar from "../../components/UserInfoSideBar";

import style from "./index.module.css";

export default function InfoUserB() {
  return (
    <main className={style.mainDiv}>
      <UserInfoSideBar />
      <UserComponentContainer />
    </main>
  );
}
