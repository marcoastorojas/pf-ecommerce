import sampleImage1 from "../../media/images/sample-image-square.jpg";
import style from './index.module.css';
import emptyUser from "../../media/images/empty_user_profilepic.png";
import { ADMIN_ROLE } from "../../validations/usersTypes";

export default function SellerDetails({seller}) {
  let imagen = emptyUser
  if(seller.uid === ADMIN_ROLE) {
    
  }
  
  return (
    <div className={style.contSeller}>
      <button onClick={() => console.log(seller)}>PRUEBA</button>
      <img src={seller.image!==null?seller.image:imagen} alt="user profile" />
      <h2>{seller.username}</h2>
      <div className="user-data">
        {/* <p>-Seller Popularity-</p> */}
        <p>{seller.email}</p>
      </div>
  </div>
  );
}
