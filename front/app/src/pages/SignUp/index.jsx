import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postUser } from "../../redux/actions";
import "./index.modules.css";

export default function SignUp() {
 const dispatch = useDispatch();

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

 // eslint-disable-next-line
 const emailRE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 const validEmail = emailRE.test(email);

 function onInputChangeHandler(e) {
  if (e.target.id === "name") {
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
  if (e.target.id === "name") {
   setNameBlur(true);
  } else if (e.target.id === "username") {
   setUsernameBlur(true);
  } else if (e.target.id === "email") {
   setEmailBlur(true);
  } else if (e.target.id === "password") {
   setPasswordBlur(true);
  } else if (e.target.id === "confirmedpassword") {
   setConfirmedPasswordBlur(true);
  }
 }

 const submitHandler = (e) => {
  e.preventDefault();
  setSubmitTry(true);
  if (name && username && email && password && confirmedPassword) {
   let newUser = { name, username, email, password };
   //  console.log(newUser);
   dispatch(postUser(newUser));
  }
 };

 //  useEffect(() => {
 //   console.log(validEmail);
 //  });

 return (
  <div className="general-div">
   <header className="header">--------------</header>

   <main className="main-div">
    <div className="register">Register Page</div>

    <form onSubmit={submitHandler} className="form">
     <label htmlFor="name">
      {"First name: \n"}
      {nameBlur && name.length <= 2 ? (
       <p style={{ display: "inline", color: "red" }}>
        *Your name should have more than 2 digits.
       </p>
      ) : null}
      <input
       type="text"
       id="name"
       onChange={onInputChangeHandler}
       onBlur={onBlurHandler}
      />
     </label>

     <label htmlFor="username">
      {"User name: \n"}
      {usernameBlur && username.length <= 6 ? (
       <p style={{ display: "inline", color: "red" }}>
        *User name should have more than 6 digits.
       </p>
      ) : null}
      <input
       type="text"
       id="username"
       onChange={onInputChangeHandler}
       onBlur={onBlurHandler}
      />
     </label>

     <label htmlFor="email">
      {"Email: \n"}
      {emailBlur && !validEmail ? (
       <p style={{ display: "inline", color: "red" }}>
        *You have written an invalid e-mail.
       </p>
      ) : null}
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
       <p style={{ display: "inline", color: "red" }}>
        *Password should have more than 6 digits.
       </p>
      ) : null}
      <input
       type="text"
       id="password"
       onChange={onInputChangeHandler}
       onBlur={onBlurHandler}
      />
     </label>

     <label htmlFor="confirmedpassword">
      {`Confirm password: \n`}
      {confirmedPasswordBlur && password !== confirmedPassword ? (
       <p style={{ display: "inline", color: "red" }}>
        *Both passwords should match!
       </p>
      ) : null}
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
