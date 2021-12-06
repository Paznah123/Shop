import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import ProductsOverviewScreen, { screenOptions as prodOverviewScreenOptions } from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen, { screenOptions as prodDetailsScreenOptions} from '../screens/shop/ProductDetailsScreen';
import CartScreen, { screenOptions as cartScreenOptions } from '../screens/shop/CartScreen';

import Colors from '../consts/Colors';

/* ========================================== */

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',

    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

/* ========================================== */

const ProductsStackNavigator = createStackNavigator();

const ProductsNavigator = () => {
    return (
        <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <ProductsStackNavigator.Screen 
                name='ProductsOverview'
                component={ProductsOverviewScreen}
                options={prodOverviewScreenOptions}
            />
            <ProductsStackNavigator.Screen 
                name='ProductDetails'
                component={ProductDetailsScreen}
                options={prodDetailsScreenOptions}

            />
            <ProductsStackNavigator.Screen 
                name='Cart'
                component={CartScreen}
                options={cartScreenOptions}

            />
        </ProductsStackNavigator.Navigator>
    );
};

export default ProductsNavigator;