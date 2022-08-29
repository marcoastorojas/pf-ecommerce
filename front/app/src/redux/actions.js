import { toast } from "react-hot-toast";
import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const POST_PRODUCT = "POST_PRODUCT";

export const GET_PRODUCTS_BY_NAME = "GET_PRODUCTS_BY_NAME";
export const CLEAR_DETAIL = "CLEAR_DETAIL";

export const GET_PRODUCTS_FILTER = "GET_PRODUCTS_FILTER";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const RESULTS_FOUND = 'RESULTS_FOUND';

export const GET_SUB_CATEGORIES = "GET_SUB_CATEGORIES";
export const GET_CATEGORY_PRODUCTS_BY_ID = "GET_CATEGORY_PRODUCTS_BY_ID";

export const GET_SEARCH_NAME = "GET_SEARCH_NAME";
export const GET_SEARCH_CATEGORY = "GET_SEARCH_CATEGORY";
// SIGNUP
export const POST_USER = "POST_USER";
export const POST_USER_ERROR = "POST_USER_ERROR";
export const POST_USER_ERROR_CLEANSE = "POST_USER_ERROR_CLEANSE";
// LOGIN
export const SET_USER_GOOGLE = "SET_USER_GOOGLE";
export const LOG_IN = "LOG_IN";
export const ERROR_HANDLE = "ERROR_HANDLE";

//SHOPPING CART
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART";
export const REMOVE_ALL_FROM_CART = "REMOVE_ALL_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const ADD_ONE_FROM_CART = "ADD_ONE_FROM_CART";
export const GET_TOTAL = "GET_TOTAL";

//PAYMENT
export const SEND_PAYMENT = "SEND_PAYMENT";

const BASE_URL = `http://localhost:3001/api`;

