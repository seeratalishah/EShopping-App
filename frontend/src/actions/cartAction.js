import Axios from 'axios';
import {ADD_CART_ITEM, REMOVE_CART_ITEM} from '../constants/cartConstant';
export const addToCart = (productId, quantity)=> async (dispatch, getState)=>{
    const {data} = await Axios.get(`/api/products/${productId}`);
    dispatch({
        type: ADD_CART_ITEM,
        payload: {
            name: data.name,
            price: data.price,
            image: data.image,
            countInStock: data.countInStock,
            product: data._id,
            quantity,
        },
    });

    localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId)=> async (dispatch, getState)=>{
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: productId
    });

    localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems));
}