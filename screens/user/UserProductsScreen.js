import React from 'react';
import { Button, FlatList, StyleSheet, View, Alert, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/shop/HeaderButton';
import Colors from '../../constants/Colors';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../store/actions/product';

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.product.userProducts);
  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteProduct(id));
        }
      }
    ]);
  };

  const userProductsItem = (itemData) => {
    return (
      <ProductItem
        productItd={itemData.item.id}
        productImg={itemData.item.imageUrl}
        productTitle={itemData.item.title}
        productPrice={itemData.item.price}
      >
        <Button
          title="Edit Product"
          color={Colors.primary}
          onPress={() =>
            props.navigation.navigate('EditUserProduct', {
              productId: itemData.item.id
            })
          }
        />
        <Button
          title="Delete Product"
          color={Colors.primary}
          onPress={deleteHandler.bind(this, itemData.item.id)}
        />
      </ProductItem>
    );
  };

  if (userProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>there is no products yet, maybe add one</Text>
      </View>
    );
  }
  return (
    <View style={styles.list}>
      <FlatList
        data={userProducts}
        keyExtractor={(item) => item.id}
        renderItem={userProductsItem}
      />
    </View>
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'My Products',
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            iconName="menu"
            title="menu"
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            iconName="create"
            title="create"
            onPress={() => navData.navigation.navigate('EditUserProduct')}
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
export default UserProductsScreen;
