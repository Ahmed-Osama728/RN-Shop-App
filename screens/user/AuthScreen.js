import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import Card from '../../components/shop/UI/Card';
import Input from '../../components/shop/UI/Input';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { login, signup } from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
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

const AuthScreen = (props) => {
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (error) Alert.alert('An Error occured!!', error, [{ text: 'Okay' }]);
  }, [error]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Shop');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={55}
      behavior="height"
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              label="E-mail"
              onInputChange={inputChangeHandler}
              id="email"
              errorText="Please enter a valid email address!"
              keyboardType="email-address"
              autoCapitalize="none"
              initialValue=""
              required
              email
            />
            <Input
              label="Password"
              onInputChange={inputChangeHandler}
              id="password"
              errorText="Please enter a valid password!"
              keyboardType="default"
              autoCapitalize="none"
              initialValue=""
              required
              minLength={5}
              secureTextEntry
            />
            <View style={styles.btns}>
              <View style={styles.btns}>
                {loading ? (
                  <ActivityIndicator color={Colors.primary} size="small" />
                ) : (
                  <Button
                    title={isSignup ? 'Sign Up' : 'Log in'}
                    color={Colors.primary}
                    onPress={authHandler}
                  />
                )}
              </View>
              <View style={styles.btns}>
                <Button
                  title={`${
                    isSignup ? 'Switch to Login' : 'Switch to Sign Up'
                  }`}
                  color={Colors.accent}
                  onPress={() => setIsSignup((prevState) => !prevState)}
                />
              </View>
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    padding: 20,
    width: '80%',
    maxWidth: 400,
    height: '50%',

    maxHeight: 400
  },
  btns: {
    marginTop: 10
  }
});

export default AuthScreen;
