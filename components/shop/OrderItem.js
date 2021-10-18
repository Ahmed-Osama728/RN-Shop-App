import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import CartItem from '../CartItem';
const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.orderItem}>
      <View style={styles.priceAndDate}>
        <Text style={styles.price}>Total Price: ${props.totalPrice}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <View style={styles.btn}>
        <Button
          title={!showDetails ? 'Show Details' : 'Hide Details'}
          color={Colors.primary}
          onPress={() => {
            setShowDetails((prevState) => !prevState);
          }}
        />
      </View>
      {showDetails && (
        <View style={styles.orderDetails}>
          {props.items.map((cartItem) => (
            <CartItem items={cartItem} index={cartItem.productId} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    margin: 20,
    alignItems: 'center'
  },
  priceAndDate: {},
  price: {
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    marginBottom: 10,
    fontSize: 18
  },
  date: {
    justifyContent: 'center',
    fontFamily: 'open-sans',
    color: '#888'
  },
  btn: { marginVertical: 10 },
  orderDetails: {
    width: '100%'
  }
});

export default OrderItem;
