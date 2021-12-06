import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Platform, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import LoadingIndicator from '../../components/UI/LoadingIndicator';

import * as ordersActions from '../../store/actions/orders';

/* ========================================== */

const OrdersScreen = props => {

    const [isLoading, setIsLoading] = useState(false);

    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    /* ==================== */
    
    useEffect(() => {
        setIsLoading(true);
        dispatch(ordersActions.fetchOrders()).then(() => {
            setIsLoading(false);
        }).catch(err => Alert.alert('An error occurred!', err, [{text : 'OK'}]));
    }, [dispatch]);

    /* ==================== */

    const renderOrderItem = itemData => {
        return (
            <OrderItem 
                amount={itemData.item.totalAmount}
                date={itemData.item.readableDate}
                items={itemData.item.items}
            />
        );
    };

    /* ==================== */

    if (isLoading) return ( <LoadingIndicator/> );

        
    if (orders.length === 0) 
        return ( 
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text>No orders found.</Text>
            </View> 
        );

    return (
        <FlatList 
            data={orders}
            keyExtractor={item => item.id}
            renderItem={renderOrderItem}
        />
    );
};

/* ========================================== */

export const screenOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => ( <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title='Menu'
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer()
                }}
            />
        </HeaderButtons> )   
    } 
};

export default OrdersScreen;