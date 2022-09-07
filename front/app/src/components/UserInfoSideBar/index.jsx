import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setUserGoogle } from "../../redux/actions";
import { BUYER_ROLE } from "../../validations/usersTypes";

import style from "./index.module.css";

export default function UserInfoSideBar(selectedPage) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user)
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
          My shopping
        </div>
        <div className={style.userPage} onClick={() => setComponentToRender("wishlist")}>
          Wishlist
        </div>
        <div className={style.userPage} onClick={() => setComponentToRender("reviews")}>
          My reviews
        </div>
        {
          user.roleId === BUYER_ROLE?
        <div className={style.lastUserPage} onClick={() => setComponentToRender("upgrade")}>
          Be a Seller
        </div>
        : <></>
        }
      </div>
      <div className={style.logOutDiv} onClick={handleLogOut}>
        Log out
      </div>
    </aside>
  );
}
