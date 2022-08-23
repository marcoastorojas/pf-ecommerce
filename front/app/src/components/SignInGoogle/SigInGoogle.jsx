
import style from './SigInGoogle.module.css';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

export default function SignInGoogle () {
    // const google = window.google
    const [ user, setUser ] = useState({})
    function handleCallbackResponse (response) {
        setUser(jwt_decode(response.credential))
        document.getElementById('sigInDiv').hidden = true
    }
    useEffect(() => {
        window.google && window.google.accounts.id.initialize( {
            client_id: '98217127170-vfi6dqi6v82dhj9704ra9gb2go8n6q7l.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });
        window.google && window.google.accounts.id.renderButton(
            document.getElementById('sigInDiv'),
            { theme: 'outline', size: 'large' }
        );
        window.google && window.google.accounts.id.prompt()
    }, [])
    const handleSignOut = () => {
        setUser({})
        document.getElementById('sigInDiv').hidden = false
    }
    // const PRUEBA = () => {
    //     console.log(user)
    // }
    return (
        <div className={style.contsigin}>
            {/* <button onClick={PRUEBA}>PRUEBA</button> */}
            <div id='sigInDiv'></div>
            {user && 
            <div>
                <img src={user.picture}></img>
                <p>{user.name}</p>
            </div>}
            {
                Object.keys(user).length !== 0 &&
                <button onClick={handleSignOut}>Sign Out</button>
            }
        </div>
    )
}