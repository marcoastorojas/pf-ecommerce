import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS"

export const getProducts = () => {
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/products')
            return dispatch({
                type:"GET_PRODUCTS",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};
