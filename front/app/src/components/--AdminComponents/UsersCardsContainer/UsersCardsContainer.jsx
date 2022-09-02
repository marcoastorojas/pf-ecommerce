import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getAllUsers } from "../../../redux/actions"









export default function UsersCardsContainer () {

    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])






    return (
        <div>
            SOY EL USERSCARDSCONTAINER
        </div>
    )
}