import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../redux/actions';
// import { Toaster, toast } from 'react-hot-toast';
import style from './index.module.css';


export default function LogInForm({LogIn, error}) {
    const dispatch = useDispatch();
    const userRedux = useSelector(state => state.user);
    const errorRedux = useSelector(state => state.errors)

    const [user, setUser] = useState({email_user: "", password: ""});
    const handleUser = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const submitHandler = e => {
        e.preventDefault();
        dispatch(logIn(user))
    }
    
  return (
    <div className={style.contForm}>
        {/* <button onClick={() => {console.log(Object.keys(errorRedux).length)}}>PRUEBA</button> */}
        <form onSubmit={submitHandler}>
            <div className={style.form}>
                <h2>Account Login</h2>
                <div>
                    <label htmlFor="email_user">Email or Username: </label>
                    <br></br>
                    <input className={style.input} name="email_user" id="email" onChange={handleUser}/>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <br></br>
                    <input className={style.input} type="password" name="password" id="password" onChange={handleUser}/>
                </div>
                <input className={style.button} type="submit" value="Log In" />
            </div>
        </form>
        <div  className={style.link}>
            <Link to='/signup' className={style.p}>
                <p>Create a new account</p>
            </Link>
        </div>
        {
            Object.keys(userRedux).length !== 0 && <Navigate to='/'/> 
        }
    </div>
  )
}