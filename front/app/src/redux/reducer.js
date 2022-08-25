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
  POST_USER,

  //SHOPPING CART
  ADD_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  CLEAR_CART,
  ADD_ONE_FROM_CART,
  GET_TOTAL,
} from "./actions";

const initialState = {
  products: [],
  allProducts: [],
  searchedProducts: [],
  product: {},
  categories: [],
  search: "",
  subCategories: [],
  searchCategory: "",
  signUpResponse: {},
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {},
  errors: {},
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  cartTotal: 0,
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

        return {
          ...state,
          cart: [...state.cart],
        };
      } else
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

          return {
            ...state,
            cart: [...state.cart],
          };
        } else {
          const newProducts = state.cart.filter(
            (pt) => pt.product.id !== action.payload
          );
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
        return {
          ...state,
          cart: newProducts,
        };
      }
     });

     return {
      ...state,
      cart: [...state.cart],
     };
    } else {
     const newProducts = state.cart.filter(
      (pt) => pt.product.id !== action.payload
     );
     return {
      ...state,
      cart: newProducts,
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

          return {
            ...state,
            cart: [...state.cart],
          };
        } else {
          const newProducts = state.cart.filter(
            (pt) => pt.product.id !== action.payload
          );
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
    case LOG_IN: 
      return {
        ...state,
        user: action.payload,
        errors: {},
      }
    case ERROR_HANDLE: 
    return {
      ...state,
      errors: action.payload,
    }
    default:
      return state;
  }
  case SET_USER_GOOGLE:
   return {
    ...state,
    userGoogle: action.payload,
   };
  case POST_USER:
   return {
    ...state,
    signUpResponse: action.payload,
   };
  default:
   return state;
 }
};
