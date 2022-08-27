import React from "react";
import { useSelector } from "react-redux";
import CatalogueCards from "../CatalogueCards";
import Loading from "../Loading/Loading";

import style from "./ResultsContainer.module.css"

export default function ResultsContainer() {
    const searchedProducts = useSelector(state => state.searchedProducts);

    return (
        <div className={style.contResults}>
            {/* <button onClick={() => console.log(searchedProducts[0])}>PRUEBA</button> */}
            {
                searchedProducts.length > 0 ? 
                searchedProducts?.map((product, index) => {
                    return (
                       <CatalogueCards
                       key={index}
                       id={product.id}
                       name={product.title}
                       price={product.price}
                       image={product.images.slice(0)}
                       brand={product.brand}
                       model={product.model}
                       /> 
                    )
                })
                 : 
                <Loading />
            }
        </div>
    )
}