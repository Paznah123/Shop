import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import * as authActions from '../../store/actions/auth';
import AuthForm from '../../components/UI/AuthForm';

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

const AuthScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        }, 
        formIsValid: false
    });

    /* ==================== */

    useEffect(() => {
        if (error) Alert.alert('An error occurred!', error, [{ type: 'Ok'}]);
    }, [error]);

    /* ==================== */

    const authHandler = async () => {
        let action;

        if (isSignup) action = authActions.signup;
        else action = authActions.login;

        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action(
                formState.inputValues.email, 
                formState.inputValues.password
            ));
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

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
        <AuthForm 
            onInputChange={inputChangeHandler}
            onAuth={authHandler}
            signup={isSignup}
            setIsSignup={setIsSignup}
            loading={isLoading}
        />
    );
}

export const screenOptions = {
    headerTitle: 'Authenticate'
};

/* ========================================== */

export default AuthScreen;