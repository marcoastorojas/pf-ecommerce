import sampleImage1 from "../../media/images/sample-image-square.jpg";
import style from './index.module.css';
import emptyUser from "../../media/images/empty_user_profilepic.png";

export default function SellerDetails({seller}) {
  return (
    <div className={style.contSeller}>
      <img src={seller.image!==null?seller.image:emptyUser} alt="user profile" />
      <h2>{seller.username}</h2>
      <div className="user-data">
        {/* <p>-Seller Popularity-</p> */}
        <p>{seller.email}</p>
      </div>
  </div>
  );
}
