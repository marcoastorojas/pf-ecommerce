import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../redux/actions';
import style from './MyShopping.module.css';
import { Link } from 'react-router-dom';
import noProfilePic from '../../media/images/empty_user_profilepic.png';




export default function MyShopping (props) {
    // const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const shoppingList = useSelector(state => state.shoppingList)
    // const CONSOLELOGPROPS= () => {
    //     // dispatch(getOrders(user.uid))    
    //     console.log(props.orders)
    // }
    function calTotal () {
        let total = 0
        props.orders?.map( e => {
            total += (e.price * e.quantity)
        })
        return total
    }

    return (
        <div className={style.contMyShopping}>
            {/* <button onClick={() => console.log(props)}>CONSOLELOGPROPS</button> */}
            <div className={style.titulo}>
                <h3>Date: {props.date}</h3>
            </div>
            <div className={style.operInfo}>
                <div className={style.infoUser}>
                    <img src={!props.buyer.image?noProfilePic:props.buyer.image} alt="user profile" referrerPolicy="no-referrer" />
                    <p>Username: {props.buyer.username}</p>
                    <p>Email: {props.buyer.email}</p>
                    {/* <h3>Cel:</h3> */}
                </div>
                <div className={style.inforOper}>
                    {
                        props.orders?.map( e => {
                            return (
                                <div key={e.id} className={style.contMiniOrder}>
                                    <div className={style.orderProductTitle}>
                                        <p className={style.titleProduct}>{e.product.title}</p>
                                    </div>
                                    <div className={style.modelNbrand}>
                                        <p>M: {e.product.model}</p>
                                        <p>B: {e.product.brand}</p>
                                    </div>
                                    <div className={style.priceXquanXtotal}>
                                        <div>
                                            <p>Price</p>
                                            <p>${e.price}</p>
                                        </div>
                                        <div>
                                            <p>Quantity</p>
                                            <p>x{e.quantity}</p>
                                        </div>
                                        <div>
                                            <p>Total</p>
                                            <p>${e.quantity * e.price}</p>
                                        </div>
                                    </div>
                                    <div className={style.prodButton}>
                                        <Link to={`/product/${e.product.id}`} className={style.link}>
                                            <button className={style.buttonLinkMS}>Go to product...</button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    }
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
                <h3>Total: ${calTotal()}</h3>
                <h3>Status: </h3>
                <button>Cancel Operation</button>
            </div>
        </div>
    )
}