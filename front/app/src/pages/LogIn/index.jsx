import React, { useEffect } from "react";
import LogInForm from "../../components/LogInForm";
import SignInGoogle from "../../components/SignInGoogle/SigInGoogle.jsx";
import style from './index.module.css';
export default function LogIn() {
      useEffect(() => {
            document.title = 'Log In'
      }, [])
 return (
  <div className={style.contLogin}>
        <LogInForm/>
        <SignInGoogle/>
  </div>
 );
}
