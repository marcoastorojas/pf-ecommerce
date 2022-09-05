import style from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { newSearchProducts } from "../../redux/actions";

// import { getCategoryProductsById, getProductsFilter } from "../../redux/actions";



export default function FilterContainer() {
//  const results = useSelector((state) => state.searchedProducts);
 const categories = useSelector((state) => state.categories);

 const search = useSelector(state => state.search)
 const searchCategory = useSelector(state => state.searchCategory)
 const dispatch = useDispatch();

 const [min, setMin] = useState('');
 const [max, setMax] = useState('');
//  const [asc, setAsc] = useState("");
//  const [desc, setDesc] = useState("");
 const [order, setOrder] = useState('')
 const [category, setCategory] = useState(search===''?searchCategory[0]:'');
 useEffect(() => {
    setCategory(search===''?searchCategory[0]:'')
 }, [search])

 const minPriceHandle = (e) => {
  setMin(e.target.value);
 };
 const maxPriceHandle = (e) => {
  setMax(e.target.value);
 };
 const orderHandle = (e) => {
  if(order === 'asc') {
    setOrder('desc')
    e.target.innerText = 'Price: desc'
} 
  else {
    setOrder('asc')
    e.target.innerText = 'Price: asc'
  }
 };

 useEffect(() => {
  filtrar();
  if(order !== '') document.querySelector('#orderButton').className = style.buttonOrderSelected
//   else if(desc !== '') document.querySelector('#orderButton').className = style.buttonOrderSelected
  else document.querySelector('#orderButton').className = style.buttonOrder
 }, [order, category]);

 const filtrar = () => {
    console.log(min, max, order, search, 'filtrar:', category)
    dispatch(newSearchProducts(search, order, min, max, category))
    // console.log(category, search)
    // if(category === '') dispatch(getProductsFilter(search, max, min, asc, desc));
    // else dispatch(getCategoryProductsById(category, search, max, min, asc, desc))
 };
const categoryHandle = (e) => {
    setCategory(e.target.value);
}
 return (
  <div className={style.contFilter}>
    {/* <button onClick={ () => console.log(category)}>PRUEBA</button> */}
    <div className={style.eachFilter}>
        {/* <h4>Order By:</h4> */}
        {/* <label>Price: </label> */}
        <button id='orderButton' className={style.buttonOrder} onClick={orderHandle}>Price: Order</button>
        <br></br>
    </div>
    <div className={style.eachFilter}>
        <h4>Categories: </h4>
        <select className={style.selectCategories} onChange={categoryHandle}>
            <option hidden>{searchCategory?searchCategory[1]:'Select Category'}</option>
            {categories?.map(e => {
                    return <option key={e.id} value={e.id}>{e.name}</option>
                })}
        </select>
    </div>
    <div className={style.eachFilter}>
        <h4>Precio:</h4>
        <label>Min:</label>
        <br></br>
        <input className={style.inputFilter} onChange={minPriceHandle}></input>
        <br></br>
        <label>Max:</label>
        <br></br>
        <input className={style.inputFilter} onChange={maxPriceHandle}></input>
        <br></br>
    </div>
    {/* <div className={style.eachFilter}> */}
        <button className={style.buttonFilter} onClick={filtrar}>Filtrar</button>
    {/* </div> */}
    </div>
 );
}
