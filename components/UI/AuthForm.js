import React from 'react';
import { View, ScrollView, Button, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import LoadingIndicator from '../../components/UI/LoadingIndicator';

import Colors from '../../consts/Colors';

/* ========================================== */

const AuthForm = props => {
    
    return (
        <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={50}
            style={styles.container}
        >
            <LinearGradient 
                colors={['#ffedff', '#ffe3ff']} 
                style={styles.gradient}
            >
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input 
                            id='email'
                            label='Email'
                            keyboardType='email-address'
                            required
                            email
                            autoCapitalize='none'
                            errorText='Please enter a valid email address.'
                            onInputChange={props.onInputChange}
                            initValue=''
                        />
                        <Input 
                            id='password'
                            label='Password'
                            keyboardType='default'
                            securedTextEntry
                            required
                            minLength={6}
                            autoCapitalize='none'
                            errorText='Please enter a valid password.'
                            onInputChange={props.onInputChange}
                            initValue=''
                        />
                    <View style={styles.buttonContainer}>
                        {props.loading ? 
                            <LoadingIndicator/>  : 
                            <Button 
                                title={ props.signup ? 'Sign Up' : 'Login'} 
                                color={Colors.primary} 
                                onPress={props.onAuth}
                            />
                        }
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button 
                            title={`Switch to ${props.signup ? 'Login' : 'Sign Up'}`} 
                            color={Colors.accent} 
                            onPress={()=>{ props.setIsSignup(prevState => !prevState); }}
                        />  
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}

export const screenOptions = {
    headerTitle: 'Authenticate'
};

/* ========================================== */

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 10,
    },
});

export default AuthForm;