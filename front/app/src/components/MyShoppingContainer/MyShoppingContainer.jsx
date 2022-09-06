import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../redux/actions';
import { ADMIN_ROLE } from '../../validations/usersTypes';
import MyShopping from "../MyShopping/MyShopping";
import style from './MyShoppingContainer.module.css';


export default function MyShoppingContainer () {
    const dispatch = useDispatch()

    const dataOrders = useSelector(state => state.dataOrders)
    const user = useSelector(state => state.user)

    // const PRUEBADISPATCH = () => {
    //         dispatch(getOrders(user.uid))    
    //     }
    useEffect(() => {
        // console.log('pepe')
        if(user.roleId === ADMIN_ROLE) {
            dispatch(getOrders())
        }
        else {
            dispatch(getOrders(user.uid))
        }
    }, [dispatch])

    return (
        <div className={style.contMSC}>
            {/* <button onClick={PRUEBADISPATCH}>PRUEBADISPATCH</button> */}
            <button onClick={() => console.log(dataOrders)}>PRUEBACONSOLE:LOG</button>
            {
                Object.keys(dataOrders).length !== 0 && dataOrders?.map( e => {
                    return (
                        <div key={e.id}>
                            <MyShopping buyer={e.user} date={e.createdAt} orders={e.orderdetails}/>
                        </div>
                    )
                })
            }
            {
                Object.keys(dataOrders).length === 0 && <div> <h1>No results</h1> </div>
            }
        </div>
    )
}