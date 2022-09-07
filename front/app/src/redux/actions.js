import { toast } from "react-hot-toast";
import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const POST_PRODUCT = "POST_PRODUCT";

export const GET_PRODUCTS_BY_NAME = "GET_PRODUCTS_BY_NAME";
export const CLEAR_DETAIL = "CLEAR_DETAIL";

export const GET_PRODUCTS_FILTER = "GET_PRODUCTS_FILTER";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const RESULTS_FOUND = "RESULTS_FOUND";

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
export const SET_SUCCESS_PAYMENT = "SET_SUCCESS_PAYMENT";

//Wishlist
export const GET_USER_FAVOURITES = "GET_USER_FAVOURITES";
export const ADD_FAVOURITES = "ADD_FAVOURITES";
export const DEL_FAVOURITES = "DEL_FAVOURITES";
export const CLEAR_FAVOURITES = "CLEAR_FAVOURITES";

//USER DATA
export const GET_USER_INFO = "GET_USER_INFO";
export const PUT_USER_IMAGE = "PUT_USER_IMAGE";
export const VERIFY_CURRENT_PASSWORD = "VERIFY_CURRENT_PASSWORD";
export const PUT_NEW_PASSWORD = "PUT_NEW_PASSWORD";
export const VERIFYING_PASSWORD = "VERIFYING_PASSWORD";
export const GET_USER_INFO_EXTRA = "GET_USER_INFO_EXTRA";
export const PUT_NEW_USER_INFO = "PUT_NEW_USER_INFO";

//REVIEWS
export const GET_USER_REVIEWS = "GET_USER_REVIEWS";
export const ADD_REVIEW = "ADD_REVIEW";
export const DEL_REVIEW = "DEL_REVIEW";
export const UPDATE_REVIEW = "UPDATE_REVIEW";
export const CLEAR_REVIEWS = "CLEAR_REVIEWS";
export const ALL_REVIEWS = "ALL_REVIEWS";

//ORDERS
export const GET_ORDERS = "GET_ORDERS";

//ADMIN
export const GET_ALL_USERS = "GET_ALL_USERS";
export const PUT_CATEGORY_STATE = "PUT_CATEGORY_STATE";
export const POSTING_CATEGORY = "POSTING_CATEGORY";
export const POST_CATEGORY = "POST_CATEGORY";

const BASE_URL = `http://localhost:3001/api`;

