import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview, delReview, getUserReviews, updateReview} from "../../redux/actions";
import { NavLink } from "react-router-dom";
import style from "./Reviews.module.css";
import Loading from "../Loading/Loading";
import NoResultsFound from "../NoResultsFound/NoResultsFound";

export default function Reviews() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const reviews = useSelector((state) => state.reviews);
  
  useEffect(() => {
    dispatch(getUserReviews(user.uid));
  }, [])

  return (
    <div className={style.reviewContainer}>
      <div >
        {reviews.length===0? <Loading/>: reviews[0]===0?<NoResultsFound/>: reviews.map((rw) => {
          return (
            <div key={rw.id} className={style.comments}>
              <div>
                <NavLink to={`/product/${rw.productId}`} className={style.productData}>
                GO TO PRODUCT PAGE
                </NavLink>
              </div>
              <div className={style.reviewData}>
               <span>Score: {rw.score}</span>
                <p>{rw.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 1 Producto
// 2 Review
//    2.1 Usuario data (foto, nombre(link to profile))
//    2.2 Comentario
//        2.2.1 Respuestas
