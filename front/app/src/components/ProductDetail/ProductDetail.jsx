import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
import style from "./ProductDetail.module.css";

import Add from "../../media/images/add-cart.svg";
import Del from "../../media/images/delete.svg";
import SellerDetails from "../SellerDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeAllFromCart,
  addReview,
  delReview,
  getUserReviews,
  updateReview,
  getProductId,
  
  addFav,
  delFav,
  getUserFav,
} from "../../redux/actions";
import { toast } from "react-hot-toast";
//favorites
import star from "../../media/images/bx-star.svg";
import starF from "../../media/images/bxs-star.svg";
//score
import yellowStar from "../../media/svg/yellow-star.svg";
import yellowBorderStar from "../../media/svg/yellow-border-star.svg";
import { ADMIN_ROLE } from "../../validations/usersTypes";
import yellowStarHalf from "../../media/svg/yellow-star-half.svg";

export default function ProductDetail({ product }) {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState(product.images.split(" "));
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(product.stock);
  const [stockEnCarrito, setStockEnCarrito] = useState(0);

  const [showEdit, setShowEdit] = useState(false);

  const favourites = useSelector((state) => state.favourites);
  const userInfo = useSelector((state) => state.userInfo);
  const user = useSelector((state) => state.user);
  const reviews = useSelector((state) => state.reviews);
  const stockInCart = useSelector(
    (state) =>
      state.cart.filter((pt) => pt.product.id === product.id)[0]?.amount
  );
  //Review
  const [review, setReview] = useState({
    id: user.uid ? user.uid : "",
    score: 0,
    description: "",
  });

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (user.uid) {
        dispatch(getUserReviews(user.uid));
        dispatch(getUserFav(user.uid))
     }
     dispatch(getProductId(product.id));
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    if (user.uid) dispatch(getUserReviews(user.uid));
  }, [cart]);

  useEffect(() => {
    if (user.uid) dispatch(getUserReviews(user.uid));
    dispatch(getProductId(product.id));
  }, [review]);

  const changeImage = (e) => {
    setIndex(+e.target.id);
  };

  const addCart = () => {
    dispatch(addToCart(product, +quantity));
    // console.log('stock', stock, 'quantity', quantity)
    setQuantity(1);
    toast.success(`Successfully added ${quantity} items to the cart!`);
  };

  const deleteFromCart = () => {
    dispatch(removeAllFromCart(product.id));
    toast.success(`Successfully deleted product from the cart!`, {
      style: {
        border: "1px solid #FF2301",
        padding: "16px",
        color: "#FF2301",
      },
      iconTheme: {
        primary: "#FF2301",
        secondary: "#FFFAEE",
      },
    });
  };

  const addRw = (e) => {
    e.preventDefault();
    dispatch(addReview(review, product.id));

    setTimeout(() => {
      setReview({
        id: user.uid,
        score: 0,
        description: "",
      });
    }, 1500);
  };

  const delRw = () => {
    dispatch(delReview(user.uid, product.id));

    setTimeout(() => {
      setShowEdit(false);
      setReview({
        id: user.uid,
        score: 0,
        description: "",
      });
    }, 1500);
  };

  const updateRw = (e) => {
    e.preventDefault();
    dispatch(updateReview(review, product.id));

    setTimeout(() => {
      setShowEdit(false);
      setReview({
        id: user.uid,
        score: 0,
        description: "",
      });
    }, 1500);
  };

  const handleChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };
  
  const addFavourites = () => {
    if(user.uid)  {
    dispatch(addFav(product.id, user.uid));
    setTimeout(() => {
        dispatch(getUserFav(user.uid))
    }, 800)
    }
    else return console.log("LOG IN")
  };

  const delFavourites = () => {
    if(user.uid)  {
    dispatch(delFav(user.uid, product.id));
    setTimeout(() => {
        dispatch(getUserFav(user.uid))
    }, 800)
    }
    else return console.log("LOG IN")
  };
  
  const productScoreRaw = product.Reviews.reduce((acc, rw) => acc += rw.score, 0)
          
     const getScore = (num) => {
        if(num % 1 < 0.5) return Math.floor(num)
        if(num % 1 > 0.5) return Math.ceil(num)
        else return num;
     }
          
   const productScore = getScore(productScoreRaw / product.Reviews.length)
   
   const productFilterFav = favourites.find((pt) => pt.product.id === product.id)
   
   const starImage = productFilterFav? <div className={style.favorites}>
            Add to favorites:
          <img src={starF} alt="fill-star" className={style.star} onClick={() => delFavourites()} />
        </div> : <div className={style.favorites}>
            Add to favorites:
          <img src={star} alt="star" className={style.star} onClick={() => addFavourites()} />
        </div>

  return (
    <div className={style.contProDet}>
      {/* <button onClick={() => console.log(stock-stockInCart)}>PRUEBAPRODUCTO</button> */}
      {/* <button onClick={() => console.log(product)}>PRUEBA</button> */}
      <div className={style.publish}>
        <div className={style.left}>
          <div className={style.prodImgs}>
            <div className={style.otherImgs}>
              {images.map((image, index) => {
                if (index > 0)
                  return (
                    <img
                      src={image}
                      alt={product.brand}
                      key={index}
                      id={index}
                      className="thumb"
                      onClick={(e) => changeImage(e)}
                    />
                  );
              })}
            </div>
            <div className={style.mainImg}>
              <img
                src={images[index]}
                alt={product.brand}
                className="main-image"
              />
            </div>
          </div>
          <div className={style.prodDetails}>
            <h2>{product.title}</h2>
            <h3>Model: {product.model}</h3>
            <h3>Brand: {product.brand}</h3>
            <p>{product.description}</p>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.sellerInfo}>
            <SellerDetails seller={product.user}/>
          </div>
          <div className={style.shopping}>
          <div>
           {userInfo.role?.name === "USER_ROLE" ? starImage : null}
      </div>
            <div className={style.pricing}>
              {/* <div className={style.quant}> */}
              <h4>Stock: {product.stock}</h4>
              <h4>In shopping cart: {stockInCart ? stockInCart : 0}</h4>
              {/* <h4>Available: {stockInCart?(stock - stockInCart).toString(): stock}</h4> */}
              <h4>Quantity: {quantity}</h4>
              <input
                type="range"
                min="1"
                max={stockInCart ? (stock - stockInCart).toString() : stock}
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                disabled={stockInCart ? !(stock - stockInCart) : false}
              />
              {/* <div className="quantity">{quantity}</div> */}
              {/* </div> */}
              <h2>
                Total: $
                {Intl.NumberFormat().format(
                  product.price.originalprice * quantity
                )}
              </h2>
              {/* <div className={style.total}>
                Total:{" "}
                <span>
                  ${product.price.discount ? Intl.NumberFormat().format((product.price * quantity) * product.price.discount) : Intl.NumberFormat().format(product.price * quantity)}
                </span>
              </div> */}
            </div>
            <div className={style.buttons}>
              <button
                className={style.buttonProdDet}
                onClick={() => addCart()}
                disabled={stockInCart ? !(stock - stockInCart) : false}
              >
                <span className={style.text}>Add to cart</span>
                <span className={style.icon}>
                  <img src={Add} alt="add-cart" />
                </span>
              </button>
              {/* <button className={style.buttonProdDet} onClick={() => deleteFromCart()}>
                <span className={style.text}>Delete All</span>
                <span className={style.icon}>
                  <img src={Del} alt="delete-cart" />
                </span>
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className={style.comments}>
        <h3>Product score: {productScore ? productScore : 0}{Array.apply(0, Array(5)).map((str, index) => {
            if(!productScore){
                 if(index + 1 - 0 > 0.5) return <img src={yellowBorderStar} alt="yello-border-star" key={index}/>
                 if(index + 1 - 0 < 0.5) return <img src={yellowStar} alt="yellow-star" key={index}/>
                if(index + 1- 0 === 0.5) return <img src={yellowStarHalf} alt="yellow-star-half" key={index}/>
            } else {
                 if(index + 1 - productScore > 0.5) return <img src={yellowBorderStar} alt="yello-border-star" key={index}/>
                 if(index + 1 - productScore < 0.5) return <img src={yellowStar} alt="yellow-star" key={index}/>
                if(index + 1- productScore === 0.5) return <img src={yellowStarHalf} alt="yellow-star-half" key={index}/>   
                    }
                    }) }</h3>
        <h2>Comments:</h2>
        {product.Reviews.length > 0 &&
          product.Reviews.map((rw, index) => {
            if (
              rw.user.uid === user.uid ||
              user.roleId === ADMIN_ROLE
            ) {
              return (
                <div className={style.commentSec} key={index}>
                  <h3>{rw.user.username}</h3>
                  <div className={style.commentData}>
                    {rw.score}
                    <h4> {Array.apply(0, Array(5)).map((str, index) => {
                        if(index < rw.score) return <img src={yellowStar} alt="yellow-star"/>
                        else return <img src={yellowBorderStar} alt="yello-border-star"/>
                    }) }</h4>
                    <p>{rw.description}</p>
                  </div>
                  <div className={style.commentButtons}>
                    <button onClick={() => delRw()}>Delete</button>
                    {!showEdit ? (
                      <button onClick={() => setShowEdit(true)}>Edit</button>
                    ) : null}
                  </div>
                </div>
              );
            } else
              return (
                <div className={style.commentSec} key={index}>
                  <h3>{rw.user.username}</h3>
                  <div className={style.commentData}>
                    {rw.score}
                    <h4> {Array.apply(0, Array(5)).map((str, index) => {
                        if(index < rw.score) return <img src={yellowStar} alt="yellow-star"/>
                        else return <img src={yellowBorderStar} alt="yello-border-star"/>
                    }) }</h4>
                    <p>{rw.description}</p>
                  </div>
                </div>
              );
          })}

        <div>
          {user.uid &&
          reviews.length >= 0 &&
          user.roleId !== ADMIN_ROLE &&
          !reviews.filter((rw) => rw.productId === product.id).length ? (
            <div>
              <form onSubmit={(e) => addRw(e)}>
                <div className={style.score}>
                  <label>Score:</label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="1"
                    name="score"
                    value={review.score}
                    onChange={(e) => handleChange(e)}
                  />
                  {review.score}
                </div>
                <div className={style.descriptionComment}>
                  <label>Description:</label>
                  <input
                    type="text"
                    name="description"
                    value={review.description}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <input
                  type="submit"
                  value="Add comment"
                  className={style.submitComment}
                />
              </form>
            </div>
          ) : null}
        </div>
        <div>
          {showEdit ? (
            <form onSubmit={(e) => updateRw(e)}>
              <div className={style.score}>
                <label>Score:</label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  name="score"
                  value={review.score}
                  onChange={(e) => handleChange(e)}
                />
                {review.score}
              </div>
              <div className={style.descriptionComment}>
                <label>Description:</label>
                <input
                  type="text"
                  name="description"
                  value={review.description}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <input
                type="submit"
                value="Add edit"
                className={style.submitComment}
              />
            </form>
          ) : null}
        </div>
      </div>
      {/* <Toaster /> */}
    </div>
  );
}
