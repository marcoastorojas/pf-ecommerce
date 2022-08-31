import { Navigate, useParams } from "react-router-dom";

import ProfileInfo from "../ProfileInfo";
import MyShopping from "../MyShopping/MyShopping.jsx";
import Wishlist from "../Wishlist/Wishlist.jsx";
import Reviews from "../Reviews/Reviews.jsx";
import BeASeller from "../BeASeller/BeASeller.jsx";

export default function UserComponentContainer() {
  const params = useParams();

  switch (params.component) {
    case "info":
      return <ProfileInfo />;
    case "orders":
      return <MyShopping />;
    case "wishlist":
      return <Wishlist />;
    case "reviews":
      return <Reviews />;
    case "upgrade":
      return <BeASeller />;

    default:
      return <Navigate to="/" />;
  }
}
