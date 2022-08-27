import React from 'react'
import { Link } from 'react-router-dom';

import style from "./CatalogueCards.module.css"

export default function CatalogueCards({id, name, price, image, brand, model}) {
  return (
    // <div className={style.contCatCard}>
        <Link className={style.contCatCard} style={{textDecoration:'none'}} to={`/product/${id}`}>
          <div className={style.imgCatLogCard}>
            <img src={image} alt="Image not found" />
          </div>
          <div className={style.infoCatCard}>
            <p>{name}</p>
            <p>Brand: {brand}</p>
            <p>Model: {model}</p>
            <p id={style.priceCatCard}>$ {Number(price).toLocaleString()}</p>
            <p id={style.detCatCard}>Details...</p>
          </div>
        </Link>
    // </div>
  )
}