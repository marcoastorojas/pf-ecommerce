import { GET_PRODUCTS, GET_PRODUCTS_BY_NAME, GET_PRODUCT_BY_ID, CLEAR_DETAIL } from "./actions";

const initialState = {
 products: [],
 allProducts: [],
 searchedProducts: [],
 product: {},
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
  default:
   return state;
 }
};
