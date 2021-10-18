import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import HeaderButton from '../../components/shop/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import Colors from '../../constants/Colors';
import { fetchOrders } from '../../store/actions/orders';

const OrdersScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const orders = useSelector((state) => state.orders.orders);

  const dispatch = useDispatch();

  const getOrders = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      await dispatch(fetchOrders());
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, [setError, setLoading, dispatch]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const renderOrderItems = (itemData) => {
    return (
      <OrderItem
        items={itemData.item.items}
        key={itemData.item.id}
        totalPrice={itemData.item.totalPrice}
        date={itemData.item.readableDate}
      />
    );
  };
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>There is an error occured</Text>
        <Button title="try again" onPress={getOrders} color={Colors.primary} />
      </View>
    );
  }

  return (
    <View>
      {orders.length === 0 ? (
        <View>
          <Text style={styles.text}>You have 0 orders... </Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={renderOrderItems}
          />
        </View>
      )}
    </View>
  );
};

OrdersScreen.navigationOptions = (navOptions) => {
  return {
    headerTitle: 'My Orders',
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="menu"
            iconName="menu"
            onPress={() => {
              navOptions.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    }
  };
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans',

    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default OrdersScreen;