export const getProducts = (page) => {
  // console.log('ACTION')
  toast.loading("Loading products...", {
    id: "Landing",
  });
  const url = new URL(`${BASE_URL}/products`);
  if (page > 0) url.searchParams.append("page", page);
  return async function (dispatch) {
    try {
      axios({
        method: "GET",
        url: url.href,
      }).then((response) => {
        toast.dismiss("Landing");
        dispatch({
          type: GET_PRODUCTS,
          payload: response.data,
        });
      });
    } catch (error) {
      toast.dismiss("Landing");
      console.log(error);
      toast.error("Error loading products");
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
  toast.loading("Searching...", {
    id: "getProductsByName",
  });
  return (dispatch) => {
    dispatch({
      type: RESULTS_FOUND,
      payload: true,
    });
    dispatch({
      type: GET_PRODUCTS_BY_NAME,
      payload: [],
    });
    axios
      .get(`${BASE_URL}/products?name=${textInput}`)
      .then((response) => {
        // console.log({
        //  from: "action creator getProductsById",
        //  response: response,
        // });
        //  console.log('BY NAME; ', response.data.data)
        toast.dismiss("getProductsByName");
        response.data.data.length > 0
          ? dispatch({
              type: GET_PRODUCTS_BY_NAME,
              payload: response.data.data,
            })
          : dispatch({
              type: RESULTS_FOUND,
              payload: false,
            });
      })
      .catch((err) => {
        toast.dismiss("getProductsByName");
        toast.err("No results");
        // console.log({ from: "action creator getProductsByName", err });
        dispatch({
          type: RESULTS_FOUND,
          payload: false,
        });
      });
  };
};

export const getProductsFilter = (name, max, min, asc, desc) => {
  toast.loading("Searching...", {
    id: "SearchFilter",
  });
  let url = new URL(`${BASE_URL}/products`);
  if (!!name) url.searchParams.append("name", name);
  if (!!max) url.searchParams.append("max", max);
  if (!!min) url.searchParams.append("min", min);
  if (!!asc) url.searchParams.append("asc", asc);
  if (!!desc) url.searchParams.append("desc", desc);
  //  console.log(url.href);
  return (dispatch) => {
    toast.dismiss("SearchFilter");
    dispatch({ type: RESULTS_FOUND, payload: true });
    dispatch({ type: GET_PRODUCTS_FILTER, payload: [] });
    axios
      .get(url.href)
      .then((response) => {
        response.data.data.length > 0 ? dispatch({ type: GET_PRODUCTS_FILTER, payload: response.data.data }) : dispatch({ type: RESULTS_FOUND, payload: false });
      })
      .catch((err) => {
        toast.err("No results");
        dispatch({ type: RESULTS_FOUND, payload: false });
        console.log({ from: "action creator getProductsFilter", err });
      });
  };
};

export const getCategories = (onlyActive) => {
  let url = new URL(`${BASE_URL}/categories`);
  if (onlyActive) url.searchParams.append("onlyActive", "true");
  // else url.searchParams.append('onlyActive', 'false')
  return (dispatch) => {
    axios
      .get(url.href)
      .then((response) => {
        // console.log({ from: "action creator getCategories" });
        dispatch({
          type: GET_CATEGORIES,
          payload: response.data.data,
        });
      })
      .catch((err) => console.log({ m: "Error on action creator getCategories", err }));
  };
};

export const getCategoryProductsById = (categoryId, name, max, min, asc, desc) => {
  toast.loading("Searching...", {
    id: "SearchFilter",
  });
  let url = new URL(`${BASE_URL}/products/category/${categoryId}`);
  if (!!name) url.searchParams.append("name", name);
  if (!!max) url.searchParams.append("max", max);
  if (!!min) url.searchParams.append("min", min);
  if (!!asc) url.searchParams.append("asc", asc);
  if (!!desc) url.searchParams.append("desc", desc);
  return (dispatch) => {
    dispatch({
      type: GET_CATEGORY_PRODUCTS_BY_ID,
      payload: [],
    });
    dispatch({
      type: RESULTS_FOUND,
      payload: true,
    });
    axios
      .get(url.href)
      .then((response) => {
        // console.log({
        //  from: "action creator getCategoryProductsById",
        //  response,
        // });
        toast.dismiss("SearchFilter");
        response.data.data.length
          ? dispatch({
              type: GET_CATEGORY_PRODUCTS_BY_ID,
              payload: response.data.data,
            })
          : dispatch({
              type: RESULTS_FOUND,
              payload: false,
            });
      })
      .catch((err) => {
        // console.log({
        //  m: "Error on action creator getCategoryProductsById",
        //  err,
        // })
        dispatch({
          type: RESULTS_FOUND,
          payload: false,
        });
        toast.error("No results");
      });
  };
};

export const getSearchName = (payload) => {
  return {
    type: GET_SEARCH_NAME,
    payload,
  };
};

// export const getSubCategories = () => {
//   return async function (dispatch) {
//     try {
//       const response = await axios.get(`${BASE_URL}/subCategories`);
//       return dispatch({
//         type: GET_SUB_CATEGORIES,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.log(`can not find subcategories`, error);
//     }
//   };
// };

export const getSearchCategory = (payload) => {
  // console.log(payload)
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
      toast.loading("Loading...", {
        id: "LogInGoogle",
      });
      axios({
        method: "POST",
        url: `${BASE_URL}/auth/google`,
        headers: {
          token: payload,
        },
      })
        .then((response) => {
          toast.dismiss("LogInGoogle");
          console.log(response.data.user);
          dispatch({
            type: SET_USER_GOOGLE,
            payload: response.data.user,
          });
          localStorage.setItem("user", JSON.stringify(response.data.user));
          toast.success("Welcome " + response.data.user.name);
        })
        .catch((err) => {
          toast.dismiss("LogInGoogle");
          console.log("ErrorCATCHGOOGLE", err.response);
          dispatch({
            type: ERROR_HANDLE,
            payload: err?.response,
          });
          toast.error("Error when signing in with google");
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
          payload: response.data.user,
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
  toast.loading("Loading...", {
    id: "LogIn",
  });
  return (dispatch) => {
    axios({
      method: "POST",
      url: `${BASE_URL}/auth/signin`,
      data: user,
    })
      .then((response) => {
        toast.dismiss("LogIn");
        // console.log('RESPONSE: ', response)
        dispatch({
          type: LOG_IN,
          payload: response.data.user,
        });
        // console.log('RESOUESTA DE REXU ANTES DE AAAAA.', response)
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // console.log(response.data.token)
        document.cookie = "token=" + response.data.token;
        // axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`
        toast.success(`Welcome ${response.data.user.username}`);
      })
      .catch((err) => {
        toast.dismiss("LogIn");
        // console.log(err.response.data)
        dispatch({
          type: ERROR_HANDLE,
          payload: err.response.data.errors,
        });
        toast.error(`${Object.keys(err.response.data.errors)[0]}: ${Object.values(err.response.data.errors)[0]}`);
      });
  };
};

export const sendPayment = (dataPayment) => {
  return (dispatch) => {
    try {
      axios.post(`${BASE_URL}/payment`, dataPayment).then((response) => {
        dispatch({
          type: SEND_PAYMENT,
          payload: response.data,
        });
        console.log(response.data);
        //const response_1 = await axios.get(${BASE_URL}/payment);
        //console.log(response_1);
        localStorage.setItem("mp", JSON.stringify(response.data));
        window.open(response.data[0].link.toString());
        dispatch({
          type: SET_SUCCESS_PAYMENT,
          payload: response.data.order,
        });
      });
    } catch (error) {
      console.log("Error, can not fetch payment", { error: error });
    }
  };
};

export const upgradeToSeller = (idUser, role) => {
  console.log("Entró a upgradeToSeller");
  return () => {
    toast.loading("Sending request", {
      id: "UpgradeToSeller",
    });
    try {
      axios({
        method: "PUT",
        url: `${BASE_URL}/auth/changerol/${idUser}`,
        data: { role: role },
      }).then((response) => {
        console.log(response.data);
        toast.dismiss("UpgradeToSeller");
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...JSON.parse(localStorage.user),
            roleId: response.data.newRole.id,
          })
        );
        toast.success("You can publish your products now");
        window.location.reload(false);
      });
    } catch (err) {
      console.log("Failed en upgradeToSeller");
      toast.dismiss("UpgradeToSeller");
      console.log(err);
      toast.error("error");
    }
  };
};

// export const setSuccessPaymentData = () => {
//{type: SET_SUCCESS_PAYMENT}
// };

export const cancelOperation = (idOper) => {
  //CANCELAR LA OPERACION EN MYSHOPPING
  return (dispatch) => {
    axios({
      method: "POST",
      data: {
        id: idOper,
      },
    }).then((response) => {
      // dispatch({
      //   type:
      // })
      //Mensaje de confirmación
    });
  };
};

export const getUserInfo = (id) => {
  return (dispatch) => {
    axios
      .get(`${BASE_URL}/auth/users/${id}`)
      .then((response) => {
        console.log("GETUSERINFOR", response.data);
        dispatch({
          type: GET_USER_INFO,
          payload: response.data,
        });
        let userInfoAct = {
          email: response.data.email,
          google: response.data.google,
          image: response.data.image,
          roleId: response.data.roleId,
          uid: response.data.uid,
          username: response.data.username,
          name: response.data.info?.name,
        };
        localStorage.setItem("user", JSON.stringify(userInfoAct));
      })
      .catch((err) => console.log(err));
  };
};

export const putUserImage = (id, changes, text = "Updating Information") => {
  // console.log("Entró en putUserImage");
  toast.loading(text, {
    id: "UpdateInformation",
  });
  return (dispatch) => {
    axios({
      method: "PUT",
      url: `${BASE_URL}/auth/users/${id}`,
      data: changes,
    })
      .then((response) => {
        // console.log("Success en putUserImage");
        toast.dismiss("UpdateInformation");
        // console.log(response.data.user.image);
        dispatch({
          type: PUT_USER_IMAGE,
          payload: response.data.user.image,
        });
        toast.success("Information sent");
        //Actualizar la información en localStorage
        let userInfoAct = {
          email: response.data.user?.email,
          google: response.data.user?.google,
          image: response.data.user?.image,
          roleId: response.data.user?.roleId,
          uid: response.data.user?.uid,
          username: response.data.user.username,
          name: response.data.user?.info?.name,
        };
        localStorage.setItem("user", JSON.stringify(userInfoAct));
        window.location.reload(false);
      })
      .catch((err) => {
        // console.log(err);
        toast.dismiss("UpdateInformation");
        // console.log("Failed en putUserImage");
        toast.error("There was an error. Please try again in a few minutes");
      });
  };
};

export const putNewUserInfo = (id, changes) => {
  return (dispatch) => {
    toast.loading("Updating information", {
      id: "NewUserInfo",
    });
    axios({
      method: "PUT",
      url: `${BASE_URL}/auth/users/${id}`,
      data: changes,
    })
      .then((response) => {
        console.log({ from: "putNewUserInfo", response });
        dispatch({
          type: PUT_NEW_USER_INFO,
          payload: response.data.user,
        });
        // console.log(response.data)
        // dispatch(getUserInfo(id))
        toast.dismiss("NewUserInfo");
        toast.success("Changes applied succesfully!", { duration: 10000 });
        let userInfoAct = {
          email: response.data.user?.email,
          google: response.data.user?.google,
          image: response.data.user?.image,
          roleId: response.data.user?.roleId,
          uid: response.data.user?.uid,
          username: response.data.user.username,
          name: response.data.user?.info?.name,
        };
        localStorage.setItem("user", JSON.stringify(userInfoAct));
        window.location.reload(false);
      })
      .catch((err) => console.log({ from: "putNewUserInfo", err }));
  };
};

export const verifyCurrentPassword = (id, currentPassword) => {
  return (dispatch) => {
    dispatch({
      type: VERIFYING_PASSWORD,
    });
    axios({
      method: "PUT",
      url: `${BASE_URL}/auth/password/${id}`,
      data: {
        oldPassword: currentPassword,
      },
    })
      .then((response) => {
        console.log(response);
        dispatch({
          type: VERIFY_CURRENT_PASSWORD,
          payload: response.data.equal,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const putNewPassword = (id, password) => {
  return (dispatch) => {
    toast.loading("Updating password", {
      id: "NewPassword",
    });
    axios({
      method: "PUT",
      url: `${BASE_URL}/auth/users/${id}`,
      data: {
        password,
      },
    })
      .then((response) => {
        console.log({ from: "putNewPassword", axios: response });
        // dispatch({
        //   type: PUT_NEW_PASSWORD,
        //   payload: response.data,
        // });
        toast.dismiss("NewPassword");
        toast.success("Password modified succesfully!");
      })
      .catch((err) => console.log({ from: "putNewPassword", err }));
  };
};

// export const getInfoUserExtra = (userId, data) => {
//   return (dispatch) => {
//     axios({
//       method: 'PUT',
//       url: `${BASE_URL}/auth/users/${userId}`,
//       data: data
//     })
//     .then(response => {
//       dispatch({
//         type: GET_USER_INFO_EXTRA,
//         payload: response.data
//       })
//     })
//     .catch(err => console.log(err))
//   }
// }

export const getOrders = (idUser) => {
  console.log(idUser);
  return (dispatch) => {
    axios({
      method: "POST",
      url: `${BASE_URL}/order/`,
      data: {
        userId: idUser,
      },
    })
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: GET_ORDERS,
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getUserReviews = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${BASE_URL}/auth/users/${id}`);
      return dispatch({
        type: GET_USER_REVIEWS,
        payload: response.data.Reviews,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addReview = (review, id) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${BASE_URL}/products/review/${id}`, {
        userId: review.id,
        score: review.score,
        description: review.description,
      });

      return dispatch({
        type: ADD_REVIEW,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const delReview = (userId, id) => {
  return async function (dispatch) {
    await axios({
      method: "DELETE",
      url: `${BASE_URL}/products/review/${id}`,
      data: { userId: userId },
    })
      .then((response) => {
        dispatch({
          type: DEL_REVIEW,
          payload: response.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const updateReview = (review, id) => {
  return async function (dispatch) {
    try {
      const response = await axios.put(`${BASE_URL}/products/review/${id}`, {
        score: review.score,
        description: review.description,
        userId: review.id,
      });

      return dispatch({
        type: UPDATE_REVIEW,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearReview = () => {
  return {
    type: CLEAR_REVIEWS,
  };
};

export const getUserFav = (id) => {
  return async function (dispatch) {
    const response = await axios.get(`${BASE_URL}/auth/users/${id}`);
    return dispatch({
      type: GET_USER_FAVOURITES,
      payload: response.data.favorites,
    });
  };
};

export const addFav = (productId, id) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${BASE_URL}/products/favorite/${productId}`, { userId: id });

      return dispatch({
        type: ADD_FAVOURITES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const delFav = (userId, id) => {
  return async function (dispatch) {
    await axios({
      method: "DELETE",
      url: `${BASE_URL}/products/favorite/${id}`,
      data: { userId: userId },
    })
      .then((response) => {
        dispatch({
          type: DEL_FAVOURITES,
          payload: response.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

//Rutas Admin

export const getAllUsers = () => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: `${BASE_URL}/auth/users`,
    })
      .then((response) => {
        dispatch({
          type: GET_ALL_USERS,
          payload: response.data.data,
        });
        // console.log(response.data.data)
      })
      .catch((err) => console.log(err));
  };
};

export const changeOtherUserRol = (userId, newRol) => {
  toast.loading("Updating user rol", {
    id: "ChangeRol",
  });
  return () => {
    axios({
      method: "PUT",
      url: `${BASE_URL}/auth/changerol/${userId}`,
      data: {
        role: newRol,
      },
    })
      .then((response) => {
        toast.dismiss("ChangeRol");
        // console.log(response.data)
        window.location.reload(false);
      })
      .catch((err) => {
        toast.dismiss("ChangeRol");
        console.log(err);
      });
  };
};

export const changeUserStatus = (userId, newStatus) => {
  // console.log('ACTION', newStatus)
  return () => {
    axios({
      method: "DELETE",
      url: `${BASE_URL}/auth/users/${userId}`,
      data: {
        newStatus: newStatus,
      },
    })
      .then((response) => {
        // console.log(response.data)
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };
};

export const newSearchProducts = (name, priceOrder, min, max, categoryId) => {
  const url = new URL(`${BASE_URL}/products/productsfilter`);

  if (!!name) url.searchParams.append("name", name);
  if (!!priceOrder) url.searchParams.append("priceOrder", priceOrder);
  if (!!min) url.searchParams.append("min", min);
  if (!!max) url.searchParams.append("max", max);
  if (!!categoryId) url.searchParams.append("categoryId", categoryId);
  console.log("name: ", name, "priceOrder: ", priceOrder, "min: ", min, "max: ", max, "categoryId:", categoryId);

  return (dispatch) => {
    dispatch({
      type: RESULTS_FOUND,
      payload: true,
    });
    dispatch({
      type: GET_PRODUCTS_BY_NAME,
      payload: [],
    });
    dispatch({
      type: GET_SEARCH_NAME,
      payload: name || "",
    });
    axios({
      method: "GET",
      url: url.href,
    })
      .then((response) => {
        // console.log(response.data.length)
        response.data.length > 0
          ? dispatch({
              type: GET_PRODUCTS_BY_NAME,
              payload: response.data,
            })
          : dispatch({
              type: RESULTS_FOUND,
              payload: false,
            });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const putCategoryState = (categoryId, newStatus) => {
  return (dispatch) => {
    axios({
      method: "DELETE",
      url: `${BASE_URL}/categories`,
      data: { categoryId, newStatus },
    })
      .then((response) => {
        console.log({ from: "putCategoryState DELETE", response });
        dispatch({
          type: PUT_CATEGORY_STATE,
          payload: response.data,
        });
      })
      .then((response) => {
        axios
          .get(`${BASE_URL}/categories`)
          .then((response) => {
            console.log({ from: "putCategoryState GET", response });
            dispatch({
              type: GET_CATEGORIES,
              payload: response.data.data,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
};

export const postCategory = (name) => {
  return (dispatch) => {
    dispatch({
      type: POSTING_CATEGORY,
      payload: { name, state: "posting" },
    });
    axios({
      method: "POST",
      url: `${BASE_URL}/categories`,
      data: {
        name,
      },
    })
      .then((response) => {
        console.log({ from: "postCategory", response });
        dispatch({
          type: POST_CATEGORY,
          payload: response.data,
        });
        axios
          .get(`${BASE_URL}/categories`)
          .then((response) => {
            console.log({ from: "postCategory second request", response });
            dispatch({
              type: GET_CATEGORIES,
              payload: response.data.data,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: POST_CATEGORY,
          payload: { name, state: "error" },
        });
      });
  };
};

export const getAllReviews = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${BASE_URL}/products/reviews`);
      console.log(response.data);
      return dispatch({
        type: ALL_REVIEWS,
        payload: response.data,
      });
    } catch (error) {
      console.log("error all reviews");
    }
  };
};
