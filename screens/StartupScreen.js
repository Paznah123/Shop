import React, { useEffect } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';

import LoadingIndicator from '../components/UI/LoadingIndicator';
import * as authActions from '../store/actions/auth';

const StartupScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                //props.navigation.navigate('Auth');
                dispatch(authActions.setDidTryAL());
                return;
            }
            const parsedUserData = JSON.parse(userData);
            const { token, userId, expireDate } = parsedUserData;
            const expirationDate = new Date(expireDate);

            if (expirationDate <= new Date() || !token || !userId) {
                //props.navigation.navigate('Auth');
                dispatch(authActions.setDidTryAL());
                return;
            }

            const expireTime = expirationDate.getTime() - new Date().getTime();

            //props.navigation.navigate('Shop'); 
            dispatch(authActions.authenticate(userId, token, expireTime));
        };
        tryLogin();
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <LoadingIndicator/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
});

export default StartupScreen;