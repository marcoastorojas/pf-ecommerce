import React, {useEffect} from "react";
import { getAllReviews } from "../../../redux/actions";
import {useDispatch, useSelector} from "react-redux"

export default function AllReviews() {

  const dispatch = useDispatch();
  const productsReviews = useSelector((state) => state.productsReviews);

  useEffect(() => {
    dispatch(getAllReviews())
  }, [])

  return <div>
  All Comments
  {productsReviews.map((rw) => {
    return <div key={rw.id}>
        COMMENTS:
        <div>
            <img src={rw.user.image} alt={rw.user.username}/>
            <h2>User name: {rw.user.username}</h2>
            <div>
                <h3>Role: {rw.user.role.name}</h3>
            </div>
        </div>
        <div>
            Product:
            {*<img src={rw.product.images.split(" ")[0]}/>*}
            <h2>{rw.product.title}</h2>
        </div>
        <div>
        <h2>{rw.score}</h2>
        <p>{rw.description}</p>
        </div>
    </div>
  })}
  </div>
}