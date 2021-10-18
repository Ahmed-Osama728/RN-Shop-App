import React, { useEffect } from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import { addToCart } from '../../store/actions/cart';
const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam('productId');
  const products = useSelector((state) => state.product.availableProducts);
  const product = products.find((product) => product.id === productId);

  const dispatch = useDispatch();
  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.imgContainer}>
          <Image source={{ uri: product.imageUrl }} style={styles.img} />
        </View>
        <View style={styles.btnContainer}>
          <Button
            title="Add to Cart"
            onPress={() => dispatch(addToCart(product))}
            color={Colors.primary}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.desc}>{product.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  const productId = navData.navigation.getParam('productId');

  return {
    headerTitle: 'All Products'
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  imgContainer: {
    height: 350,
    width: '100%'
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover'
  },
  btnContainer: {
    alignItems: 'center',
    marginVertical: 15
  },
  info: {
    alignItems: 'center'
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 15,
    color: 'grey',
    marginVertical: 15
  },
  desc: {
    fontFamily: 'open-sans',
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20
  }
});

export default ProductDetailScreen;
