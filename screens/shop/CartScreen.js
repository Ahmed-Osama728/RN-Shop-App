import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/CartItem';
import { deleteItem } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';

const CartScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => {
    const transformedItems = [];
    for (const key in state.cart.items) {
      transformedItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        productQty: state.cart.items[key].qty,
        sum: state.cart.items[key].sum
      });
    }
    return transformedItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const orderNow = async () => {
    setError(null);
    setLoading(true);
    try {
      await dispatch(addOrder(cartItems, totalAmount));
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const renderCartItems = (itemData) => {
    return (
      <CartItem
        deletable
        items={itemData.item}
        onRemove={() => dispatch(deleteItem(itemData.item.productId))}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.amount}>
          Total:{' '}
          <Text style={{ color: Colors.primary }}>
            ${totalAmount.toFixed(2)}
          </Text>{' '}
        </Text>
        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator color={Colors.primary} size="small" />
          </View>
        ) : (
          <Button
            title="ORDER NOW"
            color={Colors.accent}
            onPress={orderNow}
            disabled={cartItems.length === 0}
          />
        )}
      </View>
      <View style={styles.summaryText}>
        <FlatList
          data={cartItems}
          renderItem={renderCartItems}
          keyExtractor={(item) => item.productId}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 20
  },
  summary: {
    alignItems: 'center',
    height: 70,
    elevation: 5,
    marginVertical: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  amount: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CartScreen;
