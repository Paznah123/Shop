import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/* ========================================== */

const CartItem = props => {
    return (
        <View style={styles.cartItem}>
            <Text style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity}</Text>
                <Text style={styles.mainText}> {props.prodTitle}</Text>
            </Text>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>{props.sum.toFixed(2)}</Text>
                { props.deletable && <TouchableOpacity style={styles.deleteBtn} onPress={props.onRemove}>
                    <Ionicons 
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} 
                        size={23}
                        color='red'    
                    />
                </TouchableOpacity>}
            </View>
        </View>
        
    );
};

/* ========================================== */

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888',
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 14, 
    },
    
    deleteBtn:{
        marginLeft: 20,
    },
});

export default CartItem;