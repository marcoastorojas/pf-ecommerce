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
  SET_SUCCESS_PAYMENT,

  //WISHLIST
  ADD_FAVOURITES,
  DEL_FAVOURITES,
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
  searchCategory: "",
  signupResponse: {},
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},
  signupErrors: null,
  errorsLogIn: {},
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  cartTotal: 0,
  dataPayment: {},
  dataSuccessPayment: {},
  favourites: localStorage.getItem("fav")
    ? JSON.parse(localStorage.getItem("fav"))
    : [],
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

    //SHOPPING CART
    case ADD_TO_CART: {
      const getCart = state.cart.filter(
        (pt) => pt.product.id === action.payload.product.id
      );
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
      } else
        localStorage.setItem(
          "cart",
          JSON.stringify([...state.cart, action.payload])
        );
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    }
    case REMOVE_ONE_FROM_CART: {
      const getCart = state.cart.filter(
        (pt) => pt.product.id === action.payload
      );
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
          const newProducts = state.cart.filter(
            (pt) => pt.product.id !== action.payload
          );
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
      const getCart = state.cart.filter(
        (pt) => pt.product.id === action.payload
      );
      if (getCart.length === 1) {
        const newProducts = state.cart.filter(
          (pt) => pt.product.id !== action.payload
        );
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
      const getCart = state.cart.filter(
        (pt) => pt.product.id === action.payload
      );
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
          const newProducts = state.cart.filter(
            (pt) => pt.product.id !== action.payload
          );
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
    case GET_TOTAL: {
      if (state.cart.length > 0) {
        const total = state.cart.reduce(
          (acc, pt) => (acc = pt.product.price * pt.amount + acc),
          0
        );
        return {
          ...state,
          cartTotal: total,
        };
      } else {
        return {
          ...state,
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
    case SET_SUCCESS_PAYMENT: {
      return {
        ...state,
        dataSuccessPayment: action.payload,
      };
    }
    case ADD_FAVOURITES: {
      const getFavourites = state.favourites.find(
        (product) => product.id === action.payload.id
      );

      if (getFavourites) {
        return {
          ...state,
        };
      } else
        return {
          ...state,
          favourites: [...state.favourites, action.payload],
        };
    }
    case DEL_FAVOURITES: {
      const newFavourites = state.favourites.filter(
        (product) => product.id !== action.payload
      );
      return {
        ...state,
        favourites: newFavourites,
      };
    }
    default:
      return state;
  }
};
