import sampleImage1 from "../../media/images/sample-image-square.jpg";

export default function SellerDetails() {
 return (
  <div>
   <p> -Seller Name- </p>
   <img src={sampleImage1} alt="" />
   <p> -Seller Popularity- </p>
   <p> -Seller Data- </p>
  </div>
 );
}
