
import style from './SigInGoogle.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { setUserGoogle } from '../../redux/actions';
import { Navigate } from 'react-router-dom';

export default function SignInGoogle () {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    function handleCallbackResponse (response) {
        dispatch(setUserGoogle(response.credential))
        // localStorage.setItem('user', JSON.stringify(jwt_decode(response.credential)))
        document.getElementById('sigInDiv').hidden = true
    }
    //pruebaDeploy
    useEffect(() => {
        window.google && window.google.accounts.id.initialize( {
            client_id: '98217127170-vfi6dqi6v82dhj9704ra9gb2go8n6q7l.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });
        window.google && Object.keys(user).length === 0 && window.google.accounts.id.renderButton(
            document.getElementById('sigInDiv'),
            { theme: 'outline', size: 'large' }
        );
        window.google && Object.keys(user).length === 0 && window.google.accounts.id.prompt()
    }, [])
    const handleSignOut = () => {
        // setUser({})
        dispatch(setUserGoogle({}))
        document.getElementById('sigInDiv').hidden = false
    }
    return (
        <div className={style.contsigin}>
            <div>
                <h5>Or continue with</h5>
            </div>
            <div id='sigInDiv'></div>
        </div>
    )
}