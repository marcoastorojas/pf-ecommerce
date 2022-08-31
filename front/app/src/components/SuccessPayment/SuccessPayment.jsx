// import { useState } from "react";
// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import style from './SuccessPayment.module.css';




export default function SuccessPayment () {
    const actualDate = new Date().toLocaleDateString('en-ca')
    const datos = useSelector(state => JSON.parse(state.dataPayment[0].order))
    const userInfo = useSelector(state => state.user)
    // useEffect(() => {
    //     let acum = 0
    //     // acumF(acum)
    // }, [datos])

    function acumF (arr, nameSum, nameMul) {
        let acum = 0
        arr.map(e => acum += (e[nameSum] * e[nameMul]))
        return acum
        
    }
    return(
        <div className={style.contSuccPay}>
            {/* <button onClick={() => console.log('pepe')}>PRUEBA</button> */}
            {/* <h1>SOY EL COMP SUCCESS PAYMENT</h1> */}
            <h1>Successful Operation</h1>
            <div className={style.purInfo}>
                <div className={style.custInfo}>
                    <h3>Customer information</h3>
                    <p>name: {userInfo.name}</p>
                    <p>email: {userInfo.email}</p>
                </div>
                <div className={style.products}>
                    <div className={style.SuccProd}>
                        <h4 className={style.titleProd}>Product</h4> <h4>Quantity</h4> <h4>Price</h4> <h4>SubTotal</h4>
                    </div>
                    {
                        datos.orderDetail?.map(e => {
                            return(
                                // <div key={e.idProduct} className={style.SuccProd}>
                                    <Link to={`/product/${e.idProduct}`} key={e.idProduct} className={style.SuccProd}>
                                        <span className={style.titleProd}>{e.title}</span> <span>{e.quantity}</span> <span>${Number(e.price).toLocaleString()}</span> <span>${Number(e.price * e.quantity).toLocaleString()}</span>
                                    </Link>
                                // </div>
                            )
                        })
                    }
                </div>
                <div className={style.selInfo}>
                    <h3>Seller information</h3>
                    <p>name: VendedorNombre</p>
                    <p>email: VendedorEmail</p>
                </div>
           </div>
           <div className={style.dataFooter}>
                <h4>Date: {actualDate.split('-').reverse().join('-')}</h4>
                <h4>Total: ${Number(acumF(datos.orderDetail, 'price', 'quantity')).toLocaleString()}</h4>
           </div>
        </div>
    )
}