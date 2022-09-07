import sampleImage1 from "../../media/images/sample-image-square.jpg";
import style from './index.module.css';
import emptyUser from "../../media/images/empty_user_profilepic.png";
import adminImage from '../../media/images/plushardware.png';
import { ADMIN_ROLE } from "../../validations/usersTypes";
import { useState } from "react";

export default function SellerDetails({seller}) {
  const  [imagenAdmin, setImagenAdmin ] = useState(seller.roleId===ADMIN_ROLE?adminImage:emptyUser)
  // setImagenAdmin(emptyUser)
  // if(seller.uid === ADMIN_ROLE) {
  //   setImagenAdmin(adminImage)
  // }
  
  return (
    <div className={style.contSeller}>
      <button onClick={() => console.log(seller)}>PRUEBA</button>
      <img src={seller.image!==null?seller.image:imagenAdmin} alt="user profile" referrerPolicy="no-referrer"/>
      <h2>{seller.username}</h2>
      <div className="user-data">
        {/* <p>-Seller Popularity-</p> */}
        <p>{seller.email}</p>
      </div>
  </div>
  );
}
