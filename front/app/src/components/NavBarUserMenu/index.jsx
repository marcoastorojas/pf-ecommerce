import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import style from "./index.module.css";

import noProfilePic from "../../media/images/empty_user_profilepic.png";
import { setUserGoogle } from "../../redux/actions";

export default function NavBarUserMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleUserNavDivClick = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogOut = () => {
    dispatch(setUserGoogle({}, true));
    localStorage.removeItem("user");
    localStorage.setItem("fav", JSON.stringify([]));
    localStorage.setItem("cart", JSON.stringify([]));
    navigate("/");
  };

  return (
    <div className={style.userContainer}>
      <div className={style.userNavDiv} onClick={handleUserNavDivClick}>
        <div className={style.visibleData}>
          <div className={style.imageDiv}>
            <img className={style.profilePic} src={!user.image ? noProfilePic : user.image} alt="user profile" referrerPolicy="no-referrer"></img>
          </div>
          <div className={style.usernameDiv}>
            <p className={style.username}>{user.username}</p>
          </div>
        </div>
        <div className={showUserMenu ? style.userMenu : style.hiddenUserMenu}>
          <Link to="/user/info" className={style.menuLink}>
            Profile
          </Link>
          <Link to="/user/orders" className={style.menuLink}>
            Orders
          </Link>
          <Link to="/user/wishlist" className={style.menuLink}>
            Wishlist
          </Link>
          <Link to="/user/reviews" className={style.menuLink}>
            Reviews
          </Link>
          <button className={style.menuLink} onClick={handleLogOut}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
