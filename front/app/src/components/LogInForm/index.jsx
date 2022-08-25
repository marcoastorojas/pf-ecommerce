import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../redux/actions';

export default function LogInForm({LogIn, error}) {
    const dispatch = useDispatch();
    const pepe = useSelector(state => state.user)

    const [user, setUser] = useState({email_user: "", password: ""});
    const handleUser = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const submitHandler = e => {
        e.preventDefault();
        // LogIn(details);
        console.log(user)
        dispatch(logIn(user))
        // localStorage.setItem('user', JSON.stringify(pepe))
    }

  return (
    <div>
        <button onClick={() => {console.log('userLocalStorage: ', pepe); console.log('user form:', user)}}>PRUEBA</button>
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
        <Link to={"/"}><button>Back to Home</button></Link>
    </form>
    </div>
  )
}