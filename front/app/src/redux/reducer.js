import {
  GET_PRODUCTS,
  GET_PRODUCTS_BY_NAME,
  GET_PRODUCT_BY_ID,
  CLEAR_DETAIL,
  GET_PRODUCTS_FILTER,
  GET_CATEGORIES,
  GET_CATEGORY_PRODUCTS_BY_ID,
  GET_SEARCH_NAME,
  GET_SUB_CATEGORIES,
  GET_SEARCH_CATEGORY,
  SET_USER_GOOGLE,
  LOG_IN,
  ERROR_HANDLE,
  RESULTS_FOUND,

  //SIGNUP
  POST_USER,
  POST_USER_ERROR,
  POST_USER_ERROR_CLEANSE,

  //SHOPPING CART
  ADD_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  CLEAR_CART,
  ADD_ONE_FROM_CART,
  GET_TOTAL,
  SEND_PAYMENT,
  //eslint-disable-next-line
  SET_SUCCESS_PAYMENT,

  //REVIEWS
  GET_USER_REVIEWS,
  CLEAR_REVIEWS,
  ALL_REVIEWS,

  //USER DATA
  GET_USER_INFO,
  PUT_USER_IMAGE,
  PUT_NEW_USER_INFO,
  VERIFY_CURRENT_PASSWORD,
  VERIFYING_PASSWORD,
  GET_ORDERS,
  //eslint-disable-next-line
  GET_USER_INFO_EXTRA,

  //WISHLIST
  GET_USER_FAVOURITES,
  GET_ALL_USERS,

  //ADMIN
  PUT_CATEGORY_STATE,
  POST_CATEGORY,
  POSTING_CATEGORY,
    
    
  GET_SUCURSAL,
} from "./actions";

