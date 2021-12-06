import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CartItem from '../../components/shop/CartItem';
import LoadingIndicator from '../../components/UI/LoadingIndicator';
import Card from '../../components/UI/Card';

import Colors from '../../consts/Colors';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';

/* ========================================== */

const CartScreen = props => {
    
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const cartItemsArray = [];
        const cartState = state.cart.items;
        for (const key in cartState){
            cartItemsArray.push({
                prodId: key,
                quantity: cartState[key].quantity,
                prodTitle: cartState[key].prodTitle,
                prodPrice: cartState[key].prodPrice,
                sum: cartState[key].sum,
            });
        }

        return cartItemsArray.sort((a,b) => a.prodId > b.prodId ? 1 : -1);
    });

    /* ==================== */

    const sendOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount)); 
        setIsLoading(false);
    };

    /* ==================== */

    const renderCartItem = (itemData) => {
        return (
            <CartItem 
                quantity={itemData.item.quantity}
                prodPrice={itemData.item.prodPrice}
                prodTitle={itemData.item.prodTitle}
                sum={itemData.item.sum}
                deletable
                onRemove={() => {
                    dispatch(cartActions.removeFromCart(itemData.item.prodId))
                }}
            />
        );
    };

    /* ==================== */

    return (
        <View style={styles.container}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>$ {Math.round(cartTotalAmount.toFixed(2) * 100)/100}</Text>
                </Text>
                {isLoading ? 
                    <LoadingIndicator size='small' />
                    :
                    <Button 
                        title='Order Now'
                        color={Colors.accent}
                        disabled={cartItems.length === 0}
                        onPress={sendOrderHandler}
                    />
                }
            </Card>
            <FlatList 
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={renderCartItem}
            />
        </View>
    );
};

/* ========================================== */

export const screenOptions = {
    headerTitle: 'Your Orders'    
};

/* ========================================== */

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    amount: {
        color: Colors.primary
    }
});

export default CartScreen;