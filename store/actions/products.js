import { PRODUCTS_REF, getProductRef } from "../../consts/dbRefs";
import Product from "../../models/Product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

/* ========================================== */

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const response = await fetch(PRODUCTS_REF);

        if (!response.ok) 
            throw new Error(response);

        const resData = await response.json();
        const loadedProducts = [];

        for (const key in resData) {
            loadedProducts.push(new Product(
                key, 
                resData[key].ownerId, 
                resData[key].title, 
                resData[key].imageUrl, 
                resData[key].description, 
                resData[key].price
            ));
        }
        dispatch({ 
            type: SET_PRODUCTS, 
            products: loadedProducts, 
            userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
        });
    }
};

/* ========================================== */

export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        await fetch(getProductRef(productId)+ '?auth='+token ,{ method: 'DELETE' });

        dispatch({
            type: DELETE_PRODUCT,
            prodId: productId
        });
    };
}

/* ========================================== */

export const createProduct = (title, imageUrl, price, description) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(PRODUCTS_REF + '?auth='+token ,{
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ownerId: userId,
                title,
                imageUrl,
                price,
                description
            })
        });

        const resData = await response.json();
        dispatch({
            type: CREATE_PRODUCT,
            prodData: {
                id: resData.name,
                ownerId: userId,
                title,
                imageUrl,
                price,
                description
            }
        });
    };
}

/* ========================================== */

export const updateProduct = (id, title, imageUrl, description) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(getProductRef(id) + '?auth='+token ,{
            method: 'PATCH',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description
            })
        });

        if (!response.ok) 
            throw new Error('Something went wrong!');

        dispatch({
            type: UPDATE_PRODUCT,
            prodId: id,
            prodData: {
                title,
                imageUrl,
                description
            }
        });
    };
}