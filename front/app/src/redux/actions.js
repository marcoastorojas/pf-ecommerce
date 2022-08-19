import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
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

export const getProductsByName = (textInput) => {
 return (dispatch) => {
  axios
   .get(`http://localhost:3001/products?name=${textInput}`)
   .then((response) => {
    console.log({ from: "action creator getProductsById", response: response });
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
