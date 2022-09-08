import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { sendPayment, getSucursal, clearCart } from "../../redux/actions";
import { useState } from "react";
import Mapita from "../Mapita/Mapita.jsx"
import "./Checkout.css"



export default function Checkout() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const cartTotal = useSelector((state) => state.cartTotal);
  const user = useSelector((state) => state.user);
  const sucursal = useSelector((state) => state.sucursal);
  
  //RECIBE LO QUE EL POST DEL BACK RETORNA
  const dataPayment = useSelector((state) => state.dataPayment);
  const navigate = useNavigate();

  const [ email, setEmail ] = useState( user.email || '')
  const [ direction, setDirection ] = useState('')
   const [location, setLocation] = useState({
        loaded:false,
        coordinates: {lat:"",lng:""},
    });


  const handlePay = () => {
  if(!!email && !!direction){
  const tienda = sucursal.find((sl) => sl.name === direction)
    console.log({ 
      totalPriceProducts: cartTotal,
      products: cart,
      user_id: user.uid ,
      direction: tienda.id,
      email: email
    })
    dispatch(sendPayment({ 
      totalPriceProducts: cartTotal,
      products: cart,
      user_id: user.uid ,
      direction: tienda.id,
      email: email
    }));
    
    setTimeout(() => {
        dispatch(clearCart());
         navigate("/");
    }, 1200)
  } else return toast.error("Fill the payment data");
  };
  
  const onSuccess=(location)=>{
        setLocation({
            loaded:true,
            coordinates:{
                lat:location.coords.latitude,
                lng:location.coords.longitude,
            },
        });
    };

    const onError=error=> {
        setLocation({
            loaded:true,
            error,
        });
    };
    
     useEffect(()=>{
        if(!("geolocation" in navigator)) {
            onError({
                code:0,
                message:"Geolocation not supported",
            })
        }
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }, []);
    
    const changeDirection = (e) => {
       setDirection(e.target.value)
    }

  if (cart.length < 0) {
    toast.error("Shopping cart is empty");
    toast.custom(
      (t) => (
        <div className="toast-border">
          <img
            className="toast-logo"
            // src={toastLogo}
            alt="toast logo"
          />
          <div className="toast-text">
            <span>This toast has been succesfully arranged!</span>
          </div>
          <button className="toast-button" onClick={() => toast.dismiss(t.id)}>
            <img
              className="button-image"
              // src={closeButton}
              alt="close button"
            />
          </button>
        </div>
      ),
      { duration: 10000 }
    );
    setTimeout(() => {
      navigate("/");
    }, 1500);

    return (
      <div>
        <Toaster />
        Shopping cart is empty
      </div>
    );
  } else if(location.loaded)return (
      <div className="check">
      <div className="check-right">
      <input type="text" name="email" id="email" placeholder="email" value={email} disabled={true}/>
      <input type="text" name="direction" id="direction" placeholder="direction" value={direction} disabled={true} />
        <select onChange={(e) => changeDirection(e)} className="select-check">
                <option value="">SUCURSALES</option>
                   {sucursal.length > 0 && sucursal.map((sl) => {
                return <option key={sl.id} value={sl.name}>{sl.name}</option>
            })}
            </select>
      <button onClick={() => handlePay()}>PAY</button>
      </div>
        <div className="map">{<Mapita X={location.coordinates?.lat ? location.coordinates.lat : -34.61315} Y={location.coordinates?.lng ? location.coordinates.lng : -58.37723} search={direction}/>}</div>
        <Toaster />
      </div>
    );
    
    else <div>loading</div>
}
