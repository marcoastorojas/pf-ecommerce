import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const POST_PRODUCT = "POST_PRODUCT";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const GET_PRODUCTS_BY_NAME = "GET_PRODUCTS_BY_NAME";

export const getProducts = () => {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/products");
      return dispatch({
        type: "GET_PRODUCTS",
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
      const response = await axios.get(`http://localhost:3001/products/${id}`);
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
        "http://localhost:3001/products",
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
      .get(`http://localhost:3001/products?name=${textInput}`)
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
