//import { useEffect } from "react";
//import { useDispatch } from "react-redux";
import ResultsContainer from "../../components/ResultsContainer";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import style from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductsFilter } from "../../redux/actions";
import { useState, useEffect } from "react";

export default function Results() {
 const results = useSelector((state) => state.searchedProducts);
 const categories = useSelector((state) => state.categories);
 const search = useSelector(state => state.search)
 const dispatch = useDispatch();

 const [min, setMin] = useState(0);
 const [max, setMax] = useState(9999999);
 const [asc, setAsc] = useState("");
 const [desc, setDesc] = useState("");
 const [category, setCategory] = useState('');

 const minPriceHandle = (e) => {
  setMin(e.target.value);
 };
 const maxPriceHandle = (e) => {
  setMax(e.target.value);
 };
 const orderHandle = (e) => {
  if (!asc) {
   setAsc("true");
   setDesc("");
   e.target.innerText = "ASC";
  } else {
   setAsc("");
   setDesc("true");
   e.target.innerText = "DESC";
  }
 };

 useEffect(() => {
  filtrar();
 }, [asc]);

 const verResults = () => {
  console.log(results);
 };
 const filtrar = () => {
  const name = document.querySelector("#inputBusqueda");
  // console.log(name.value, min, max)
  dispatch(getProductsFilter(name.value, max, min, asc, desc));
 };
const categoryHandle = (e) => {
    setCategory(e.target.value);
}
 return (
  <div>
   <NavBar />
   <br />
   <br />
   {search && <h1 className={style.titulo}>Results for: {search} </h1>}
   <div className={style.contenido}>
    <div>
     {/* <button onClick={verResults}>ver resultados de búsqueda</button> */}
     <h4>Order By:</h4>
     <label>Price:</label>
     <button onClick={orderHandle}>Order</button>
     <br></br>
     <h4>Categories: </h4>
     <select onChange={categoryHandle}>
        <option hidden>Select Category</option>
        {
            categories?.map(e => {
                return <option value={e.id}>{e.name}</option>
            })
        }
     </select>
     <h4>Precio:</h4>
     <label>Min:</label>
     <input onChange={minPriceHandle}></input>
     <br></br>
     <label>Max:</label>
     <input onChange={maxPriceHandle}></input>
     <br></br>
     <button onClick={filtrar}>Filtrar</button>
    </div>
    <ResultsContainer />
   </div>
   <Footer />
  </div>
 );
}
