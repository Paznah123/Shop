import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import LoadingIndicator from '../UI/LoadingIndicator';
import * as productsActions from '../../store/actions/products';

import Colors from '../../consts/Colors';

/* ========================================== */

const ProductsList = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    /* ==================== */

    const renderProduct = (itemData) => {
        return (
            <ProductItem 
                imageUrl={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
            >
                <Button color={Colors.primary} title={props.leftButtonTitle} onPress={props.leftButtonHandler.bind(this, itemData)}/>
                <Button color={Colors.primary} title={props.rightButtonTitle} onPress={props.rightButtonHandler.bind(this, itemData)}/>
            </ProductItem>
        );
    };
    
    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productsActions.fetchProducts()); 
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    /* ==================== */

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', loadProducts);

        return () => unsubscribe();
    }, [loadProducts]);

    useEffect(() => { 
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        }); 
    }, [dispatch, loadProducts]);

    /* ==================== */

    if (error) {
        return (
            <View style={styles.indicator}>
                <Text>An error occurred!</Text>
                <Button  
                    title='Try again' 
                    onPress={loadProducts} 
                    color={Colors.primary}
                />
            </View>
        );
    } else if (isLoading) return ( <LoadingIndicator /> );

    else if (props.products.length === 0){
        return (
            <View style={styles.indicator}>
                <Text>No products found.</Text>
            </View>
        );
    }

    return (
        <FlatList 
            data={props.products}
            keyExtractor={item => item.id}
            renderItem={renderProduct}
            refreshing={isRefreshing}
            onRefresh={loadProducts}
        />
    );
};

/* ========================================== */

const styles = StyleSheet.create({
    indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ProductsList;