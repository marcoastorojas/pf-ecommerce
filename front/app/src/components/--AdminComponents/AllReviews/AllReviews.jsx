import React, { useEffect } from "react";
import { getAllReviews, delReview } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import defaultImg from "../../../media/images/empty_user_profilepic.png";
import "./AllReviews.css"

export default function AllReviews() {
  const dispatch = useDispatch();
  const productsReviews = useSelector((state) => state.productsReviews);

  useEffect(() => {
    dispatch(getAllReviews());
  }, []);
  

  const delRw = (userId, productId) => {
    dispatch(delReview(userId, productId));
    
    setTimeout(() => {
        dispatch(getAllReviews());
    }, 900)
  };

  return (
    <div>
      {productsReviews.map((rw) => {
        return (
          <div key={rw.id} className="reviews-main">
            <div className="reviews-user-image">
              <img src={rw.user.image ? rw.user.image : defaultImg} alt={rw.user.username} />
              <h2>{rw.user.username}</h2>
              <div>
                <h3>Role: {rw.user.role.name}</h3>
              </div>
            </div>
            <div>
              <NavLink to={`/product/${rw.product.id}`} className="reviews-product">
                <img src={rw.product.images.split(" ")[0]}/>
                <h2>{rw.product.title}</h2>
              </NavLink>
            </div>
            <div className="reviews-comment">
                <div>
                    <h2>{rw.score}</h2>
                    <p>{rw.description}</p>
                </div>
              <div>
                <button onClick={() => delRw(rw.user.uid, rw.product.id)}>Delete</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
