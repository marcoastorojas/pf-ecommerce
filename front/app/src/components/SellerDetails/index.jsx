import sampleImage1 from "../../media/images/sample-image-square.jpg";

export default function SellerDetails() {
  return (
    <div className="seller-info">
    <img src={sampleImage1} alt="user profile" />
    <h2>user seller</h2>
    <div className="user-data">
      <span>-Seller Popularity-</span>
      <span>-Seller Data-</span>
    </div>
  </div>
  );
}
