import sampleImage1 from "../../media/images/sample-image-square.jpg";
import style from './index.module.css';

export default function SellerDetails() {
  return (
    <div className={style.contSeller}>
      <img src={sampleImage1} alt="user profile" />
      <h2>user seller</h2>
      <div className="user-data">
        <p>-Seller Popularity-</p>
        <p>-Seller Data-</p>
      </div>
  </div>
  );
}
