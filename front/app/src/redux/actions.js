import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const POST_PRODUCT = "POST_PRODUCT";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const GET_PRODUCTS_BY_NAME = "GET_PRODUCTS_BY_NAME";
export const GET_PRODUCTS_FILTER = "GET_PRODUCTS_FILTER";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_SEARCH_NAME = "GET_SEARCH_NAME";
export const GET_CATEGORY_PRODUCTS_BY_ID = "GET_CATEGORY_PRODUCTS_BY_ID";
export const GET_SUB_CATEGORIES = "GET_SUB_CATEGORIES";
export const GET_SEARCH_CATEGORY = "GET_SEARCH_CATEGORY";
export const SET_USER_GOOGLE = "SET_USER_GOOGLE";

const BASE_URL = `http://localhost:3001`;

const BASE_URL = 'http://localhost:3001'

export const getProducts = () => {
  return async function (dispatch) {
   try {
    let json = await axios.get(`${BASE_URL}/products`);
    return dispatch({
     type: GET_PRODUCTS,
     payload: json.data,
    });
   } catch (error) {
    console.log(error);
   }
  };
 };
};

export const getProductId = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      return dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      console.log(`can not find product with id: ${id}`, error);
    }
  };
};

export const postProduct = (product) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `${BASE_URL}/products`,
        product
      );
      return dispatch({
        type: POST_PRODUCT,
        payload: response.data,
      });
    } catch (error) {
      console.log("can not post product", error);
    }
  };
};

export const clearDetail = () => {
 return {
  type: CLEAR_DETAIL,
 };
};

export const getProductsByName = (textInput) => {

  return (dispatch) => {
    axios
      .get(`${BASE_URL}/products?name=${textInput}`)
      .then((response) => {
        console.log({
          from: "action creator getProductsById",
          response: response,
        });
        dispatch({
          type: GET_PRODUCTS_BY_NAME,
          payload: response.data.data,
        });
      })
      .catch((err) => {
        console.log({ from: "action creator getProductsByName", err });
      });
  };
};

export const getProductsFilter = (name, max, min, asc, desc) => {
  let url = new URL(`${BASE_URL}/products`);
  if (!!name) url.searchParams.append("name", name);
  if (!!max) url.searchParams.append("max", max);
  if (!!min) url.searchParams.append("min", min);
  if (!!asc) url.searchParams.append("asc", asc);
  if (!!desc) url.searchParams.append("desc", desc);
 //  console.log(url.href);
 return (dispatch) => {
  axios
   .get(url.href)
   .then((response) => {
    dispatch({ type: GET_PRODUCTS_FILTER, payload: response.data.data });
   })
   .catch((err) => {
    console.log({ from: "action creator getProductsFilter", err });
   });
 };
};

export const getCategories = () => {
 return (dispatch) => {
  axios
   .get(`${BASE_URL}/categories`)
   .then((response) => {
    console.log({ from: "action creator getCategories" });
    dispatch({
     type: GET_CATEGORIES,
     payload: response.data.data,
    });
   })
   .catch((err) =>
    console.log({ m: "Error on action creator getCategories", err })
   );
 };
};


export const getCategoryProductsById = (categoryId, name, max, min, asc, desc) => {
  let url = new URL(`${BASE_URL}/products/category/${categoryId}`);
  if (!!name) url.searchParams.append("name", name);
  if (!!max) url.searchParams.append("max", max);
  if (!!min) url.searchParams.append("min", min);
  if (!!asc) url.searchParams.append("asc", asc);
  if (!!desc) url.searchParams.append("desc", desc);
 return (dispatch) => {
  axios
   .get(url.href)
   .then((response) => {
    console.log({ from: "action creator getCategoryProductsById", response });
    dispatch({
     type: GET_CATEGORY_PRODUCTS_BY_ID,
     payload: response.data.data,
    });
   })
   .catch((err) =>
    console.log({ m: "Error on action creator getCategoryProductsById", err })
   );
 };
};

export const getSearchName = (payload) => {
 return {
  type: GET_SEARCH_NAME,
  payload,
 };
};

export const getSubCategories = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${BASE_URL}/subCategories`);
      return dispatch({
        type: GET_SUB_CATEGORIES,
        payload: response.data,
      });
    } catch (error) {
      console.log(`can not find subcategories`, error);
    }
  };
};

export const getSearchCategory = (payload) => {
 return {
  type: GET_SEARCH_CATEGORY,
  payload,
 };
};

export const setUserGoogle = (payload) => {
 return {
  type: SET_USER_GOOGLE,
  payload,
 };
};