export const getProducts = (page) => {
  const url = new URL(`${BASE_URL}/products`)
  if(page > 0) url.searchParams.append('page', page)
 return async function (dispatch) {
  try {
   let json = await axios.get(url.href);
   return dispatch({
    type: GET_PRODUCTS,
    payload: json.data,
   });
  } catch (error) {
   console.log(error);
  }
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
   const response = await axios.post(`${BASE_URL}/products`, product);
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
  toast.loading('Searching...')
  return (dispatch) => {
   dispatch({
     type: RESULTS_FOUND,
     payload: true
   })
  dispatch({
    type:GET_PRODUCTS_BY_NAME,
    payload: []
  })
  axios
   .get(`${BASE_URL}/products?name=${textInput}`)
   .then((response) => {
     // console.log({
       //  from: "action creator getProductsById",
       //  response: response,
       // });
      //  console.log('BY NAME; ', response.data.data)
       response.data.data.length>0 ?
       dispatch({
         type: GET_PRODUCTS_BY_NAME,
     payload: response.data.data,
    })
    :  dispatch({
      type: RESULTS_FOUND,
      payload: false
    })
    toast.dismiss()
   })
   .catch((err) => {
    toast.err('No results')
    // console.log({ from: "action creator getProductsByName", err });
    dispatch({
      type: RESULTS_FOUND,
      payload: false
    })
   });
 };
};

export const getProductsFilter = (name, max, min, asc, desc) => {
  toast.loading('Searching...')
 let url = new URL(`${BASE_URL}/products`);
 if (!!name) url.searchParams.append("name", name);
 if (!!max) url.searchParams.append("max", max);
 if (!!min) url.searchParams.append("min", min);
 if (!!asc) url.searchParams.append("asc", asc);
 if (!!desc) url.searchParams.append("desc", desc);
 //  console.log(url.href);
 return (dispatch) => {
  toast.dismiss()
  dispatch({ type: RESULTS_FOUND, payload: true })

  axios
   .get(url.href)
   .then((response) => {
    response.data.data.length > 0
    ? dispatch({ type: GET_PRODUCTS_FILTER, payload: response.data.data })
    : dispatch({ type: RESULTS_FOUND, payload: false })
   })
   .catch((err) => {
    toast.err('No results')
    dispatch({ type: RESULTS_FOUND, payload: false })
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

export const getCategoryProductsById = (
 categoryId,
 name,
 max,
 min,
 asc,
 desc
) => {
  toast.loading('Searching...')
 let url = new URL(`${BASE_URL}/products/category/${categoryId}`);
 if (!!name) url.searchParams.append("name", name);
 if (!!max) url.searchParams.append("max", max);
 if (!!min) url.searchParams.append("min", min);
 if (!!asc) url.searchParams.append("asc", asc);
 if (!!desc) url.searchParams.append("desc", desc);
 return (dispatch) => {
   dispatch({
     type: GET_CATEGORY_PRODUCTS_BY_ID,
     payload: []
   })
   dispatch({
     type: RESULTS_FOUND,
     payload: true
   })
  axios
   .get(url.href)
   .then((response) => {
    // console.log({
    //  from: "action creator getCategoryProductsById",
    //  response,
    // });
    toast.dismiss()
    response.data.data.length
    ? dispatch({
     type: GET_CATEGORY_PRODUCTS_BY_ID,
     payload: response.data.data,
    })
    : dispatch({
      type: RESULTS_FOUND,
      payload: false
    })
   })
   .catch((err) => {
     // console.log({
     //  m: "Error on action creator getCategoryProductsById",
     //  err,
     // })
     dispatch({
       type: RESULTS_FOUND,
       payload: false
     })
     toast.error('No results')
   }
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

export const addToCart = (product, amount) => {
 return {
  type: ADD_TO_CART,
  payload: { amount, product },
 };
};

export const removeAllFromCart = (id) => {
 return {
  type: REMOVE_ALL_FROM_CART,
  payload: id,
 };
};

export const removeOneFromCart = (id) => {
 return {
  type: REMOVE_ONE_FROM_CART,
  payload: id,
 };
};

export const addOneFromCart = (id) => {
 return {
  type: ADD_ONE_FROM_CART,
  payload: id,
 };
};

export const getTotal = () => {
 return {
  type: GET_TOTAL,
 };
};

export const clearCart = () => {
 return {
  type: CLEAR_CART,
 };
};

export const setUserGoogle = (payload, logOut = false) => {
  if (logOut) {
    return (dispatch) => {
      dispatch({
    type: SET_USER_GOOGLE,
    payload,
  });
};
} else {
  return (dispatch) => {
    toast.loading('Loading...')
    axios({
    method: "POST",
    url: `${BASE_URL}/auth/google`,
    headers: {
     token: payload,
    },
   })
    .then((response) => {
      toast.dismiss()
     console.log(response.data.user);
     dispatch({
      type: SET_USER_GOOGLE,
      payload: response.data.user,
     });
     localStorage.setItem("user", JSON.stringify(response.data.user));
     toast.success('Welcome ' + response.data.user.name)
    })
    .catch((err) => {
      toast.dismiss()
     console.log("ErrorCATCHGOOGLE", err.response);
     dispatch({
      type: ERROR_HANDLE,
      payload: err?.response,
     });
     toast.error('Error when signing in with google')
    });
  };
 }
};

export const postUser = (newUser) => {
 return (dispatch) => {
  axios
   .post(`${BASE_URL}/auth/signup`, newUser)
   .then((response) => {
    console.log({ from: "postUser action creator", response });
    dispatch({
     type: POST_USER,
     payload: response.data,
    });
   })
   .catch((err) => {
    console.log({ m: "Error on postUser action creator", err });
    dispatch({
     type: POST_USER_ERROR,
     payload: err.response.data.errors,
    });
   });
 };
};

export const cleanSignupErrors = () => {
 return (dispatch) => {
  dispatch({
   type: POST_USER_ERROR_CLEANSE,
  });
 };
};

export const logIn = (user) => {
//  console.log('ACTIONS: ', user)
  toast.loading('Loading...');
 return (dispatch) => {
  axios({
   method: "POST",
   url: `${BASE_URL}/auth/signin`,
   data: user,
  })
   .then((response) => {
    toast.dismiss()
    // console.log('RESPONSE: ', response)
    dispatch({
     type: LOG_IN,
     payload: response.data.user,
    });
    // console.log('RESOUESTA DE REXU ANTES DE AAAAA.', response)
    localStorage.setItem("user", JSON.stringify(response.data.user));
    // console.log(response.data.token)
    document.cookie ='token=' + response.data.token
    // axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`
    toast.success(`Welcome ${response.data.user.username}`)
   })
   .catch((err) => {
     toast.dismiss()
    // console.log(err.response.data.errors)
    dispatch({
     type: ERROR_HANDLE,
     payload: err.response.data.errors,
    });
    toast.error(`${Object.keys(err.response.data.errors)[0]}: ${Object.values(err.response.data.errors)[0]}`)
   });
 };
};

export const sendPayment = (dataPayment) => {
 return async function (dispatch) {
  try {
   const response = await axios.post(`${BASE_URL}/payment`, dataPayment);
   const response_1 = await axios.get(`${BASE_URL}/payment`);
   console.log(response);
   console.log(response_1);
   return dispatch({
    type: SEND_PAYMENT,
    payload: response.data,
   });
  } catch (error) {
   console.log("Error, can not fetch payment", { error: error });
  }
 };
};
