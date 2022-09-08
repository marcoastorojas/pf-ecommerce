import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

import { cleanSignupErrors, postUser } from "../../redux/actions";
import SignInGoogle from "../../components/SignInGoogle/SigInGoogle.jsx";

import { Toaster, toast } from "react-hot-toast";

import style from "./index.module.css";

export default function SignUp() {
  const userRedux = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Cambiar título
  useEffect(() => {
    document.title = "Sign up";
  }, []);

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

  //crea el mensaje del toast dependiendo de los errores
  const toastMessage = () => {
    const { email: emailError, username: usernameError } = signupErrors;
    let message;
    if (emailError) message = `email: ${emailError}`;
    if (usernameError) message = message + `\n username: ${usernameError}`;
    return message;
  };

  //muestra los toast de error y limpia los errores al desmontarse
  useEffect(() => {
    // signupResponse.username === username && toast.success("Signup succesfull!", { duration: 6000 });

    // signupErrors &&
    //   toast.error(toastMessage(), {
    //     duration: 9000,
    //   });
    return function cleanse() {
      dispatch(cleanSignupErrors());
    };
    // eslint-disable-next-line
  }, [signupErrors]);

  //redirecciona a /login si es exitoso el signup
  signupResponse.username === username && navigate("/login");

  return (
    <div className={style.container}>
      <main className={style.mainDiv}>
        {/* <Toaster /> */}
        <h2 className={style.register}>Register Page</h2>

        <form onSubmit={submitHandler} className={style.form}>
          <div className={style.formDiv}>
            <label htmlFor="name">First name:</label>
            {nameBlur && (name.length <= 1 || name.length > 40 || !validName) ? (
              <p style={{ display: "inline", color: "red", fontSize: 14 }}>*Your name should have between 2 and 40 digits, and contain only a-z letters.</p>
            ) : null}
            <br />
            <input type="text" id="name" onChange={onInputChangeHandler} onBlur={onBlurHandler} />
            <br />

            <label htmlFor="username">User name:</label>
            {usernameBlur && (username.length <= 6 || username.length > 40) ? (
              <p style={{ display: "inline", color: "red", fontSize: 14 }}>*User name should have between 7 and 40 digits.</p>
            ) : null}
            <br />
            <input type="text" id="username" onChange={onInputChangeHandler} onBlur={onBlurHandler} />
            <br />

            <label htmlFor="email">Email:</label>
            {emailBlur && !validEmail ? <p style={{ display: "inline", color: "red", fontSize: 14 }}>*You have written an invalid e-mail.</p> : null}
            <br />
            <input type="text" id="email" onChange={onInputChangeHandler} onBlur={onBlurHandler} />
            <br />

            <label htmlFor="password">Password:</label>
            {passwordBlur && (password.length <= 8 || password.length > 40 || !validPassword) ? (
              <p style={{ display: "inline", color: "red", fontSize: 14 }}>
                *Password should contain between 8 and 40 digits, one upper and one lower case letter (a-z), a number, and a special character (/*@#$%^&+=).
              </p>
            ) : null}
            <br />
            <input type="text" id="password" onChange={onInputChangeHandler} onBlur={onBlurHandler} />
            <br />

            <label htmlFor="confirmedpassword">Confirm password:</label>
            {confirmedPasswordBlur && password !== confirmedPassword ? <p style={{ display: "inline", color: "red", fontSize: 14 }}>*Both passwords should match!</p> : null}
            <br />
            <input type="text" id="confirmedpassword" onChange={onInputChangeHandler} onBlur={onBlurHandler} />
            <br />

            {submitTry && (!name || !username || !email || !password || !confirmedPassword) && <p style={{ color: "red" }}>All fields must be filled!</p>}
            <button type="submit" className={style.submitButton}>
              Register
            </button>
          </div>
        </form>

        <div className={style.signInGoogle}>
          <SignInGoogle />
        </div>
        {
          signupResponse.username === username && <Navigate to='/login'/>
        }
      </main>
      {
            Object.keys(userRedux).length !== 0 && <Navigate to='/'/> 
        }
    </div>
  );
}
