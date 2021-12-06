import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

import CartItem from '../../models/CartItem';

/* ========================================== */

const initState = {
    items: { },
    totalAmount: 0
};

/* ========================================== */

export default (state = initState, action) => {
    switch(action.type) {
        /* ==================== */
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;

            let cartItem;

            if (state.items[addedProduct.id]) {
                cartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                );
            } else 
                cartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
            
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: cartItem },
                totalAmount: state.totalAmount + prodPrice
            }
        /* ==================== */
        case REMOVE_FROM_CART:
            const selectedItem = state.items[action.prodId];
            const currQty = selectedItem.quantity;
            const itemPrice = selectedItem.prodPrice;

            let updatedCartItems;
            
            if (currQty > 1) {
                const updatedCartItem = new CartItem(currQty-1, itemPrice, selectedItem.prodTitle, selectedItem.sum - itemPrice);
                updatedCartItems = { ...state.items, [action.prodId]: updatedCartItem }
            } else {
                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.prodId];
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - itemPrice
            };
        /* ==================== */
        case ADD_ORDER:
            return initState;
        /* ==================== */
        case DELETE_PRODUCT:
            if (!state.items[action.prodId]) return state;
            const updatedItems = { ...state.items }
            const itemTotal = state.items[action.prodId].sum;
            delete updatedItems[action.prodId]
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            }
        /* ==================== */
    }

    return state;
};