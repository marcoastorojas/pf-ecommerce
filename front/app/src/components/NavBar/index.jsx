import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { ADMIN_ROLE } from "../../validations/usersTypes";

import { getCategories, getSearchCategory, newSearchProducts } from "../../redux/actions";
import { BUYER_ROLE } from "../../validations/usersTypes";

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
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCategories(true));
  }, [dispatch]);

  const [showCategories, setShowCategories] = useState(false);

  const onCategorySelection = (e) => {
    dispatch(newSearchProducts(null, null, null, null, e.target.id));
    dispatch(getSearchCategory([e.target.id, e.target.name]));
  };

  function showCategoriesHandler() {
    showCategories ? setShowCategories(false) : setShowCategories(true);
  }

  // const handleSignOut = () => {
  //   // setUser({})
  //   dispatch(setUserGoogle({}, true));
  //   localStorage.removeItem("user");
  //   navigate("/");
  //   // document.getElementById('sigInDiv').hidden = false
  // };

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
  // const btnUpSel = () => {
  //   dispatch(upgradeToSeller(JSON.parse(localStorage.user).uid, "SELLER_ROLE"));
  //   // console.log('pepe')
  // };

  const HideShoppCart = () => {
    const cartDisp = document.querySelector("#shoppCartNavBar");
    if (cartDisp.className === style.shoppCartMenuHidden) cartDisp.className = style.shoppCartMenu;
    else cartDisp.className = style.shoppCartMenuHidden;
  };
  return (
    <header className={style.header}>
      <div className={style.sectionOne}>
        <div className={style.logoAndSB}>
          <Link to={"/"} className={style.logoLink}>
            {/* <p className={style.logo}>PF: e-commerce</p> */}
            <p className={style.plus}>
              <b>Plus</b>
            </p>
            <p className={style.hardware}>hardware</p>
          </Link>
          <SearchBar />
        </div>
        <nav className={style.navButtons}>
          <NavLink to="/" className={({ isActive }) => (isActive ? style.activeLink : style.navBarLinks)}>
            Home
          </NavLink>
          <NavLink
            to="/product/create"
            className={({ isActive }) => (isActive ? style.activeLink : style.navBarLinks)}
            hidden={user && localStorage.user && Object.keys(user).length !== 0 && JSON.parse(localStorage.user).roleId !== BUYER_ROLE ? false : true}
          >
            Upload your product
          </NavLink>
          <div className={style.contCate}>
            <h3 onClick={showCategoriesHandler} className={style.categoriesButton}>
              Categories
              <div className={style.categoriasChikito}>
                {categories[0] &&
                  categories.map((e, index) => {
                    const { id, name } = e;
                    return (
                      <div key={index}>
                        <Link className={style.enlace} key={id} name={name} id={id} to={`/results`} onClick={onCategorySelection}>
                          {name}
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </h3>
          </div>
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
        {user.roleId !== ADMIN_ROLE ? (
          <div className={style.cartDiv}>
            <div className={style.cartDivInfo} onClick={HideShoppCart}>
              <img src={cartI} alt="Cart" />
              <span>{cart.length}</span>
            </div>
            <div id="shoppCartNavBar" className={style.shoppCartMenuHidden}>
              <ShoppingCart />
            </div>
          </div>
        ) : (
          <></>
        )}
        {ADMIN_ROLE === user.roleId && (
          <button className={style.buttonToAdmin} onClick={() => navigate("/soyadmin/users")}>
            Admin interface.
          </button>
        )}
      </div>
    </header>
  );
}
