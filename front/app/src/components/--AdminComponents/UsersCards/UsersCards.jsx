import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeOtherUserRol } from '../../../redux/actions';
import style from './UsersCards.module.css';








export default function UsersCards ({image, email, status, username, rol, uid}) {

    const dispatch = useDispatch()
    const estado = status?.toString()
    const [ newRol, setNewRol ] = useState(rol)

    const changeSelectedRol = (e) => {
        setNewRol(e.target.value)
    }


    const changeRol = () => {
        dispatch(changeOtherUserRol(uid, newRol))
    }


    return(
        <div className={style.contUserCard}>
            SOY EL USERSCARDS
            <button onClick={() => console.log(newRol)}>PRUEBA</button>
            <p>{image}</p>
            <p>{email}</p>
            <p>{estado}</p>
            <p>{username}</p>
            <p>{rol}</p>
            {/* <p>{uid}</p> */}
            <select name="rol" id="rol" onChange={changeSelectedRol}>
                <option value='predef' hidden>{rol}</option>
                <option value="SELLER_ROLE">SELLER</option>
                <option value="USER_ROLE">USER</option>
                <option value="ADMIN_ROLE">ADMIN</option>
            </select>
            <button onClick={changeRol}>{estado==='true'?'Delete':'Activate'}</button>
            <button>{rol!=='ADMIN_ROLE'?'Upgrade to Admin':'Degrade'}</button>
        </div>
    )
}