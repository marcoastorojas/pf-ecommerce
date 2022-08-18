import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { stateTest } from "../../redux/actions";
import LandingContainer from "../../components/LandingContainer";

export default function Landing() {
 const dispatch = useDispatch();

 useEffect(() => {
  console.log("Landing Render");
  dispatch(stateTest());
 });

 return (
  <div>
   <h1>Landing Page</h1>
<<<<<<< HEAD
   <LandingContainer />
=======
>>>>>>> d5eb674422b5bbca067701aaa77dd227c6758d99
  </div>
 );
}
