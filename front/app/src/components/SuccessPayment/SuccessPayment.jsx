import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import style from './SuccessPayment.module.css';




export default function () {
    useEffect(() => {
        //Dispatch para llamar a los datos de la compra
    }, [])
    const datos = useSelector(state => state.dataSuccessPayment)
    const userInfo = useSelector(state => state.user)

    return(
        <div className={style.contSuccPay}>
            {/* <h1>SOY EL COMP SUCCESS PAYMENT</h1> */}
            <h1>Successful Operation</h1>
            <div className={style.purInfo}>
                <div className={style.custInfo}>
                    <h3>Customer information</h3>
                    <p>name: {userInfo.name}</p>
                    <p>email: {userInfo.email}</p>
                </div>
                <div className={style.products}>
                    {
                        datos.orderdetails?.map(e => {
                            return(
                                <div key={e.id}>
                                    <Link to={`/product/${e.id_product}`}>
                                        <span>{e.name}</span> <span>{e.quantity}</span>
                                    </Link>
                                </div>
                            )
                        })
                    }
                    <div className={style.SuccProd}>
                        <p>nombreProducto</p>
                        <p>nombreprecio</p>
                    </div>
                    <div className={style.SuccProd}>
                        <p>nombreProducto</p>
                        <p>nombreprecio</p>
                    </div>
                </div>
                <div className={style.selInfo}>
                    <h3>Seller information</h3>
                    <p>name: VendedorNombre</p>
                    <p>email: VendedorEmail</p>
                </div>
           </div>
           <div className={style.dataFooter}>
                <span>Date: {datos.date}</span>
                <span>Total: {datos.total}</span>
           </div>
        </div>
    )
}