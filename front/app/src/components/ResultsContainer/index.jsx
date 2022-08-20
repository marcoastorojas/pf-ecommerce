import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CatalogueCards from "../CatalogueCards";
import Loading from "../Loading/Loading";

import style from "./ResultsContainer.module.css"

export default function ResultsContainer() {
    const dispatch = useDispatch();
    const searchedProducts = useSelector(state => state.searchedProducts)

    const catalogueCards = (products) => {
        return (
            <div className={style.cards}>
                {searchedProducts?.map((product) => {
                    return (
                       <CatalogueCards
                       key={product.id}
                       id={product.id}
                       title={product.title}
                       image={product.images.slice(0)}
                       price={product.price}
                       /> 
                    )
                })}
            </div>
        )
    }

    return (
        <div className={style.contain}>
            {searchedProducts.length > 0 ? catalogueCards(searchedProducts) : <Loading />}
        </div>
    )
}
//   return (
//     <div className="container">
//         <div className="productsContainer">{searchedProducts && searchedProducts.map((product) => {
//             return (
//                 <div className="cardContainer" key={product.id}> 
//                     <h3>{product.title}</h3>
//                     <img className="productsImage" src={product.images.slice(0)} alt="Image not found" />
//                     <p>${product.price}</p>
//                 </div>
//             )
//         })}</div>
//     </div>
//   )
// }