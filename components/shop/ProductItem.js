import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import Card from '../UI/Card';

/* ========================================== */

const ProductItem = props => {
    return (
        <Card style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: props.imageUrl}} />
            </View>
            <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
                {props.children}    
            </View>
        </Card>
    );
};

/* ========================================== */

const styles= StyleSheet.create({
    container: {
        height: 300,
        margin: 20,
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 2,
    },
    price: {
        fontFamily: 'open-sans-bold',
       fontSize: 14,
       color: '#888', 
    },
    actions: {
        height: '23%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    details: {
        height: '17%',
        padding: 10,
        alignItems: 'center',
    },
});

export default ProductItem;