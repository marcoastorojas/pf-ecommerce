import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  // cleanseProductDetails,
  deleteProduct,
} from "../../../redux/actions";

import closeCross from "../../../media/svg/round_cross.svg";

import style from "./index.module.css";
import { useEffect } from "react";

export default function AdminDetailModal({ details, closeDetailHandler }) {
  const dispatch = useDispatch();

  const date = new Date();
  const minDate = `${date.getDate()}${date.getFullYear}`;

  const [deleteTry, setDeleteTry] = useState(false);
  const [discountInput, setDiscountInput] = useState(0.1);
  const [discountDate, setDiscountDate] = useState(null);
  const [emptyOrIncompleteDiscountValues, setemptyOrIncompleteDiscountValues] = useState(minDate);

  function deleteTryHandler(e) {
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

  function onDiscountInputChange(e) {
    let discount = e.target.value;
    if (discount >= 10 && discount <= 90) {
      let discountFloat = discount / 100;
      setDiscountInput(discountFloat);
      if (discountInput && discountDate) setemptyOrIncompleteDiscountValues(false);
    }
  }

  function onDateInputChange(e) {
    setDiscountDate(e.target.value);
  }

  const discountSubmitHandler = (e) => {
    e.preventDefault();
    // if (discountInput && discountDate) {
    console.log({ discount: discountInput, date: discountDate, objDate: date });
    // } else {
    //   setemptyOrIncompleteDiscountValues(true);
    //   console.log({ m: "Empty or incomplete discount values" });
    // }
  };

  useEffect(() => {
    console.log();
  });

  return (
    <div>
      <div className={style.detailCard} id={details.id}>
        <div className={style.imgAndTitle}>
          <div>
            <div className={style.detailImgContainer}>
              {details.images &&
                details.images.split(" ").map((img) => {
                  return <img key={img} src={img} alt="product" className={style.detailImg} />;
                })}
              {/* <img src={details.images.split(" ")[0]} alt="product" className={style.detailImg} /> */}
            </div>
            <div className={style.descriptionDiv}>
              <p className={style.descriptionTitleP}>Description:</p>
              <p className={style.descriptionText}>{details.description}</p>
            </div>
          </div>
          <div className={style.titleAndCostDiv}>
            <div className={style.titleDiv}>
              <button className={style.closeButton} onClick={closeDetailHandler}>
                <img src={closeCross} alt="close button" />
              </button>
              <p className={style.titlesP}>Title:</p>
              <p className={style.descriptionP}> {details.title}</p>
              <p className={style.titlesP}>Model:</p>
              <p className={style.descriptionP}> {details.model}</p>
              <p className={style.titlesP}>Brand:</p>
              <p className={style.descriptionP}> {details.brand}</p>
              <p className={style.titlesP}>Categories:</p>
              <ul className={style.unorderedList}>
                {details &&
                  details.categories &&
                  details.categories.length > 0 &&
                  details.categories.map((category) => {
                    return (
                      <li key={category.name} className={style.listItem}>
                        {category.name}
                      </li>
                    );
                  })}
              </ul>
              <p className={style.titlesP}>Owner:</p>
              <p className={style.descriptionP}> {details && details.user && details.user.username}</p>
              <p className={style.titlesP}>Stock:</p>
              <p className={style.descriptionP}> {details.stock}</p>
              <p className={style.titlesP}>Total cost:</p>
              <p className={style.descriptionP}>${details.price && details.price.originalprice}</p>
              <p className={style.titlesP}>Discount:</p>
              <p className={style.descriptionP}>{details.price && details.price.discount ? `${details.price.discount} until ${details.price.expiresin}` : "No discount."}</p>
              {/* {details.price && details.price.discount && <p>Discount expire time: {details.price.expiresin ? details.price.expiresin : "Without limit."}</p>} */}
            </div>
            {/* <div className={style.separationDivOne}></div> */}
            {/* <div className={style.costOwnerDiv}> */}
            {/* </div> */}
          </div>
        </div>
        <div className={style.botSection}>
          <div className={style.reviewsDiv}>
            <p className={style.reviewsTitleP}>Reviews:</p>
            <div className={style.reviewsDiv2}>
              {details && details.Reviews && details.Reviews.length > 0 ? (
                details.Reviews.map((review) => {
                  return (
                    <div className={style.reviewsCard}>
                      <div className={style.reviewHead}>
                        <div className={style.userDiv}>
                          <p className={style.reviewTitles}>User:</p>
                          <p className={style.reviewP}> {review.user.username}</p>
                        </div>
                        <div className={style.scoreDiv}>
                          <p className={style.reviewTitles}>Score:</p>
                          <p className={style.reviewP}>{review.score}/5</p>
                        </div>
                      </div>
                      <div className={style.reviewDescriptionDiv}>
                        <p className={style.reviewTitles}>Description:</p>
                        <p className={style.reviewDescriptionP}>{review.description ? `"${review.description}"` : "No description."}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <p>No reviews.</p>
                </div>
              )}
            </div>
          </div>
          <div className={style.wishlistDiv}>
            <p className={style.wishlistTitle}>Added to wishlist by:</p>
            <ul className={style.ulWishlist}>
              {details && details.favorites && details.favorites.length > 0 ? (
                details.favorites.map((favorite) => (
                  <li key={favorite.user.username} className={style.wishlistLi}>
                    {favorite.user.username}
                  </li>
                ))
              ) : (
                <p>This product doesn't belong to anyones wishlist.</p>
              )}
            </ul>
          </div>
          <div className={style.discountDiv}>
            <p className={style.discountTitle}>Apply Discount</p>
            <form className={style.discountForm} onSubmit={discountSubmitHandler}>
              <div>
                <label htmlFor="discount">Discount percentage:</label>
                <p>warning*number between 10 and 90</p>
                <input id="discount" type="number" defaultValue="10" min={10} max={90} onChange={onDiscountInputChange} />
              </div>
              <div>
                <label htmlFor="expire">Expire date</label>
                <p>warning*valid date</p>
                <input id="expire" type="date" defaultValue={minDate} onChange={onDateInputChange} />
              </div>
              <button className={style.discountButton} type="submit">
                Confirm discount
              </button>
            </form>
          </div>
          <div className={style.deleteButtonDiv}>
            <div className={deleteTry ? style.deletBorderDivActive : style.deletBorderDiv}>
              {!deleteTry && (
                <button className={style.deleteButton} id="delete" onClick={deleteTryHandler}>
                  Delete product
                </button>
              )}
              {deleteTry && (
                <div>
                  <p className={style.deleteWarning}>{`You're about to delete a product from the data base. Do you want to complete this action?`}</p>
                  <button className={style.yesButton} onClick={deleteActionHandler}>
                    Yes, continue.
                  </button>
                  <button className={style.noButton} id="cancel" onClick={deleteTryHandler}>
                    No, abort the action.
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
