import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { StyleSheet, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import LoadingIndicator from '../../components/UI/LoadingIndicator';
import AddProductForm from '../../components/UI/AddProductForm';
import * as productsActions from '../../store/actions/products';

/* ========================================== */

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.inputId]: action.val
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.inputId]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

/* ========================================== */

const EditProductScreen = props => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const prodId = props.route.params ? props.route.params.prodId : null;
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    );

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        },
        inputValidities: {
            title: editedProduct ? true: false,
            imageUrl: editedProduct ? true: false,
            description: editedProduct ? true: false,
            price: editedProduct ? true: false
        }, 
        formIsValid: editedProduct ? true: false
    });

    /* ==================== */

    useEffect(() => {
        if (error) Alert.alert('An error occurred!', error, [{text : 'OK'}]);
    }, [error]);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => ( <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Add'
                    iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={submitHandler}
                />
            </HeaderButtons> )
        });
    }, [submitHandler]);
    
    /* ==================== */

    const submitHandler = useCallback(async () => {
        console.log(formState);
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!', 'Please check for errors in the form.', [
                { text: 'Ok'}
            ]);
            return;
        }

        setError(null);
        setIsLoading(true);
        
        try {
            if(editedProduct){
                await dispatch(productsActions.updateProduct(
                    prodId, 
                    formState.inputValues.title, 
                    formState.inputValues.imageUrl, 
                    formState.inputValues.description
                ));
            } else 
                await dispatch(productsActions.createProduct(
                    formState.inputValues.title, 
                    formState.inputValues.imageUrl, 
                    +formState.inputValues.price, 
                    formState.inputValues.description
                ));
            props.navigation.goBack();
        } catch (err) {
            setError(err.message);
        }

        setIsLoading(false);
    }, [dispatch, prodId, formState]);

    /* ==================== */

    if (isLoading) return ( <LoadingIndicator /> );
    
    return (
        <AddProductForm
            product={editedProduct}
            dispatch={dispatchFormState}
        />
    );
};

/* ========================================== */

export const screenOptions = navData => {
    const routeParams = navData.route.params ? navData.route.params : {};
    return {
        headerTitle: routeParams.prodId ? 'Edit Product' : 'Add Product'
    };
};

/* ========================================== */

export default EditProductScreen;