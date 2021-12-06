import React, { useCallback } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import Input from '../../components/UI/Input';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

/* ========================================== */

const AddProductForm = props => {
    
    const editedProduct = props.product;
    const dispatchFormState = props.dispatch;

    /* ==================== */

    const inputChangeHandler = useCallback((inputId, value, inputValidity) => { 
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            val: value,
            isValid: inputValidity,
            inputId: inputId
        });
    }, [dispatchFormState]);

    /* ==================== */
    
    return (
        <ScrollView>
            <View style={styles.form}>
                <Input 
                    id='title'
                    label='Title'
                    errorText='Please enter a valid title!'
                    onInputChange={inputChangeHandler}
                    initValue={editedProduct ? editedProduct.title : ''}
                    initValid={!!editedProduct}
                    required
                />
                <Input 
                    id='imageUrl'
                    label='Image URL'
                    errorText='Please enter a valid Image URL!'
                    onInputChange={inputChangeHandler}
                    initValue={editedProduct ? editedProduct.imageUrl : ''}
                    initValid={!!editedProduct}
                    required
                />
                {editedProduct ? null :
                    <Input 
                        id='price'
                        label='Price'
                        errorText='Please enter a valid price!'
                        keyboardType='decimal-pad'
                        onInputChange={inputChangeHandler}
                        required
                        min={0.1}
                    />}
                <Input 
                    id='description'
                    label='Description'
                    errorText='Please enter a valid description!'
                    autoCorrect
                    multiline
                    numberOfLines={3}
                    onInputChange={inputChangeHandler}
                    initValue={editedProduct ? editedProduct.description : ''}
                    initValid={!!editedProduct}
                    required
                    minLength={5}
                /> 
            </View>   
        </ScrollView>  
    );
};

/* ========================================== */

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
});

export default AddProductForm;