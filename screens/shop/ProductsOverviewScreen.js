import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cart';
import HeaderButton from '../../components/shop/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';
import { fetchProducts } from '../../store/actions/product';

const ProductsOverviewScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState();

  const products = useSelector((state) => state.product.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      await dispatch(fetchProducts());
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, [dispatch, setLoading, setError]);

  useEffect(() => {
    setRefreshing(true);
    loadProducts();
    setRefreshing(false);
  }, [loadProducts]);

  useEffect(() => {
    const willFocus = props.navigation.addListener('willFocus', loadProducts);
    return () => {
      willFocus.remove();
    };
  }, [loadProducts]);

  const renderItemData = (itemData) => {
    const onPressHandler = (itemData) => {
      props.navigation.navigate('ProductDetails', {
        productId: itemData.item.id
      });
    };
    return (
      <ProductItem
        productImg={itemData.item.imageUrl}
        productTitle={itemData.item.title}
        productPrice={itemData.item.price}
        onSelect={() => onPressHandler(itemData)}
      >
        <Button
          title="View details"
          color={Colors.primary}
          onPress={() => onPressHandler(itemData)}
        />
        <Button
          title="Add to cart"
          color={Colors.primary}
          onPress={() => dispatch(addToCart(itemData.item))}
        />
      </ProductItem>
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
        <Button
          title="try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>there is no products yet, maybe add one</Text>
      </View>
    );
  }
  return (
    <View style={styles.list}>
      <FlatList
        data={products}
        renderItem={renderItemData}
        onRefresh={loadProducts}
        refreshing={refreshing}
      />
    </View>
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  const rightHeaderButton = () => {
    return (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="cart"
          iconName="cart-outline"
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    );
  };

  return {
    headerTitle: 'All Products',
    headerRight: rightHeaderButton,
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="menu"
            iconName="menu"
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    }
  };
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    padding: 15
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ProductsOverviewScreen;
