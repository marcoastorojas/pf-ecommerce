import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/actions";
import UsersCards from "../UsersCards/UsersCards";
import style from './UsersCardsContainer.module.css';








export default function UsersCardsContainer () {

    const dispatch = useDispatch()
    const allUsers = useSelector(state => state.allUsers)
    

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])






    return (
        <div className={style.contUsersCardsContainer}>
            {/* SOY EL USERSCARDSCONTAINER */}
            {/* <button onClick={() => console.log(allUsers)}>PRUEBADATOS</button> */}
            {
                allUsers?.map( e => {
                    return(
                        <UsersCards
                        key={e.uid}
                        image={e.image}
                        email={e.email}
                        status={e.status?.active}
                        username={e.username}
                        rol={e.role.name}
                        uid={e.uid}
                        info={e.info}
                        />
                    )
                })
            }
        </div>
    )
}