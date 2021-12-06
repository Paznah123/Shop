import React from 'react';
import { Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductsList from '../../components/shop/ProductsList';
import HeaderButton from '../../components/UI/HeaderButton';
import * as cartActions from '../../store/actions/cart';

/* ========================================== */

const ProductsOverviewScreen = props => {

    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    /* ==================== */

    const selectItemHandler = (itemData) => {
        props.navigation.navigate('ProductDetails', {
            productId: itemData.item.id,
            productTitle: itemData.item.title
        })
    };

    /* ==================== */
    
    return ( 
        <ProductsList 
            products={products}
            navigation={props.navigation}
            leftButtonTitle='View Details'
            rightButtonTitle='Add to cart'
            leftButtonHandler={(itemData) => selectItemHandler(itemData)}
            rightButtonHandler={(itemData) => dispatch(cartActions.addToCart(itemData.item))}
        />
    );
};

/* ========================================== */

export const screenOptions = navData => {
    return {
        headerTitle: 'All products',
        headerLeft: () => ( <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title='Menu'
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer()
                }}
            />
        </HeaderButtons> ),
        headerRight: () => ( <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title='Cart'
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => {
                    navData.navigation.navigate('Cart')
                }}
            />
        </HeaderButtons> )
    };
};

/* ========================================== */

export default ProductsOverviewScreen;