import React from 'react';
import { Platform, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as productsAction from '../../store/actions/products';

import ProductsList from '../../components/shop/ProductsList';
import HeaderButton from '../../components/UI/HeaderButton';

/* ========================================== */

const UserProductsScreen = props => {
    
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();
    
    /* ==================== */

    const editProductHandler = product => {
        props.navigation.navigate('EditProduct', {
            prodId: product.id,
            productTitle: product.title
        });
    };

    const deleteHandler = id => {
        Alert.alert('Are you sure?','Do you really want to delete this item?', [
            { text: 'No', style: 'default' },
            { text: 'Yes', style: 'destructive', onPress: () => {
                dispatch(productsAction.deleteProduct(id));
            }}
        ]);
    };

    /* ==================== */

    return (
        <ProductsList 
            products={userProducts}
            navigation={props.navigation}
            leftButtonTitle='Edit'
            rightButtonTitle='Delete'
            leftButtonHandler={(itemData) => editProductHandler(itemData.item)}
            rightButtonHandler={(itemData) => deleteHandler(itemData.item.id)}
        />
    );
};

/* ========================================== */

export const screenOptions = navData => {
    return {
        headerTitle: 'Your Products',
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
                title='Add'
                iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                onPress={() => {
                    navData.navigation.navigate('EditProduct');
                }}
            />
        </HeaderButtons> )
    }
}

/* ========================================== */

export default UserProductsScreen;