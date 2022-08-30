import { useEffect, useState } from "react";
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

  useEffect(() => {
    console.log(showUserMenu);
  });

  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleSignOut = () => {
    dispatch(setUserGoogle({}, true));
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className={style.userContainer}>
      <div className={style.userNavDiv} onClick={handleUserMenuClick}>
        <div className={style.imageDiv}>
          <img className={style.profilePic} src={!user.picture ? noProfilePic : user.picture} alt="user profile" referrerPolicy="no-referrer"></img>
        </div>
        <p className={style.username}>{user.username}</p>
        <div className={showUserMenu ? style.userMenu : style.hiddenUserMenu}>
          <Link to="/" className={style.menuLink}>
            Profile
          </Link>
          <Link to="/" className={style.menuLink}>
            Orders
          </Link>
          <Link to="/" className={style.menuLink}>
            Wishlist
          </Link>
          <Link to="/" className={style.menuLink}>
            Reviews
          </Link>
          <button className={style.userMenuButton} onClick={handleSignOut}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
