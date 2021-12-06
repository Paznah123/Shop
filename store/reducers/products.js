import Product from '../../models/Product';
import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT } from '../actions/products';

/* ========================================== */

const initState = {
    availableProducts: [],
    userProducts: []
};

/* ========================================== */

export default (state = initState, action) => {
    switch(action.type){
        /* ==================== */
        case SET_PRODUCTS:
            return {
                availableProducts: action.products,
                userProducts: action.userProducts
            };
        /* ==================== */
        case DELETE_PRODUCT:
            return {
                ...state,
                availableProducts: state.availableProducts.filter(prod => prod.id !== action.prodId),
                userProducts: state.userProducts.filter(prod => prod.id !== action.prodId)
            };
        /* ==================== */
        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.prodData.id, 
                action.prodData.ownerId, 
                action.prodData.title, 
                action.prodData.imageUrl, 
                action.prodData.description,
                action.prodData.price,
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }
        /* ==================== */
        case UPDATE_PRODUCT:
            const prodIndex = state.userProducts.findIndex(prod => prod.id === action.prodId);
            const updatedProd = new Product(
                action.prodId,
                state.userProducts[prodIndex].ownerId,
                action.prodData.title,
                action.prodData.imageUrl,
                action.prodData.description,
                state.userProducts[prodIndex].price,
            );
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[prodIndex] = updatedProd;
            
            const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.prodId);
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProd;
            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            }
        /* ==================== */
    }
    return state;
};