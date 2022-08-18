import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { stateTest } from "../../redux/actions";

export default function Landing() {
 const dispatch = useDispatch();

 useEffect(() => {
  console.log("Landing Render");
  dispatch(stateTest());
 });

 return (
  <div>
   <h1>Landing Page</h1>
  </div>
 );
}
