import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
import style from  "./ProductDetail.module.css";

import Add from "../../media/images/add-cart.svg";
import Del from "../../media/images/delete.svg";
import SellerDetails from "../SellerDetails";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeAllFromCart, addReview, delReview, getUserReviews, updateReview} from "../../redux/actions";
import { Toaster, toast } from "react-hot-toast";

export default function ProductDetail({ product }) {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState(product.images.split(" "));
  const [quantity, setQuantity] = useState(1);

  const [showEdit, setShowEdit] = useState(false);

  const user = useSelector((state) => state.user);
  const reviews = useSelector((state) => state.reviews)

  //Review
  const [review, setReview] = useState({
    id: user.uid ? user.uid : "",
    score:0,
    description: "",
  })

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    
    if(user.uid) dispatch(getUserReviews(user.uid));
  }, [cart]);

  useEffect(() => {
    if(user.uid) dispatch(getUserReviews(user.uid));
  }, [review])

  const changeImage = (e) => {
    setIndex(+e.target.id);
  };

  const addCart = () => {
    dispatch(addToCart(product, +quantity));
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
    e.preventDefault()
    dispatch(addReview(review, product.id))
  
    setTimeout(() => {
      setReview({
        id: user.uid,
        score: 0,
        description: "",
      })
    }, 1500)
  }

  const delRw = () => {
    dispatch(delReview(user.uid, product.id))

    setTimeout(() => {
    setShowEdit(false)
      setReview({
        id: user.uid,
        score:0,
        description: "",
      })
    }, 1500)
  }

  const updateRw = (e) => {
    e.preventDefault()
    dispatch(updateReview(review, product.id));

    setTimeout(() => {
      setShowEdit(false)
      setReview({
        id: user.uid,
        score:0,
        description: "",
      })
    }, 1500)
  }

  const handleChange= (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className={style.contProDet}>
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
            <SellerDetails />
          </div>
          <div className={style.shopping}>
            <div className={style.pricing}>
              {/* <div className={style.quant}> */}
              <h4>Quantity: {quantity}</h4>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
                {/* <div className="quantity">{quantity}</div> */}
              {/* </div> */}
              <h2>Total: ${Intl.NumberFormat().format(product.price * quantity)}</h2>
              {/* <div className={style.total}>
                Total:{" "}
                <span>
                  ${Intl.NumberFormat().format(product.price * quantity)}
                </span>
              </div> */}
            </div>
            <div className={style.buttons}>
              <button className={style.buttonProdDet} onClick={() => addCart()}>
                <span className={style.text}>Add to cart</span>
                <span className={style.icon}>
                  <img src={Add} alt="add-cart" />
                </span>
              </button>
              <button className={style.buttonProdDet} onClick={() => deleteFromCart()}>
                <span className={style.text}>Delete All</span>
                <span className={style.icon}>
                  <img src={Del} alt="delete-cart" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={style.comments}>
        <h2>Comments:</h2>
        {reviews.length > 0 && reviews.map((rw, index) => {
          if(product.id === rw.productId) return <div className={style.commentSec} key={index}>
            <h3>{user.username}</h3>
              <div className={style.commentData}>
                <h4>Score: {rw.score}</h4>
                <p>{rw.description}</p>
              </div>
            <div className={style.commentButtons}>
              <button onClick={() => delRw()}>Delete</button>
              {!showEdit ? <button onClick={() => setShowEdit(true)}>Edit</button>: null}
            </div>
            </div>
           })
          }
          
          <div>
      {reviews.length >= 0 && !reviews.filter((rw) => rw.productId === product.id).length ?<div>
                <form onSubmit={(e) => addRw(e)}>
                    <div className={style.score}>
                        <label>Score:</label>
                    <input type="range" min="0" max="5" step="1" name="score" value={review.score} onChange={(e) => handleChange(e)} />
                    {review.score}
                    </div>
                    <div className={style.descriptionComment}>
                        <label>Description:</label>
                        <input type="text" name="description" value={review.description} onChange={(e) => handleChange(e)} />
                    </div>
                        <input type="submit" value="Add comment" className={style.submitComment}/>
                </form>
            </div> : null}
      </div>
      <div>
        {showEdit ? <form onSubmit={(e) => updateRw(e)}>
          <div className={style.score}>
            <label>Score:</label>
            <input type="range" min="0" max="5" step="1" name="score" value={review.score} onChange={(e) => handleChange(e)} />
            {review.score}
          </div>
          <div className={style.descriptionComment}>
            <label>Description:</label>
            <input type="text" name="description" value={review.description} onChange={(e) => handleChange(e)} />
          </div>
          <input type="submit" value="Add edit" className={style.submitComment}/>
        </form>: null}
      </div>
          
      </div>
      <Toaster />
  </div>
  );
}
