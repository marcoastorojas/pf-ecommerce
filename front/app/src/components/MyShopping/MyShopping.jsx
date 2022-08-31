import { useSelector } from 'react-redux';
import style from './MyShopping.module.css';






export default function MyShopping () {


    const shoppingList = useSelector(state => state.shoppingList)

    return (
        <div className={style.contMyShopping}>
            <div className={style.titulo}>
                <h3>Date: </h3>
            </div>
            <div className={style.operInfo}>
                <div className={style.infoUser}>
                    <h3>User Info</h3>
                    <h3>Name:</h3>
                    <h3>Email:</h3>
                    <h3>Cel:</h3>
                </div>
                <div className={style.inforOper}>
                    <div>
                        <h5>ProductName</h5>
                        <h5>ProductPrice</h5>
                    </div>
                </div>
                <div className={style.infoSell}>
                    <h3>Seller Info</h3>
                    <h3>Name:</h3>
                    <h3>Email:</h3>
                    <h3>Address:</h3>
                    <h3>Cel:</h3>
                </div>
            </div>
            <div className={style.status}>
                <h3>Status: </h3>
                <button>Cancel Operation</button>
            </div>
        </div>
    )
}