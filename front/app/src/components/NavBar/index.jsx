import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { ADMIN_ROLE } from "../../validations/usersTypes";

import {
  getCategories,
  getCategoryProductsById,
  // getSearchCategory,
  // getSearchName,
  setUserGoogle,
  upgradeToSeller,
} from "../../redux/actions";
import { BUYER_ROLE, SELLER_ROLE } from "../../validations/usersTypes";

import SearchBar from "../SearchBar";
import NavBarUserMenu from "../NavBarUserMenu";
import ShoppingCart from "../ShoppingCart/ShoppingCart";

import cartI from "../../media/images/cart.svg";

import style from "./index.module.css";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector((state) => state.categories);
  const cart = useSelector((state) => state.cart);
  // const user = JSON.parse(localStorage.getItem('user'))
  const user = useSelector((state) => state.user);
  // const errorRedux = useSelector((state) => state.errorsLogIn);

  useEffect(() => {
    dispatch(getCategories(true));
  }, [dispatch]);

  const [showCategories, setShowCategories] = useState(false);

  const onCategorySelection = (e) => {
    dispatch(getCategoryProductsById(e.target.id));
  };

  function showCategoriesHandler() {
    showCategories ? setShowCategories(false) : setShowCategories(true);
  }

  const handleSignOut = () => {
    // setUser({})
    dispatch(setUserGoogle({}, true));
    localStorage.removeItem("user");
    navigate("/");
    // document.getElementById('sigInDiv').hidden = false
  };

  //Toast Inicio de Sesión
  // useEffect(() => {
  //   if (Object.keys(user).length > 0) {
  //     toast.success(`Welcome ${user.username}`);
  //   }
  // }, [localStorage.user]);
  // useEffect(() => {
  //   if (Object.keys(errorRedux).length > 0) {
  //     toast.error(`${Object.keys(errorRedux)[0]}: ${Object.values(errorRedux)[0]}`);
  //   }
  //   console.log('ERROR REDUX', Object.keys(errorRedux).length)
  // }, [errorRedux])

  //Mejorar de comprador a vendedor
  const btnUpSel = () => {
    dispatch(upgradeToSeller(JSON.parse(localStorage.user).uid, "SELLER_ROLE"));
    // console.log('pepe')
  };

  const HideShoppCart = () => {
    const cartDisp = document.querySelector("#shoppCartNavBar");
    if (cartDisp.className === style.shoppCartMenuHidden) cartDisp.className = style.shoppCartMenu;
    else cartDisp.className = style.shoppCartMenuHidden;
  };
  return (
    <header className={style.header}>
      {/* <Toaster /> */}
      <div className={style.sectionOne}>
        <div className={style.logoAndSB}>
          {" "}
          <Link to={"/"} className={style.logoLink}>
            <p className={style.logo}>PF: e-commerce</p>
          </Link>
          {/* <div className={style.searchBarDiv}> */}
          <SearchBar />
          {/* </div> */}
        </div>
        <nav className={style.navButtons}>
          <div className={style.contCate}>
            <h3 onClick={showCategoriesHandler} className={style.categoriesButton}>
              Categories
              <div className={style.categoriasChikito}>
                {categories[0] &&
                  categories.map((e, index) => {
                    const { id, name } = e;
                    return (
                      <div key={index}>
                        <Link className={style.enlace} key={id} id={id} to={`/results`} onClick={onCategorySelection}>
                          {name}
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </h3>
          </div>
          <Link to="/" className={style.navBarLinks}>
            History
          </Link>
          <Link to="/" className={style.navBarLinks}>
            Sales
          </Link>
          <Link
            to="/product/create"
            className={style.navBarLinks}
            hidden={user && Object.keys(user).length !== 0 && JSON.parse(localStorage.user).roleId !== BUYER_ROLE ? false : true}
          >
            Upload your product
          </Link>
        </nav>
      </div>

      <div className={style.sectionTwo}>
        <div className={style.userOrLoginDiv}>
          {user && Object.keys(user).length !== 0 && <NavBarUserMenu />}
          {/* {user && Object.keys(user).length !== 0 && <button onClick={handleSignOut}>Sign Out</button>} */}
          {Object.keys(user).length === 0 ? (
            <div className={style.logAndSign}>
              <Link to={"/login"} className={style.logIn}>
                Log in
              </Link>
              <Link to={"/signup"} className={style.signUp}>
                Sign up
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* <div>{user && Object.keys(user).length !== 0 && JSON.parse(localStorage.user).roleId !== SELLER_ROLE && <button onClick={btnUpSel}>Upgrade to Seller</button>}</div> */}
        <div className={style.cartDiv}>
          {/* <Link to={"/shopping-cart"} className={style.cartLink}> */}
          <div className={style.cartDivInfo} onClick={HideShoppCart}>
            <img src={cartI} alt="Cart" />
            <span>{cart.length}</span>
          </div>
          <div id="shoppCartNavBar" className={style.shoppCartMenuHidden}>
            <ShoppingCart />
          </div>
          {/* </Link> */}
        </div>
        {ADMIN_ROLE === user.roleId && <button onClick={() => navigate("/soyadmin")}>Back to Admin screen.</button>}
      </div>
    </header>
  );
}
