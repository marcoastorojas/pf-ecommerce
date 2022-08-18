import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { stateTest } from "../../redux/actions";

// import styles from "./index.module.css";

import NavBar from "../../components/NavBar";

export default function Landing() {
 const dispatch = useDispatch();

 useEffect(() => {
  console.log("Landing Render");
  dispatch(stateTest());
 });

 return (
  <div>
   <NavBar />
  </div>
 );
}
