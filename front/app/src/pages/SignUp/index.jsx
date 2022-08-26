import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { cleanSignupErrors, postUser } from "../../redux/actions";
import SignInGoogle from "../../components/SignInGoogle/SigInGoogle.jsx";

import { Toaster, toast } from "react-hot-toast";

import "./index.modules.css";

export default function SignUp() {
 const dispatch = useDispatch();
 const navigate = useNavigate();

 //estados del form
 const [name, setName] = useState("");
 const [username, setUsername] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [confirmedPassword, setConfirmedPassword] = useState("");

 //name reg exp
 // eslint-disable-next-line
 const namedRE = /^[a-zA-Z]+$/g;
 const validName = namedRE.test(name);

 //email reg exp
 // eslint-disable-next-line
 const emailRE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 const validEmail = emailRE.test(email);

 //password reg exp
 // eslint-disable-next-line
 const passwordRE = /^(?=.{7,})(?=.*[a-z])(?=.*[A-Z])(?=.*[/*@#$%^&+=]).*$/g;
 const validPassword = passwordRE.test(password);

 //indica si el botón de submit ya fue presionado al menos una vez
 const [submitTry, setSubmitTry] = useState(false);

 //estados que regulan si los inputs pierden foco (onBlur)
 const [nameBlur, setNameBlur] = useState(false);
 const [usernameBlur, setUsernameBlur] = useState(false);
 const [emailBlur, setEmailBlur] = useState(false);
 const [passwordBlur, setPasswordBlur] = useState(false);
 const [confirmedPasswordBlur, setConfirmedPasswordBlur] = useState(false);

 //estados globales
 const signupResponse = useSelector((state) => state.signupResponse);
 const signupErrors = useSelector((state) => state.signupErrors);

 //actualiza los estados del form
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

 //reacciona al onBlur de los inputs
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

 // reacciona al submit
 // valida los campos antes de enviar y setea en true el intento de submit
 const submitHandler = (e) => {
  e.preventDefault();
  setSubmitTry(true);

  if (
   name.length <= 40 &&
   name.length >= 2 &&
   validName &&
   username.length <= 40 &&
   username.length >= 7 &&
   email &&
   validEmail &&
   password &&
   password.length >= 8 &&
   password.length <= 40 &&
   validPassword &&
   confirmedPassword === password
  ) {
   let newUser = { name, username, email, password, role: "USER_ROLE" };
   dispatch(postUser(newUser));
   //  console.log(newUser);
  }
 };

 useEffect(() => {
  signupErrors &&
   toast.error(
    // (t) => {
    //  <span>
    //   <p>{toastMessage()}</p>
    //   <button>X</button>
    //  </span>;
    // },
    toastMessage(),
    {
     duration: 10000,
    }
   );
  return function cleanse() {
   dispatch(cleanSignupErrors());
  };
  // eslint-disable-next-line
 }, [signupErrors]);

 const toastMessage = () => {
  const { email: emailError, username: usernameError } = signupErrors;
  let message;
  if (emailError) message = `email: ${emailError}`;
  if (usernameError) message = message + `\n username: ${usernameError}`;
  return message;
 };

 signupResponse.username === username && navigate("/login");

 return (
  <div className="general-div">
   <main className="main-div">
    <Toaster />
    <div className="register">Register Page</div>

    <form onSubmit={submitHandler} className="form">
     <label htmlFor="name">
      {"First name: \n"}
      {nameBlur && (name.length <= 1 || name.length > 40 || !validName) ? (
       <p style={{ display: "inline", color: "red", fontSize: 14 }}>
        *Your name should have between 2 and 40 digits, and contain only a-z
        letters.
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
      {usernameBlur && (username.length <= 6 || username.length > 40) ? (
       <p style={{ display: "inline", color: "red", fontSize: 14 }}>
        *User name should have between 7 and 40 digits.
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
       <p style={{ display: "inline", color: "red", fontSize: 14 }}>
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
      {passwordBlur &&
      (password.length <= 8 || password.length > 40 || !validPassword) ? (
       <p style={{ display: "inline", color: "red", fontSize: 14 }}>
        "*Password should contain between 8 and 40 digits, one upper and one
        lower case letter (a-z), a number, and a special character
        (/*@#$%^&+=)."
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
       <p style={{ display: "inline", color: "red", fontSize: 14 }}>
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
       <p style={{ color: "red" }}>All fields must be filled!</p>
      )}
     <button type="submit"> Register </button>
    </form>
    <div>
     <SignInGoogle />
    </div>
   </main>

   <footer className="footer"></footer>
  </div>
 );
}
