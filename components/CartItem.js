import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity
} from 'react-native';
import Colors from '../constants/Colors';

const CartItem = (props) => {
  let TouchableIcon = TouchableNativeFeedback;

  if (Platform.OS === 'ios') {
    TouchableIcon = TouchableOpacity;
  }

  return (
    <View style={styles.item} index={props.index}>
      <View style={styles.qtyAndTitle}>
        <Text style={styles.qty}>{props.items.productQty}</Text>
        <Text style={styles.title}>{props.items.productTitle}</Text>
      </View>
      <View style={styles.sumAndDel}>
        <Text style={styles.sum}>${props.items.sum.toFixed(2)}</Text>
        {props.deletable && (
          <View style={styles.del}>
            <TouchableIcon useForeground onPress={props.onRemove}>
              <Ionicons size={24} name="md-trash" color={Colors.primary} />
            </TouchableIcon>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  qtyAndTitle: {
    flexDirection: 'row'
  },
  qty: {
    marginHorizontal: 10,
    fontFamily: 'open-sans-bold',
    fontSize: 15,
    color: 'gray'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 15
  },
  sumAndDel: {
    flexDirection: 'row'
  },
  sum: {
    fontFamily: 'open-sans-bold',
    fontSize: 15
  },
  del: {
    marginHorizontal: 10
  }
});

export default CartItem;
