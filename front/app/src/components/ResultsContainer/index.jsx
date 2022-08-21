import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByName } from "../../redux/actions"
import CatalogueCards from "../CatalogueCards";
import Loading from "../Loading/Loading";

import style from "./ResultsContainer.module.css"

export default function ResultsContainer() {
    const dispatch = useDispatch();
    const searchedProducts = useSelector(state => state.searchedProducts);
    const search = useSelector(state => state.search)

    useEffect(()=> {
        dispatch(getProductsByName(search))
    }, [dispatch])

    const catalogueCards = (products) => {
        return (
            <div className={style.cards}>
                {searchedProducts?.map((product, index) => {
                    return (
                       <CatalogueCards
                       key={index}
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