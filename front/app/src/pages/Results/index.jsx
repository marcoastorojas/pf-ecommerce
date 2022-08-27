//import { useEffect } from "react";
//import { useDispatch } from "react-redux";
import ResultsContainer from "../../components/ResultsContainer";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import FilterContainer from '../../components/FilterContainer'
import style from "./index.module.css";
import { useSelector } from "react-redux";



export default function Results() {
 const search = useSelector(state => state.search);

 return (
  <div>
   {search && <h1 className={style.titulo}>Results for: {search} </h1>}
   <div className={style.contenido}>
    <FilterContainer/>
    <ResultsContainer />
   </div>
   {/* <Footer /> */}
  </div>
 );
}
