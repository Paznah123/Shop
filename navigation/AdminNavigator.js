import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import UserProductsScreen, { screenOptions as userProdScreenOptions } from '../screens/user/UserProductsScreen';
import EditProductScreen, { screenOptions as editProdScreenOptions } from '../screens/user/EditProductScreen';

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

const AdminStackNavigator = createStackNavigator();

const AdminNavigator = () => {
    return (
        <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AdminStackNavigator.Screen 
                name='UserProducts'
                component={UserProductsScreen}
                options={userProdScreenOptions}
            /> 
            <AdminStackNavigator.Screen 
                name='EditProduct'
                component={EditProductScreen}
                options={editProdScreenOptions}
            /> 
        </AdminStackNavigator.Navigator>
    );
};

export default AdminNavigator;