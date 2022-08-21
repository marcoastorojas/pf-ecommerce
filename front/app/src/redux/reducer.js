import {
 GET_PRODUCTS,
 GET_PRODUCTS_BY_NAME,
 GET_PRODUCT_BY_ID,
 CLEAR_DETAIL,
 GET_PRODUCTS_FILTER,
 GET_CATEGORIES,
 GET_CATEGORY_PRODUCTS_BY_ID,
 GET_SEARCH_NAME,
} from "./actions";

const initialState = {
 products: [],
 allProducts: [],
 searchedProducts: [],
 product: {},
 categories: [],
 search: ""
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
    }
  default:
   return state;
 }
};
