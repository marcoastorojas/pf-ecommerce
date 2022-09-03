import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeOtherUserRol, changeUserStatus } from '../../../redux/actions';
import style from './UsersCards.module.css';








export default function UsersCards ({image, email, status, username, rol, uid}) {

    const dispatch = useDispatch()
    const estado = status?.toString()==='true'?'true':'false'
    const [ newRol, setNewRol ] = useState(rol)
    const [ newStatus, setNewStatus ] = useState(estado)

    const changeSelectedRol = (e) => {
        setNewRol(e.target.value)
    }
    const changeRol = () => {
        dispatch(changeOtherUserRol(uid, newRol))
    }

    const changeSelectedStatus = (e) => {
        setNewStatus(e.target.value)
    }
    const changeStatus = () => {
        dispatch(changeUserStatus(uid, newStatus === 'true'))
    }


    return(
        <div className={style.contUserCard}>
            {/* <button onClick={() => console.log(estado)}>PRUEBA</button> */}
            {/* <button onClick={() => console.log(newStatus)}>PRUEBASTATUS</button> */}
            <div className={style.divImagen}>
                <p>{image}</p>
            </div>
            <div className={style.divBasicInfo}>
                <p>{username}</p>
                <p>{email}</p>
            </div>
            <div className={style.divRol}>
                <p>{rol}</p>
                <select name="rol" id="rol" onChange={changeSelectedRol}>
                    <option value='predef' hidden>{rol}</option>
                    <option value="SELLER_ROLE">Seller</option>
                    <option value="USER_ROLE">User</option>
                    <option value="ADMIN_ROLE">Admin</option>
                </select>
                <button onClick={changeRol}>Change rol</button>
            </div>
            <div className={style.divStatus}>
                <p>{estado==='true'?'Activo':'Inactivo'}</p>
                <select name="status" id="status" onChange={changeSelectedStatus}>
                    <option value="predef" hidden>{estado==='true'?'Activo':'Inactivo'}</option>
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                </select>
                <button onClick={changeStatus}>{estado==='true'?'Delete':'Activate'}</button>
            </div>
            <div className={style.divExtraInfo}>

            </div>
            {/* <p>{uid}</p> */}
        </div>
    )
}