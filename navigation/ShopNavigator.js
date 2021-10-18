import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import { createAppContainer } from 'react-navigation';
import { Button, Platform, SafeAreaView, View } from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import OrdersScreen from '../screens/shop/OrdersScreen';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/auth';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerTitleStyle: { fontFamily: 'open-sans-bold' }
};

const ShopNavigator = createStackNavigator(
  {
    ProductOverView: ProductsOverviewScreen,
    ProductDetails: ProductDetailScreen,
    Cart: CartScreen
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name="md-list"
          size={23}
          color={drawerConfig.activeTintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name="md-cart"
          size={23}
          color={drawerConfig.activeTintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const UserProductsNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditUserProduct: EditProductScreen
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name="create"
          size={23}
          color={drawerConfig.activeTintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Products: ShopNavigator,
    Orders: OrdersNavigator,
    Admin: UserProductsNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
      labelStyle: { fontFamily: 'open-sans-bold' },
      itemsContainerStyle: { marginVertical: 45 }
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <View style={{ marginHorizontal: 20 }}>
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(logout());
                  //    props.navigation.navigate('Auth');
                }}
              />
            </View>
          </SafeAreaView>
        </View>
      );
    }
  }
);

const MainAuthNaviagtor = createSwitchNavigator({
  Start: StartupScreen,
  Auth: AuthNavigator,
  Shop: MainNavigator
});

export default createAppContainer(MainAuthNaviagtor);
