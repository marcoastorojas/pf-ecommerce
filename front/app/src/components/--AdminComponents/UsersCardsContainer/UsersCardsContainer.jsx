import { useEffect } from "react"
import { useDispatch } from "react-redux"









export default function UsersCardsContainer () {

    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch()
    }, [])






    return (
        <div>
            SOY EL USERSCARDSCONTAINER
        </div>
    )
}