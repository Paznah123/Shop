import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

/* ========================================== */

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
    switch(action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            };
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            };
        default:
            return state;
    }
};

/* ========================================== */

const Input = props => {
    
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initValue ? props.initValue : '',
        isValid: props.initValid,
        touched: false
    });

    const { onInputChange, id } = props;

    /* ==================== */

    useEffect(() => {
        if (inputState.touched)
            onInputChange(id, inputState.value, inputState.isValid);
    },[inputState, onInputChange, id]);

    const lostFocusHandler = () => { dispatch({ type: INPUT_BLUR }); };

    /* ==================== */
    
    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0 || 
            props.email && !emailRegex.test(text.toLowerCase()) || 
            props.min != null && +text < props.min || 
            props.max != null && +text > props.max || 
            props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }

        dispatch({
            type: INPUT_CHANGE,
            value: text,
            isValid: isValid
        });
    };
    
    /* ==================== */

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput 
                {...props}
                style={styles.input} 
                value={inputState.value} 
                onChangeText={textChangeHandler}
                onBlur={lostFocusHandler}
            />
            {!inputState.isValid && inputState.touched && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errorText}</Text>
                </View>    
            )}
        </View>  
    );
};

/* ========================================== */

const styles = StyleSheet.create({
    formControl: {
        width: '100%',
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    errorContainer: {
        marginVertical: 5
    },
    errorText: {
        fontFamily: 'open-sans',
        fontSize: 12,
        color: 'red',
    },
});

export default Input;