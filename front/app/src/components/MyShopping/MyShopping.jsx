import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../redux/actions';
import style from './MyShopping.module.css';
import { Link } from 'react-router-dom';
import noProfilePic from '../../media/images/empty_user_profilepic.png';
import Mapita from '../Mapita/Mapita';




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
    const verMapita = () => {
        document.querySelector('#mapita').className = document.querySelector('#mapita').className===style.mapa?style.mapaHidden:style.mapa
        document.querySelector('#mapitaButton').className = document.querySelector('#mapitaButton').className===style.buttonMap?style.buttonMapSelected:style.buttonMap
    }

    return (
        <div className={style.contMyShopping}>
            {/* <button onClick={() => console.log(props)}>CONSOLELOGPROPS</button> */}
            <div className={style.header}>
                <div className={style.titulo}>
                    <h3>Date: {props.date}</h3>
                    {/* <h3>Date: 17/52/87453</h3> */}
                </div>
                <div className={style.contMapa}>
                    <h3>Branch withdrawal: {props.sucursal.name} </h3>
                    <div>
                        <h3 id='mapitaButton' className={style.buttonMap} onClick={verMapita}>Map</h3>
                        <div id='mapita' className={style.mapaHidden}>
                            <Mapita X={props.sucursal?.lat} Y={props.sucursal?.lng} oneMarker='true'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.operInfo}>
                <div className={style.infoUser}>
                    <div className={style.divImg}>
                        <img src={!props.buyer.image?noProfilePic:props.buyer.image} alt="user profile" referrerPolicy="no-referrer" />
                    </div>
                    <div className={style.infoBuyer}>
                        <p>Username: {props.buyer.username}</p>
                        <p>Email: {props.buyer.email}</p>
                    </div>
                    {/* <h3>Cel:</h3> */}
                </div>
                <div className={style.inforOper}>
                    <div className={style.SuccProd}>
                        <h4 className={style.titleProd}>Product</h4><h4>Quantity</h4> <h4>Price</h4> <h4>SubTotal</h4>
                    </div>
                    {
                        props.orders?.map( e => {
                            return (
                                e.product !== null &&
                                <Link to= {`/product/${e.product.id}`} key={e.id} className={style.SuccProd}>
                                        <span className={style.titleProd}>{e.product?.title}</span><span>{e.quantity}</span><span>${Number(e.price).toLocaleString()}</span><span>${Number(e.price * e.quantity).toLocaleString()}</span>
                                </Link>
                                // <div key={e.id} className={style.contMiniOrder}>
                                //     <div className={style.orderProductTitle}>
                                //         <p className={style.titleProduct}>{e.product.title}</p>
                                //     </div>
                                //     <div className={style.modelNbrand}>
                                //         <p>M: {e.product.model}</p>
                                //         <p>B: {e.product.brand}</p>
                                //     </div>
                                //     <div className={style.priceXquanXtotal}>
                                //         <div>
                                //             <p>Price</p>
                                //             <p>${e.price}</p>
                                //         </div>
                                //         <div>
                                //             <p>Quantity</p>
                                //             <p>x{e.quantity}</p>
                                //         </div>
                                //         <div>
                                //             <p>Total</p>
                                //             <p>${e.quantity * e.price}</p>
                                //         </div>
                                //     </div>
                                //     <div className={style.prodButton}>
                                //         <Link to={`/product/${e.product.id}`} className={style.link}>
                                //             <button className={style.buttonLinkMS}>Go to product...</button>
                                //         </Link>
                                //     </div>
                                // </div>
                            )
                        })
                    }
                </div>
                {/* <div className={style.infoSell}>
                    <h3>Seller Info</h3>
                    <h3>Name:</h3>
                    <h3>Email:</h3>
                    <h3>Address:</h3>
                    <h3>Cel:</h3>
                </div> */}
            </div>
            <div className={style.status}>
                <h3>Status: {props.status.description} </h3>
                <h3>Total: ${calTotal()}</h3>
                {/* <button>Cancel Operation</button> */}
            </div>
        </div>
    )
}