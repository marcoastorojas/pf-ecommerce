import React, { useEffect } from "react";
import { getAllReviews, delReview } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function AllReviews() {
  const dispatch = useDispatch();
  const productsReviews = useSelector((state) => state.productsReviews);

  useEffect(() => {
    dispatch(getAllReviews());
  }, []);

  const delRw = (userId, productId) => {
    dispatch(delReview(userId, productId));
  };

  return (
    <div>
      All Comments
      {productsReviews.map((rw) => {
        return (
          <div key={rw.id}>
            COMMENTS:
            <div>
              <img src={rw.user.image} alt={rw.user.username} />
              <h2>User name: {rw.user.username}</h2>
              <div>
                <h3>Role: {rw.user.role.name}</h3>
              </div>
            </div>
            <div>
              Product:
              <NavLink to={`/product/${rw.product.id}`}>
                {/*<img src={rw.product.images.split(" ")[0]}/>*/}
                <h2>{rw.product.title}</h2>
              </NavLink>
            </div>
            <div>
              <h2>{rw.score}</h2>
              <p>{rw.description}</p>
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
