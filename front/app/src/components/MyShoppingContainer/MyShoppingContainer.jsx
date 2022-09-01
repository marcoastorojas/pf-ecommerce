import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../redux/actions';
import MyShopping from "../MyShopping/MyShopping";
import style from './MyShoppingContainer.module.css';


export default function MyShoppingContainer () {
    const dispatch = useDispatch()

    const dataOrders = useSelector(state => state.dataOrders)
    const user = useSelector(state => state.user)

    const PRUEBADISPATCH = () => {
            dispatch(getOrders(user.uid))    
        }


    return (
        <div className={style.contMSC}>
            <button onClick={PRUEBADISPATCH}>PRUEBADISPATCH</button>
            <button onClick={() => console.log(dataOrders)}>PRUEBACONSOLE:LOG</button>
            {
                Object.keys(dataOrders).length !== 0 && dataOrders?.map( e => {
                    return (
                        <div key={e.id}>
                            <MyShopping orders={e.orderdetails}/>
                        </div>
                    )
                })
            }
        </div>
    )
}