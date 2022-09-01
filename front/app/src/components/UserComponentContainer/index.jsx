import { Navigate, useParams } from "react-router-dom";

import ProfileInfo from "../ProfileInfo";
import MyShoppingContainer from "../MyShoppingContainer/MyShoppingContainer";
import Wishlist from "../Wishlist/Wishlist.jsx";
import Reviews from "../Reviews/Reviews.jsx";
import BeASeller from "../BeASeller/BeASeller.jsx";

import style from "./index.module.css";

export default function UserComponentContainer() {
  const params = useParams();

  switch (params.component) {
    case "info":
      return (
        <div className={style.mainContainer}>
          <ProfileInfo />
        </div>
      );
    case "orders":
      return (
        <div className={style.mainContainer}>
          <MyShoppingContainer />
        </div>
      );
    case "wishlist":
      return (
        <div className={style.mainContainer}>
          <Wishlist />
        </div>
      );
    case "reviews":
      return (
        <div className={style.mainContainer}>
          <Reviews />
        </div>
      );
    case "upgrade":
      return (
        <div className={style.mainContainer}>
          <BeASeller />
        </div>
      );

    default:
      return <Navigate to="/" />;
  }
}
