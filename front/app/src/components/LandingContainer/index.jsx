// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { stateTest } from "../../redux/actions";
import Carousel from "../Carousel/index"
import { dataPrueba } from "../Carousel/dataPrueba"
import "../../Css/Carousel.css"

export default function LandingContainer() {

 return (
    <main>
        <div>
            <Carousel slides={dataPrueba}/>;
        </div>
    </main>
 );
}
