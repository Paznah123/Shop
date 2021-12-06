import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import AuthScreen, { screenOptions as authScreenOptions } from "../screens/user/AuthScreen";

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

const AuthStackNavigator = createStackNavigator();

const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions={defaultNavOptions} >
            <AuthStackNavigator.Screen 
                name='Auth'
                component={AuthScreen}
                options={authScreenOptions}
            />
        </AuthStackNavigator.Navigator>
    );
};

export default AuthNavigator;