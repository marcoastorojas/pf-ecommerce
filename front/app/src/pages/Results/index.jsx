import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import style from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getCategoryProductsById, getProductsFilter } from "../../redux/actions";
import { useState, useEffect } from "react";

export default function Results() {
 const results = useSelector((state) => state.searchedProducts);
 const categories = useSelector((state) => state.categories);
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
  if(category === '') dispatch(getProductsFilter(name.value, max, min, asc, desc));
  else dispatch(getCategoryProductsById(category, name.value, max, min, asc, desc))
 };
const categoryHandle = (e) => {
    setCategory(e.target.value);
    
}
useEffect(() => {
    const name = document.querySelector("#inputBusqueda");
    dispatch(getCategoryProductsById(category, name.value, max, min, asc, desc))
}, [category])
 return (
  <div>
   <NavBar />
   <br />
   <br />
   <button onClick={verResults}>PRUEBA</button>
   <div className={style.contenido}>
    <div>
     <h4>Order By:</h4>
     <label>Price:</label>
     <button onClick={orderHandle}>Order</button>
     <br></br>
     <h4>Categories: </h4>
     <select onChange={categoryHandle}>
        <option hidden>Select Category</option>
        {
            categories?.map(e => {
                return <option key={e.id} value={e.id}>{e.name}</option>
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
    <div>
        {
            results?.map( e => {
                return(
                <div>
                    <hr></hr>
                    <p>{e.title}</p>
                    <p>{e.price}</p>
                    <hr></hr>
                </div>
                ) 
            })
        }
        {
            results.length<1?<p>No hay resultados</p>:<></>
        }
    </div>
   </div>
   <Footer />
  </div>
 );
}
