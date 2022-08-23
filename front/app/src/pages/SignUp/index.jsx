import { useState, useEffect } from "react";
import "./index.modules.css";

export default function SignUp() {
 const [name, setName] = useState("");
 const [username, setUsername] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [confirmedPassword, setConfirmedPassword] = useState("");

 const [submitTry, setSubmitTry] = useState(false);

 const [nameBlur, setNameBlur] = useState(false);
 const [usernameBlur, setUsernameBlur] = useState(false);
 const [emailBlur, setEmailBlur] = useState(false);
 const [passwordBlur, setPasswordBlur] = useState(false);
 const [confirmedPasswordBlur, setConfirmedPasswordBlur] = useState(false);

 function onInputChangeHandler(e) {
  if (e.target.id === "firstname") {
   setName(e.target.value);
  } else if (e.target.id === "username") {
   setUsername(e.target.value);
  } else if (e.target.id === "email") {
   setEmail(e.target.value);
  } else if (e.target.id === "password") {
   setPassword(e.target.value);
  } else if (e.target.id === "confirmedpassword") {
   setConfirmedPassword(e.target.value);
  }
 }

 function onBlurHandler(e) {
  // if (e.target.id === "firstname") {
  //  setName(e.target.value);
  // } else
  // if (e.target.id === "username") {
  //  setUsername(e.target.value);
  // } else
  // if (e.target.id === "email") {
  //  setEmail(e.target.value);
  // } else
  if (e.target.id === "password") {
   setPasswordBlur(true);
  } else if (e.target.id === "confirmedpassword") {
   setConfirmedPasswordBlur(true);
  }
 }

 const submitHandler = (e) => {
  e.preventDefault();
  setSubmitTry(true);
  if (name && username && email && password && confirmedPassword) {
   let newUser = { name, username, email, password, confirmedPassword };
   console.log(newUser);
  }
 };

 useEffect(() => {
  console.log(passwordBlur);
 }, []);

 return (
  <div className="general-div">
   <header className="header">--------------</header>

   <main className="main-div">
    <div className="register">Register Page</div>

    <form onSubmit={submitHandler} className="form">
     <label htmlFor="firstname">
      {"First name: \n"}
      <input type="text" id="firstname" onChange={onInputChangeHandler} />
     </label>

     <label htmlFor="username">
      {"User name: \n"}
      <input type="text" id="username" onChange={onInputChangeHandler} />
     </label>

     <label htmlFor="email">
      {"Email: \n"}
      <input
       type="text"
       id="email"
       onChange={onInputChangeHandler}
       onBlur={onBlurHandler}
      />
     </label>

     <label htmlFor="password">
      {"Password: \n"}
      {passwordBlur && password.length <= 6 ? (
       <p>Password should have more than 6 digits</p>
      ) : null}
      <input
       type="text"
       id="password"
       onChange={onInputChangeHandler}
       onBlur={onBlurHandler}
      />
     </label>

     <label htmlFor="confirmedpassword">
      {`Confirm password: ${
       confirmedPasswordBlur && password !== confirmedPassword
        ? "Both passwords should match!"
        : ""
      }\n`}
      <input
       type="text"
       id="confirmedpassword"
       onChange={onInputChangeHandler}
       onBlur={onBlurHandler}
      />
     </label>

     {submitTry &&
      (!name || !username || !email || !password || !confirmedPassword) && (
       <p>All fields must be filled!</p>
      )}
     <button type="submit"> Register </button>
    </form>
   </main>

   <footer className="footer"></footer>
  </div>
 );
}
