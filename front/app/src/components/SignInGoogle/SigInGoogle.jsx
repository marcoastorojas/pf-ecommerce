
import style from './SigInGoogle.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { setUserGoogle } from '../../redux/actions';
import { Navigate } from 'react-router-dom';
import { gapi } from 'gapi-script';
import GoogleLogin from 'react-google-login';


export default function SignInGoogle() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const clientID = "417222371026-r77ea9el6hem23ioc9u51284pe3aq5u1.apps.googleusercontent.com"
    function handleCallbackResponse(response) {
        dispatch(setUserGoogle(response.tokenId))
        localStorage.setItem('user', JSON.stringify(jwt_decode(response.tokenId)))
        document.getElementById('sigInDiv').hidden = true
    }
    //pruebaDeploy
    useEffect(() => {
        const start = () => {
            gapi.auth2.init({
                clientId: clientID
            })
        }
        gapi.load("client:auth2", start)

    }, [])
    const handleSignOut = () => {
        // setUser({})
        dispatch(setUserGoogle({}))
        // document.getElementById('sigInDiv').hidden = false
    }
    return (
        <div className={style.contsigin} id="sigInDiv">
            <div>
                <h5>Or continue with</h5>
            </div>
            <GoogleLogin
                clientId={clientID}
                onSuccess={handleCallbackResponse}
                onFailure={(data) => { console.log({ error: data }) }}
            />
        </div>
    )
}