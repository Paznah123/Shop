import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import Colors from '../../consts/Colors';

/* ========================================== */

const LoadingIndicator = props => {
    return (
        <View style={styles.indicator}>
            <ActivityIndicator 
                {...props}
                size='large'
                color={Colors.primary}
            />
        </View>
    );
};
 
/* ========================================== */

const styles = StyleSheet.create({
    indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoadingIndicator;