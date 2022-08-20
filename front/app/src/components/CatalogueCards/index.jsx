import React from 'react'
import { Link } from 'react-router-dom';

import style from "./CatalogueCards.module.css"

export default function CatalogueCards({id, title, image, price}) {
  return (
    <div className={style.card}>
        <Link style={{textDecoration:'none'}} to={`/product/${id}`}>
            <h3>{title}</h3>
        </Link>
        <div>
            <img src={image} alt="Image not found" className={style.imagen} />
        </div>
        <h4>${price}</h4>
    </div>
  )
}