const initialState = {
  products: [],
  allProducts: [],
  searchedProducts: [],
  resultsFound: true,
  product: {},
  categories: [],
  search: "",
  subCategories: [],
  searchCategory: ["", ""],
  signupResponse: {},
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
  userInfo: {}, //información adicional del usuario
  verifyingPassword: "no",
  verifiedPassword: null,
  signupErrors: null,
  errorsLogIn: {},
  cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
  cartTotal: 0,
  dataPayment: localStorage.mp ? JSON.parse(localStorage.getItem("mp")) : {},
  //  dataSuccessPayment: {},
  shoppingList: {}, //Guarda todas las compras del usuario activo
  userInfoPage: "",
  reviews: [],
  productsReviews: [],
  dataOrders: {},
  favourites: localStorage.getItem("fav") ? JSON.parse(localStorage.getItem("fav")) : [],
  userInfoExtra: {}, //Info de usuario completa
  allUsers: [], //AllUsersForAdmin
  postingCategory: {
    name: null,
    posting: null,
  },
    sucursal: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
      };
    case GET_PRODUCTS_BY_NAME:
      return {
        ...state,
        searchedProducts: [...action.payload],
      };
    case GET_PRODUCT_BY_ID: {
      return {
        ...state,
        product: action.payload,
      };
    }
    case CLEAR_DETAIL: {
      return {
        ...state,
        product: {},
      };
    }
    case GET_PRODUCTS_FILTER: {
      return {
        ...state,
        searchedProducts: [...action.payload],
      };
    }
    case GET_CATEGORIES:
      return {
        ...state,
        categories: [...action.payload],
      };
    case GET_CATEGORY_PRODUCTS_BY_ID:
      return {
        ...state,
        searchedProducts: [...action.payload],
      };
    case GET_SEARCH_NAME:
      return {
        ...state,
        search: action.payload,
      };
    case GET_SUB_CATEGORIES:
      const info = action.payload.data.map((sc) => {
        return {
          id: sc.id,
          name: sc.name,
        };
      });
      return {
        ...state,
        subCategories: info,
      };
    case GET_SEARCH_CATEGORY:
      return {
        ...state,
        searchCategory: action.payload,
      };
    /*eslint-disable */
    //SHOPPING CART
    case ADD_TO_CART: {
      const getCart = state.cart.filter((pt) => pt.product.id === action.payload.product.id);
      if (getCart.length === 1) {
        state.cart.map((pt) => {
          if (pt.product.id === action.payload.product.id) {
            pt.amount += action.payload.amount;
            return;
          }
        });
        localStorage.setItem("cart", JSON.stringify([...state.cart]));
        return {
          ...state,
          cart: [...state.cart],
        };
      } else localStorage.setItem("cart", JSON.stringify([...state.cart, action.payload]));
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    }
    case REMOVE_ONE_FROM_CART: {
      const getCart = state.cart.filter((pt) => pt.product.id === action.payload);
      if (getCart.length === 1) {
        if (getCart[0].amount > 1) {
          state.cart.map((pt) => {
            if (pt.product.id === action.payload) {
              pt.amount -= 1;
              return;
            }
          });
          localStorage.setItem("cart", JSON.stringify([...state.cart]));
          return {
            ...state,
            cart: [...state.cart],
          };
        } else {
          const newProducts = state.cart.filter((pt) => pt.product.id !== action.payload);
          localStorage.setItem("cart", JSON.stringify(newProducts));
          return {
            ...state,
            cart: newProducts,
          };
        }
      }
      return {
        ...state,
      };
    }
    case REMOVE_ALL_FROM_CART: {
      const getCart = state.cart.filter((pt) => pt.product.id === action.payload);
      if (getCart.length === 1) {
        const newProducts = state.cart.filter((pt) => pt.product.id !== action.payload);
        localStorage.setItem("cart", JSON.stringify(newProducts));
        return {
          ...state,
          cart: newProducts,
        };
      }
      return {
        ...state,
      };
    }
    case ADD_ONE_FROM_CART: {
      const getCart = state.cart.filter((pt) => pt.product.id === action.payload);
      if (getCart.length === 1) {
        if (getCart[0].amount > 0) {
          state.cart.map((pt) => {
            if (pt.product.id === action.payload) {
              pt.amount += 1;
              return;
            }
          });
          localStorage.setItem("cart", JSON.stringify([...state.cart]));
          return {
            ...state,
            cart: [...state.cart],
          };
        } else {
          const newProducts = state.cart.filter((pt) => pt.product.id !== action.payload);
          localStorage.setItem("cart", JSON.stringify(newProducts));
          return {
            ...state,
            cart: newProducts,
          };
        }
      }
      return {
        ...state,
      };
    }
    /*eslint-enable */
    case GET_TOTAL: {
      if (state.cart.length > 0) {
        const total = state.cart.reduce((acc, pt) => (acc = pt.product.price.originalprice * pt.amount + acc), 0);
        return {
          ...state,
          cartTotal: total,
        };
      } else {
        return {
          ...state,
          cartTotal: 0,
        };
      }
    }
    case CLEAR_CART: {
      localStorage.setItem("cart", JSON.stringify([]));
      return {
        ...state,
        cart: [],
      };
    }
    case SET_USER_GOOGLE:
      return {
        ...state,
        user: action.payload,
      };
    case POST_USER:
      return {
        ...state,
        signupResponse: action.payload,
        signupErrors: null,
      };
    case POST_USER_ERROR:
      return {
        ...state,
        signupResponse: {},
        signupErrors: action.payload,
      };
    case POST_USER_ERROR_CLEANSE:
      return {
        ...state,
        signupResponse: {},
        signupErrors: null,
      };
    case LOG_IN:
      return {
        ...state,
        user: action.payload,
        errors: {},
      };
    case ERROR_HANDLE:
      return {
        ...state,
        errorsLogIn: action.payload,
      };
    case SEND_PAYMENT: {
      return {
        ...state,
        dataPayment: action.payload,
      };
    }
    case RESULTS_FOUND: {
      return {
        ...state,
        resultsFound: action.payload,
      };
    }
    // case SET_SUCCESS_PAYMENT: {
    //   return {
    //     ...state,
    //     dataSuccessPayment: action.payload,
    //   };
    // }
    case GET_USER_INFO:
      // const { email, google, info: information, status } = action.payload;
      // const { name, lastname, dni, phone, direction } = information;
      // return {
      //   ...state,
      //   userInfo: {
      //     email,
      //     name,
      //     lastname,
      //     dni,
      //     phone,
      //     direction,
      //     google,
      //     status,
      //   },
      // };
      return {
        ...state,
        userInfo: action.payload,
      };
    case PUT_USER_IMAGE:
      return {
        ...state,
        user: { ...state.user, image: action.payload },
      };
    case PUT_NEW_USER_INFO:
      const newUserData = {
        name: action.payload.name,
        username: action.payload.username,
        email: action.payload.email,
        image: action.payload.image,
      };
      const newUserInfo = {
        name: action.payload.info.name,
        lastname: action.payload.info.lastname,
        dni: action.payload.info.dni,
        phone: action.payload.info.phone,
        number: action.payload.info.number,
        gender: action.payload.info.gender,
        street: action.payload.info.street,
        zipcode: action.payload.info.zipcode,
        country: action.payload.info.country,
        state: action.payload.info.state,
        city: action.payload.info.city,
        birthday: action.payload.info.birthday,
      };
      return {
        ...state,
        user: { ...state.user, ...newUserData },
        userInfo: { ...state.userInfo, info: { ...state.userInfo.info, ...newUserInfo } },
      };
    case VERIFYING_PASSWORD:
      return {
        ...state,
        verifyingPassword: "yes",
      };
    case VERIFY_CURRENT_PASSWORD:
      return {
        ...state,
        verifiedPassword: action.payload,
        verifyingPassword: "no",
      };
    case GET_ORDERS:
      return {
        ...state,
        dataOrders: action.payload,
      };

    // case GET_USER_INFO_EXTRA:
    //   return {
    //     ...state,
    //     userInfoExtra: action.payload
    //   }
    case GET_USER_REVIEWS: {
      return {
        ...state,
        reviews: action.payload,
      };
    }
    case CLEAR_REVIEWS: {
      return {
        ...state,
        reviews: [],
      };
    }

    case GET_USER_FAVOURITES: {
      return {
        ...state,
        favourites: action.payload,
      };
    }
    //ADMIN
    case GET_ALL_USERS: {
      return {
        ...state,
        allUsers: action.payload,
      };
    }
    case ALL_REVIEWS: {
      return {
        ...state,
        productsReviews: action.payload,
      };
    }
    case POSTING_CATEGORY:
      return {
        ...state,
        postingCategory: {
          name: action.payload.name,
          posting: action.payload.state,
        },
      };
    case POST_CATEGORY:
      return {
        ...state,
        postingCategory: {
          name: action.payload.name,
          posting: "posted",
        },
      };
      case GET_SUCURSAL:
          return {
              ...state,
              sucursal: action.payload
          }
    default:
      return state;
  }
};
