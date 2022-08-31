import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setUserGoogle } from "../../redux/actions";

import style from "./index.module.css";

export default function UserInfoSideBar(selectedPage) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function setComponentToRender(page) {
    navigate(`/user/${page}`);
  }

  const handleLogOut = () => {
    dispatch(setUserGoogle({}, true));
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <aside className={style.userAside}>
      <div>
        <div className={style.userPage} onClick={() => setComponentToRender("info")}>
          Profile information
        </div>
        <div className={style.userPage} onClick={() => setComponentToRender("orders")}>
          Your orders
        </div>
        <div className={style.userPage} onClick={() => setComponentToRender("wishlist")}>
          Wishlist
        </div>
        <div className={style.lastUserPage} onClick={() => setComponentToRender("reviews")}>
          Your product reviews
        </div>
      </div>
      <div className={style.logOutDiv} onClick={handleLogOut}>
        Log out
      </div>
    </aside>
  );
}
