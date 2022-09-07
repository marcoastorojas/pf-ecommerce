import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  // cleanseProductDetails,
  deleteProduct,
  postDiscount,
} from "../../../redux/actions";

import closeCross from "../../../media/svg/round_cross.svg";
import greenCheckmark from "../../../media/svg/green_checkmark_icon.svg";
import redX from "../../../media/svg/red_x_icon.svg";

import style from "./index.module.css";
import { useEffect } from "react";

export default function AdminDetailModal({ details, closeDetailHandler }) {
  const dispatch = useDispatch();

  const postingDiscount = useSelector((state) => state.postingDiscount);
  const discountPosted = useSelector((state) => state.discountPosted);
  const discounTerror = useSelector((state) => state.discounTerror);

  const date = new Date();
  const todayDate = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  const todayMonth = date.getMonth() >= 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const todayYear = date.getFullYear();
  // const minDate = `${todayDate}-${todayMonth}-${todayYear}`;
  const inputMinDate = `${todayYear}-${todayMonth}-${todayDate}`;
  const maxInputDate = `2050-12-31`;

  const [deleteTry, setDeleteTry] = useState(false);
  const [discountInput, setDiscountInput] = useState(0.1);
  const [discountDate, setDiscountDate] = useState(inputMinDate);
  const [emptyOrIncompleteDiscountValues, setemptyOrIncompleteDiscountValues] = useState(false);

  const dateRE = /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/;
  // const validDate = dateRE.test(discountDate);

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
    console.log(e.target.value);
    console.log(dateRE.test(e.target.value));
    if (dateRE.test(e.target.value) && discountDate) setDiscountDate(e.target.value);
  }

  const discountSubmitHandler = (e) => {
    e.preventDefault();
    let discountSubmit = { discountInput, discountDate };
    if (discountInput && discountDate) {
      console.log(discountSubmit);
      dispatch(postDiscount(details.id, discountSubmit));
    } else {
      setemptyOrIncompleteDiscountValues(true);
      console.log({ m: "Empty or incomplete discount values" });
    }
  };

  const onSuspendDiscout = () => {
    let nullDiscount = { discountInput: "0", discountDate: inputMinDate };
    dispatch(postDiscount(details.id, nullDiscount));
  };

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
              <p className={style.descriptionP}>
                {details.price && details.price.discount ? `${details.price.discount * 100} until ${details.price.expiresin.slice(0, 10)}` : "No discount."}
              </p>
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
                <label className={style.discountP} htmlFor="discount">
                  Discount percentage:
                </label>
                <br />
                {/* {discountInput < 10 || discountInput > 90 ? <p>*The percentage must be a number between 10 and 90</p> : null} */}
                <input className={style.discountInput} id="discount" type="number" defaultValue="10" min={10} max={90} onChange={onDiscountInputChange} />
              </div>
              <div>
                <label className={style.discountP} htmlFor="expire">
                  Expire date:
                </label>
                <br />
                {/* <p>warning*valid date</p> */}
                <input className={style.discountDate} id="expire" type="date" defaultValue={inputMinDate} min={inputMinDate} max={maxInputDate} onChange={onDateInputChange} />
              </div>
              {details && details.price && details.price.discount ? (
                <button className={style.finishDiscountButton} type="button" onClick={onSuspendDiscout}>
                  Finish discount
                </button>
              ) : (
                <button className={style.discountButton} type="submit">
                  Confirm discount
                </button>
              )}
              <div className={style.dateWarningDiv}>
                {postingDiscount ? (
                  <div className={style.discountLoader}></div>
                ) : discountPosted ? (
                  <img className={style.succesOrErrorSVG} src={greenCheckmark} alt="green checkmark" />
                ) : (
                  discounTerror === "yes" && <img className={style.succesOrErrorSVG} src={redX} alt="red x" />
                )}
              </div>
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
