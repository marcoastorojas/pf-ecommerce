import { GET_PRODUCTS, GET_PRODUCTS_BY_NAME } from "./actions";

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
  default:
   return state;
 }
};
