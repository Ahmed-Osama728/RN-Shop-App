import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { authenticate } from '../store/actions/auth';

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const transformData = JSON.parse(userData);

      if (!transformData) {
        props.navigation.navigate('Auth');
        return;
      }

      const { token, userId, expirationDate } = transformData;
      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth');
        return;
      }
      props.navigation.navigate('Shop');
      const expirationTime =
        new Date(expirationDate).getTime() - new Date().getTime();
      dispatch(authenticate(token, userId, expirationTime));
    };
    checkLogin();
  }, []);

  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default StartupScreen;
