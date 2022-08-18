import Carousel from "../Carousel/index"
import LandingProducts from "../LandingProducts/index"
import "../../Css/Carousel.css"

export default function LandingContainer() {

 return (
    <main>
        <div>
            <Carousel />;
            <br />
            <br />
            <LandingProducts />
        </div>
    </main>
 );
}
