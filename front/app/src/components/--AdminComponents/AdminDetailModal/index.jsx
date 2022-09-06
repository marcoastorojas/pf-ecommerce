import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { cleanseProductDetails, deleteProduct } from "../../../redux/actions";
import style from "./index.module.css";

export default function AdminDetailModal({ details, closeDetailHandler }) {
  const dispatch = useDispatch();

  const [deleteTry, setDeleteTry] = useState(false);

  function deleteTryHandler(e) {
    // console.log("delete try");
    if (e.target.id === "delete") {
      setDeleteTry(true);
    } else if (e.target.id === "cancel") {
      setDeleteTry(false);
    }
  }

  const deleteActionHandler = () => {
    console.log(details.id);
    dispatch(deleteProduct(details.id));
  };

  // useEffect(() => {
  //   function cleanseDetails() {
  //     dispatch(cleanseProductDetails());
  //   }
  // });

  return (
    <div>
      <div className={style.detailCard} id={details.id}>
        <div className={style.imgAndTitle}>
          <div className={style.detailImgContainer}>
            {details.images &&
              details.images.split(" ").map((img) => {
                return <img key={img} src={img} alt="product" className={style.detailImg} />;
              })}
            {/* <img src={details.images.split(" ")[0]} alt="product" className={style.detailImg} /> */}
          </div>
          <div className={style.titleDiv}>
            <button onClick={closeDetailHandler}>close</button>
            <p>Title: {details.title}</p>
            <p>Model: {details.model}</p>
            <p>Brand: {details.brand}</p>
            <p>Categories:</p>
            <ul>
              {details.categories[0] &&
                details.categories.map((category) => {
                  return <li>{category.name}</li>;
                })}
            </ul>
          </div>
        </div>
        <div className={style.costDiv}>
          <p>Owner: {details.userId}</p>
          <p>Stock: {details.stock}</p>
          <p>Total cost: ${details.price && details.price.originalprice}</p>
          <p>
            Discount:
            {details.price && details.price.discount ? details.price.discount : "No discount."}
          </p>
          {details.price && details.price.discount && <p>Discount expire time: {details.price.expiresin ? details.price.expiresin : "Without limit."}</p>}
        </div>
        <div>
          <div>
            <p>Description:</p>
            <p>{details.description}</p>
          </div>
          <div>
            <div className={style.reviewsDiv}>
              <p>Reviews:</p>
              {details.Reviews[0] ? (
                <div>
                  {" "}
                  {details.Reviews.map((review) => {
                    return (
                      <div>
                        <p>User: {review.user.username}</p>
                        <p>Score: {review.score}</p>
                        <p>Description:</p>
                        <p>{review.description}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <p>No reviews.</p>
                </div>
              )}
            </div>
            <div>
              <p>Added to wishlist by:</p>
              {details.favorites[0] ? (
                <ul>
                  {details.favorites.map((favorite) => (
                    <li>{favorite.id}</li>
                  ))}
                </ul>
              ) : (
                <p>This product doesn't belong to anyones wishlist.</p>
              )}
            </div>
          </div>
        </div>
        <div>
          <button id="delete" onClick={deleteTryHandler}>
            Delete product
          </button>
          {deleteTry && (
            <div>
              <p>You're about to delete a product from the data base. Do you want to complete this action?</p>
              <button onClick={deleteActionHandler}>Yes, continue.</button>
              <button id="cancel" onClick={deleteTryHandler}>
                No, cancel the action.
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
