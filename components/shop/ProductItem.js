import React from 'react';

import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from 'react-native';
import Colors from '../../constants/Colors';

const ProductItem = (props) => {
  let TouchableCmp = TouchableNativeFeedback;
  if (Platform.OS === 'ios') {
    TouchableCmp = TouchableOpacity;
  }
  return (
    <View style={styles.productItem}>
      <TouchableCmp useForeground onPress={props.onSelect}>
        <View key={props.productItd} style={styles.touchable}>
          <View style={styles.imgContainer}>
            <Image source={{ uri: props.productImg }} style={styles.img} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{props.productTitle}</Text>
            <Text style={styles.price}>${props.productPrice}</Text>
          </View>
          <View style={styles.btnsContainer}>{props.children}</View>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  productItem: {
    width: '100%',
    height: 300,
    backgroundColor: 'white',
    marginBottom: 10,
    elevation: 5,
    borderRadius: 10,
    overflow: 'hidden'
  },
  touchable: {
    height: '100%'
  },
  imgContainer: {
    height: '60%',
    width: '100%',
    justifyContent: 'center'
  },
  img: {
    height: '100%',
    width: '100%'
  },
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  title: { fontSize: 20 },
  price: { color: 'grey', fontSize: 15 },
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 10
  }
});

export default ProductItem;
