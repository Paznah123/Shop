import React from "react";
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import AdminNavigator from "./AdminNavigator";
import OrdersNavigator from "./OrdersNavigator";
import ProductsNavigator from "./ProductsNavigator";

import * as authActions from '../store/actions/auth';
import Colors from '../consts/Colors';

/* ========================================== */

const defaultNavOptions = {
    headerShown: false,
    drawerStyle: {
        paddingTop: 50
    }
};

/* ========================================== */

const DrawerOpt = (androidIcon, iosIcon) =>{
    return drawerConfig => (
        <Ionicons 
            name={Platform.OS === 'android' ? androidIcon : iosIcon}
            size={23}
            color={drawerConfig.tintColor}    
        />
    )
};

/* ========================================== */

const ShopDrawerNavigator = createDrawerNavigator();

const ShopNavigator = () => {
    const dispatch = useDispatch();

    return (
        <ShopDrawerNavigator.Navigator screenOptions={defaultNavOptions}
            drawerContent={props => {
                return (
                    <View style={{flex: 1, padding: 20  }}>
                        <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                            <DrawerItemList {...props} />
                            <Button 
                                title='Logout' 
                                color={Colors.primary} 
                                onPress={()=>{
                                    dispatch(authActions.logout());
                                    props.navigation.navigate('Auth');
                                }}
                            />
                        </SafeAreaView>
                    </View>
                );
            }}
            drawerContentOptions={{
                activeTintColor: Colors.primary
            }}
        >
            <ShopDrawerNavigator.Screen 
                name='Products'
                component={ProductsNavigator}
                options={{ drawerIcon: DrawerOpt('md-cart', 'ios-cart') }}
            /> 
            <ShopDrawerNavigator.Screen 
                name='Orders'
                component={OrdersNavigator}
                options={{ drawerIcon: DrawerOpt('md-list', 'ios-list') }}
            /> 
            <ShopDrawerNavigator.Screen 
                name='Admin'
                component={AdminNavigator}
                options={{ drawerIcon: DrawerOpt('md-create', 'ios-create') }}
            /> 
        </ShopDrawerNavigator.Navigator>
    );
};

export default ShopNavigator;