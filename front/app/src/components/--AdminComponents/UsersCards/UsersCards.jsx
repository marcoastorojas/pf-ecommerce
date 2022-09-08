import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeOtherUserRol, changeUserStatus } from '../../../redux/actions';
import style from './UsersCards.module.css';
import noProfilePic from "../../../media/images/empty_user_profilepic.png";








export default function UsersCards ({image, email, status, username, rol, uid, info}) {

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
            {/* <button onClick={() => console.log(info)}>INFO</button> */}
            <div className={style.divImagen}>
                {/* <p>{image}</p> */}
                <img src={image?image:noProfilePic} alt='profilePic' referrerPolicy="no-referrer" ></img>
            </div>
            <div className={style.divBasicInfo}>
                {
                    (rol === 'USER_ROLE' && info && info.dni !== null)?
                    <p className={style.wantToBeASeller}>Wants to be a seller!</p> :
                    <></>
                }
                <h3>Basic Info</h3>
                <p>{username}</p>
                <p>{email}</p>
            </div>
            <div className={style.divRol}>
                <h3>User type</h3>
                {/* <p>{rol}</p> */}
                <select className={style.select} name="rol" id="rol" onChange={changeSelectedRol}>
                    <option value='predef' hidden>{rol}</option>
                    <option value="SELLER_ROLE">Seller</option>
                    <option value="USER_ROLE">User</option>
                    <option value="ADMIN_ROLE">Admin</option>
                </select>
                <button className={style.button} onClick={changeRol}>Change rol</button>
                {/* <button onClick={() => console.log(rol, info?.dni)}>PRUEA</button> */}
            </div>
            <div className={style.divStatus}>
                <h3>Status</h3>
                {/* <p>{estado==='true'?'Activo':'Inactivo'}</p> */}
                <select className={style.select} name="status" id="status" onChange={changeSelectedStatus}>
                    <option value="predef" hidden>{estado==='true'?'Activo':'Inactivo'}</option>
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                </select>
                <button className={style.button} onClick={changeStatus}>Change Status</button>
            </div>
            {
                info && Object.keys(info).length > 0 && info.dni !== null &&
                <div className={style.divExtraInfo}>
                    <h3>Seller Info</h3>
                    <div>
                        <div>
                            <p>Name: {info.name}</p>
                            <p>Lastname: {info.lastname}</p>
                            <p>Date of Birth: {info.birthday}</p>
                            <p>DNI: {info.dni}</p>
                            <p>Phone: {info.phone}</p>
                            <p>Gender: {info.gender}</p>
                        </div>
                        <div>
                            <p>Country: {info.country}</p>
                            <p>City: {info.city}</p>
                            <p>State: {info.state}</p>
                            <p>Street: {info.street}</p>
                            <p>Block/Number: {info.number}</p>
                            <p>Zip Code: {info.zipcode}</p>
                        </div>
                    </div>
                </div>
            }
            {/* <p>{uid}</p> */}
        </div>
    )
}