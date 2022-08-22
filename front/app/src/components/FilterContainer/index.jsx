import style from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { getCategoryProductsById, getProductsFilter } from "../../redux/actions";



export default function FilterContainer() {
 const results = useSelector((state) => state.searchedProducts);
 const categories = useSelector((state) => state.categories);
 const search = useSelector(state => state.search)
 const searchCategory = useSelector(state => state.searchCategory)
 const dispatch = useDispatch();

 const [min, setMin] = useState(0);
 const [max, setMax] = useState(9999999);
 const [asc, setAsc] = useState("");
 const [desc, setDesc] = useState("");
 const [category, setCategory] = useState(search===''?searchCategory:'');
 useEffect(() => {
    setCategory(search===''?searchCategory:'')
 }, [search])

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
 }, [asc, category]);

 const filtrar = () => {
    console.log(category, search)
  if(category === '') dispatch(getProductsFilter(search, max, min, asc, desc));
  else dispatch(getCategoryProductsById(category, search, max, min, asc, desc))
 };
const categoryHandle = (e) => {
    setCategory(e.target.value);
}
// useEffect(() => {
//     if(!!category) dispatch(getCategoryProductsById(category, search, max, min, asc, desc))
// }, [category])
const PRUEBA = () => {
    console.log('Category:', category, 'SearchCategory:', searchCategory, 'Search;', search)
}
 return (
  <div>
    <button onClick={PRUEBA}>PRUEBA</button>
        <h4>Order By:</h4>
        <label>Price:</label>
        <button onClick={orderHandle}>Order</button>
        <br></br>
        <h4>Categories: </h4>
        <select onChange={categoryHandle}>
            <option hidden>Select Category</option>
            {categories?.map(e => {
                    return <option key={e.id} value={e.id}>{e.name}</option>
                })}
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
 );
}
