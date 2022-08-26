import React, { useState } from "react";
import LogInForm from "../../components/LogInForm";
import SignInGoogle from "../../components/SignInGoogle/SigInGoogle.jsx";
import style from './index.module.css';
export default function LogIn() {

 return (
  <div className={style.contLogin}>
        <LogInForm/>
        <SignInGoogle/>
  </div>
 );
}
