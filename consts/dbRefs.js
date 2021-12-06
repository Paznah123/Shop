const extension = '.json';

export const API_KEY = 'AIzaSyD4EGy4w2Sf_nrNm8yMZkHXPNUspJW6Mkw';

export const DB = 'https://react-native-shop-d01c1-default-rtdb.europe-west1.firebasedatabase.app/';

const SIGNUP_URL_TYPE ='signUp';
const LOGIN_URL_TYPE = 'signInWithPassword';

export const SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:'+ SIGNUP_URL_TYPE +'?key='+ API_KEY;
export const LOGIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:'+ LOGIN_URL_TYPE +'?key='+ API_KEY;

export const PRODUCTS_REF = DB + 'products' + extension;

export const ORDERS_REF = DB + 'orders/';

export const getProductRef = (prodId) => {
    return DB + 'products/' + prodId + extension;
}

export const getOrdersRef = (userId) => {
    return ORDERS_REF + userId + extension;
}