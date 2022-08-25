import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../redux/actions';
import { Toaster, toast } from 'react-hot-toast';

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
    <div>
        <button onClick={() => {console.log(Object.keys(errorRedux).length)}}>PRUEBA</button>
      <form onSubmit={submitHandler}>
        <div className="form-inner">
            <h2>Log In</h2>
            {/* {(error !== "") ? (<div className="error">{error}</div>) : ""} */}
            <div className="form-group">
                <label htmlFor="email_user">Email: </label>
                <input name="email_user" id="email" onChange={handleUser}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" onChange={handleUser}/>
            </div>
            <input type="submit" value="LOGIN" />
        </div>
        </form>
        {
            Object.keys(userRedux).length !== 0 && <Navigate to='/'/> 
        }
        <Toaster/>
    </div>
  )
}