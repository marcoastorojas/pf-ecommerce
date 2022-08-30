// import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

import ProfileInfo from "../ProfileInfo";

export default function UserComponentContainer() {
  const params = useParams();

  // useEffect(() => {
  //   console.log(params);
  // }, [params]);

  switch (params.component) {
    case "info":
      return <ProfileInfo />;
    case "orders":
      return <div>futuro comp orders</div>;
    case "wishlist":
      return <div>futuro comp wishlist</div>;
    case "reviews":
      return <div>futuro comp reviews</div>;

    default:
      return <Navigate to="/" />;
  }
}
